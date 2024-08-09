'use strict';

const Homey = require('homey');

const { ZigBeeDevice } = require('homey-zigbeedriver');
const { debug, Cluster, CLUSTER } = require('zigbee-clusters');
const { Util } = require('homey-zigbeedriver');

const MAX_DIM = 254;

class LEDStringOutside extends ZigBeeDevice {

  async onNodeInit({ zclNode }) {
    // enable debugging
    this.enableDebug();

    // print the node's info to the console
    this.printNode();

    // Enables debug logging in zigbee-clusters
    debug(true);

        this.registerCapability('onoff', CLUSTER.ON_OFF, {
        get: 'onOff',
        getOpts: {
          getOnStart: true,
        },
        set: value => (value ? 'setOn' : 'setOff'),
        /**
         * Return empty object, the command specifies the action for this cluster ('setOn'/setOff').
         * @returns {{}}
         */
        setParser: () => ({}),
        report: 'onOff',
        /**
         * @param {boolean} value
         * @returns {boolean}
         */
        reportParser(value) {
          return value;
        },
      });

      this.registerCapability('dim', CLUSTER.LEVEL_CONTROL, {
        set: 'moveToLevelWithOnOff',
        /**
         * @param {number} value
         * @param {object} opts
         * @returns {{transitionTime: number, level: number}}
         */
        setParser(value, opts = {}) {
          if (value === 0) {
            this.setCapabilityValue('onoff', false);
          } else if (this.getCapabilityValue('onoff') === false && value > 0) {
            this.setCapabilityValue('onoff', true);
          }

          return {
            level: Math.round(value * MAX_DIM),
            transitionTime: 0,
          };
        },
        get: 'currentLevel',
        getOpts: {
          getOnStart: true,
        },
        report: 'currentLevel',
        /**
         * @param {number} value
         * @returns {number}
         */
        reportParser(value) {
          return value / MAX_DIM;
        },
      });

      try {
        await this.configureAttributeReporting([{
          endpointId: this.getClusterEndpoint(CLUSTER.ON_OFF),
          cluster: CLUSTER.ON_OFF,
          attributeName: 'onOff',
          minInterval: 0,
          maxInterval: 300,
          minChange: 1,
        }]);

        await this.configureAttributeReporting([{
          endpointId: this.getClusterEndpoint(CLUSTER.LEVEL_CONTROL),
          cluster: CLUSTER.LEVEL_CONTROL,
          attributeName: 'currentLevel',
          minInterval: 0,
          maxInterval: 300,
          minChange: 1,
        }]);
      } catch (err) {
        this.error('failed to configure attribute reporting for onoff or currentlevel', err);
      }
     }
}

module.exports = LEDStringOutside;
