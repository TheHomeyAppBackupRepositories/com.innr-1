'use strict';

const Homey = require('homey');

const { ZigBeeDevice } = require('homey-zigbeedriver');
const { debug, Cluster, CLUSTER } = require('zigbee-clusters');
const { Util } = require('homey-zigbeedriver');

//const OnOffBoundCluster = require('./OnOffBoundCluster');
//const LevelControlBoundCluster = require('./LevelControlBoundCluster');

const RC2x0ConfigurationCluster = require('./RC2x0ConfigurationCluster');
//const RC2x0ConfigurationBoundCluster = require('./RC2x0ConfigurationBoundCluster');

let remoteValue = {};
let press_start = '';
let press_end = '';
let press_duration = 0;
var button = '';
var action = '';

//Cluster.addCluster(RC2x0ConfigurationCluster);

class RC2X0 extends ZigBeeDevice {

  async onNodeInit({ zclNode }) {
    // enable debugging
    this.enableDebug();

    // print the node's info to the console
    this.printNode();

    // Enables debug logging in zigbee-clusters
    debug(true);

    //this.log('DEBUG: ', zclNode);
    //this.log('CLUSTERENDPOINTDEBUG: ', this.getClusterEndpoint(RC2x0ConfigurationCluster));
    //this.log('CLUSTERDEBUG: ', zclNode.endpoints[1].clusters);

    if (this.isFirstInit()) {
      try {
        const keyreportmask = await this.zclNode.endpoints[this.getClusterEndpoint(RC2x0ConfigurationCluster)]
        .clusters[RC2x0ConfigurationCluster.NAME].readAttributes('KeyReportMask');
        this.log('Read KeyReportMask Value: ', keyreportmask);
      } catch (err) {
        this.log('could not read KeyReportMask');
        this.log(err);
      }

      try {
        const deviceinformation = await this.zclNode.endpoints[this.getClusterEndpoint(RC2x0ConfigurationCluster)]
        .clusters[RC2x0ConfigurationCluster.NAME].readAttributes('DeviceInformation');
        this.log('Read DeviceInformation Value: ', deviceinformation);
      } catch (err) {
        this.log('could not read DeviceInformation');
        this.log(err);
      }

      try {
        const clusterversion = await this.zclNode.endpoints[this.getClusterEndpoint(RC2x0ConfigurationCluster)]
          .clusters[RC2x0ConfigurationCluster.NAME].readAttributes('ClusterVersion');
        this.log('Read ClusterVersion Value: ', clusterversion);
      } catch (err) {
        this.log('could not read ClusterVersion');
        this.log(err);
      }

      try {
        await this.zclNode.endpoints[this.getClusterEndpoint(RC2x0ConfigurationCluster)]
        .clusters[RC2x0ConfigurationCluster.NAME].writeAttributes({'KeyReportMask' : 63}); //39
      } catch (err) {
        this.error('failed to write KeyReportMask attribute', err);
      }

      this.registerCapability('measure_battery', CLUSTER.POWER_CONFIGURATION, {
        get: 'batteryPercentageRemaining',
        reportParser(value) {
          return Math.round((value / 2) * 10) / 10;
        },
        report: 'batteryPercentageRemaining',
        getOpts: {
          getOnLine: true,
          getOnStart: true,
        },
      });

      this.registerCapability('alarm_battery', CLUSTER.POWER_CONFIGURATION, {
        get: 'batteryVoltage',
        reportParser(value) {
          // Max value 200, 255 indicates invalid or unknown reading
          if (value <= 200 && value !== 255) {
            // Check if setting `batteryThreshold` exists otherwise use Homey.Device#batteryThreshold if
            // it exists use that, if both don't exist fallback to default value 1.
            const batteryThreshold = this.getSetting('batteryThreshold') || this.batteryThreshold || 1;
            return Math.round(value / 2) <= batteryThreshold;
          }
          return null;
        },
        report: 'batteryVoltage',
        getOpts: {
          getOnLine: true,
          getOnStart: true,
        },
      });

      try {
        await this.configureAttributeReporting([{
          endpointId: this.getClusterEndpoint(CLUSTER.POWER_CONFIGURATION),
          cluster: CLUSTER.POWER_CONFIGURATION,
          attributeName: 'batteryVoltage',
          minInterval: 0,
          maxInterval: 3600,
          minChange: 1,
        }]);

        await this.configureAttributeReporting([{
          endpointId: this.getClusterEndpoint(CLUSTER.POWER_CONFIGURATION),
          cluster: CLUSTER.POWER_CONFIGURATION,
          attributeName: 'batteryPercentageRemaining',
          minInterval: 0,
          maxInterval: 3600,
          minChange: 10,
        }]);
      } catch (err) {
        this.error('failed to configure attribute reporting for Power Configuration', err);
      }

    }

    const node = await this.homey.zigbee.getNode(this);
    node.handleFrame = (endpointId, clusterId, frame, meta) => {
      this.log("endpointId: ", endpointId,", clusterId: ", clusterId,", frame: ", frame, ", meta: ", meta);
      this.log('PAYLOAD6: ', frame[6]);
      this.log('PAYLOAD7: ', frame[7]);

      button = frame[6] === 0 ? 'button_none' : frame[6] === 1 ? 'button_reset' : frame[6] === 2 ? 'button_on' : frame[6] === 3 ? 'button_up' : frame[6] === 4 ? 'button_down' : frame[6] === 5 ? 'button_left' : frame[6] === 6 ? 'button_right' : 'EMPTY';
      this.log('BUTTON: ', button);

      action = frame[7] === 1 ? 'button_press' : frame[7] === 2 ? 'button_long_press' : frame[7] === 4 ? 'button_double_press' : frame[7] === 8 ? 'button_short_release' : frame[7] === 16 ? 'button_long_release' : frame[7] === 32 ? 'button_release' : 'EMPTY';
      this.log('ACTION: ', action);

      if (action === 'button_press') {
        press_start = Math.round(Date.now());
      }

      if ((action === 'button_press') || (action === 'button_long_press') || (action === 'button_double_press')) {
        remoteValue['button'] = this.buttonMap[`${button}`];
        remoteValue['scene'] = this.sceneMap[`${action}`];
        remoteValue['duration'] = 0;
      }

      if ((action === 'button_long_release') || (action === 'button_short_release')) {
        if (action === 'button_long_release') {
          press_end = Math.round(Date.now());
          press_duration = press_end - press_start;
          remoteValue['duration'] = press_duration;
        }
        if (action === 'button_short_release') {
          remoteValue['duration'] = 0;
        }

        this.log ('DURATION START: ', press_start);
        this.log ('DURATION END: ', press_end);
        this.log ('DURATION: ', press_duration);

        this.log('REMOTEVALUE: ', remoteValue);

        this.triggerFlow({
          id: 'controller_button',
          tokens: remoteValue,
          state: null,
        })
        .catch(err => this.error('Error triggering controller_button', err));

        if (remoteValue['button'] === 'Button') {
          this.triggerFlow({
            id: 'controller_on_button',
            tokens: remoteValue,
            state: null,
          })
          .catch(err => this.error('Error triggering controller_on_button', err));
        }

        if (remoteValue['button'] === 'Left Button') {
          this.triggerFlow({
            id: 'controller_left_button',
            tokens: remoteValue,
            state: null,
          })
          .catch(err => this.error('Error triggering controller_left_button', err));
        }

        if (remoteValue['button'] === 'Right Button') {
          this.triggerFlow({
            id: 'controller_right_button',
            tokens: remoteValue,
            state: null,
          })
          .catch(err => this.error('Error triggering controller_right_button', err));
        }

        if (remoteValue['button'] === 'Up Button') {
          this.triggerFlow({
            id: 'controller_up_button',
            tokens: remoteValue,
            state: null,
          })
          .catch(err => this.error('Error triggering controller_up_button', err));
        }

        if (remoteValue['button'] === 'Down Button') {
          this.triggerFlow({
            id: 'controller_down_button',
            tokens: remoteValue,
            state: null,
          })
          .catch(err => this.error('Error triggering controller_down_button', err));
        }

      }

    };

  }

}
module.exports = RC2X0;

/*  true
  2022-01-19T16:37:37.938Z zigbee-clusters:cluster ep: 1, cl: deviceConfiguration (64769) received frame customKeyEventReport deviceConfiguration.customKeyEventReport {
    groupId: 0,
    keyId: 2,
    keyEvent: 1,
    expandField: 0
  }
  2022-01-19T16:37:37.941Z zigbee-clusters:cluster ep: 1, cl: deviceConfiguration (64769) unknown command received: ZCLMfgSpecificHeader {
    frameControl: Bitmap [ clusterSpecific, manufacturerSpecific, directionToClient, disableDefaultResponse ],
    manufacturerId: 4456,
    trxSequenceNumber: 2,
    cmdId: 18,
    data: <Buffer 00 02 01 00>
  } { transId: 0, linkQuality: 15, dstEndpoint: 1, timestamp: 7930764 }
  2022-01-19T16:37:37.952Z zigbee-clusters:endpoint ep: 1, cl: deviceConfiguration (64769), error while handling frame unknown_command_received {
    meta: { transId: 0, linkQuality: 15, dstEndpoint: 1, timestamp: 7930764 },
    frame: ZCLMfgSpecificHeader {
      frameControl: Bitmap [ clusterSpecific, manufacturerSpecific, directionToClient, disableDefaultResponse ],
      manufacturerId: 4456,
      trxSequenceNumber: 2,
      cmdId: 18,
      data: <Buffer 00 02 01 00>
    }
  }
  2022-01-19T16:37:38.163Z zigbee-clusters:cluster ep: 1, cl: deviceConfiguration (64769) received frame customKeyEventReport deviceConfiguration.customKeyEventReport {
    groupId: 0,
    keyId: 2,
    keyEvent: 8,
    expandField: 0
  }
  2022-01-19T16:37:38.164Z zigbee-clusters:cluster ep: 1, cl: deviceConfiguration (64769) unknown command received: ZCLMfgSpecificHeader {
    frameControl: Bitmap [ clusterSpecific, manufacturerSpecific, directionToClient, disableDefaultResponse ],
    manufacturerId: 4456,
    trxSequenceNumber: 3,
    cmdId: 18,
    data: <Buffer 00 02 08 00>
  } { transId: 0, linkQuality: 15, dstEndpoint: 1, timestamp: 7931449 }
  2022-01-19T16:37:38.170Z zigbee-clusters:endpoint ep: 1, cl: deviceConfiguration (64769), error while handling frame unknown_command_received {
    meta: { transId: 0, linkQuality: 15, dstEndpoint: 1, timestamp: 7931449 },
    frame: ZCLMfgSpecificHeader {
      frameControl: Bitmap [ clusterSpecific, manufacturerSpecific, directionToClient, disableDefaultResponse ],
      manufacturerId: 4456,
      trxSequenceNumber: 3,
      cmdId: 18,
      data: <Buffer 00 02 08 00>
    }
  }
  2022-01-19T16:37:38.218Z zigbee-clusters:cluster ep: 1, cl: deviceConfiguration (64769) received frame customKeyEventReport deviceConfiguration.customKeyEventReport {
    groupId: 0,
    keyId: 2,
    keyEvent: 32,
    expandField: 0
  }
  2022-01-19T16:37:38.222Z zigbee-clusters:cluster ep: 1, cl: deviceConfiguration (64769) unknown command received: ZCLMfgSpecificHeader {
    frameControl: Bitmap [ clusterSpecific, manufacturerSpecific, directionToClient, disableDefaultResponse ],
    manufacturerId: 4456,
    trxSequenceNumber: 4,
    cmdId: 18,
    data: <Buffer 00 02 20 00>
  } { transId: 0, linkQuality: 15, dstEndpoint: 1, timestamp: 7931520 }
  2022-01-19T16:37:38.228Z zigbee-clusters:endpoint ep: 1, cl: deviceConfiguration (64769), error while handling frame unknown_command_received {
    meta: { transId: 0, linkQuality: 15, dstEndpoint: 1, timestamp: 7931520 },
    frame: ZCLMfgSpecificHeader {
      frameControl: Bitmap [ clusterSpecific, manufacturerSpecific, directionToClient, disableDefaultResponse ],
      manufacturerId: 4456,
      trxSequenceNumber: 4,
      cmdId: 18,
      data: <Buffer 00 02 20 00>
    }
  }*/
