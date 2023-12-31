'use strict';

const { ZigBeeLightDevice } = require('homey-zigbeedriver');
const { CLUSTER } = require('zigbee-clusters');

class INNR_RGBW extends ZigBeeLightDevice {

  async onNodeInit({ zclNode }) {

      this.enableDebug();
      this.printNode();

    //  await super.onNodeInit({ zclNode });

      this.setStoreValue('colorTempMin', 153).catch(this.error); // 6500K = 153 Mired
      this.setStoreValue('colorTempMax', 555).catch(this.error); // 1800K = 555 Mired

      await super.onNodeInit({ zclNode, supportsHueAndSaturation: false, supportsColorTemperature: true });

        let ModelID = this.node.productId;
        let ModelIDnumber = ModelID.match(/-?\d+/g).map(Number);

        this.log('ProductID: ', ModelID);
        this.log('ProductID first number: ', ModelIDnumber[0]);
        this.log(parseInt(ModelIDnumber[0], 10));
        if (parseInt(ModelIDnumber[0], 10) > 200) {
          this.log('ZIGBEE 3.0 DEVICE');
          try {
            await this.configureAttributeReporting([
              {
                endpointId: 1,
                cluster: CLUSTER.ON_OFF,
                attributeName: 'onOff',
                minInterval: 0,
                maxInterval: 300,
              },
              {
                endpointId: 1,
                cluster: CLUSTER.LEVEL_CONTROL,
                attributeName: 'currentLevel',
                minInterval: 0,
                maxInterval: 300,
                minChange: 10,
              },
              {
                endpointId: 1,
                cluster: CLUSTER.COLOR_CONTROL,
                attributeName: 'currentHue',
                minInterval: 0,
                maxInterval: 300,
                minChange: 10,
              },
              {
                endpointId: 1,
                cluster: CLUSTER.COLOR_CONTROL,
                attributeName: 'currentSaturation',
                minInterval: 0,
                maxInterval: 300,
                minChange: 10,
              },
              {
                endpointId: 1,
                cluster: CLUSTER.COLOR_CONTROL,
                attributeName: 'currentX',
                minInterval: 0,
                maxInterval: 300,
                minChange: 10,
              },
              {
                endpointId: 1,
                cluster: CLUSTER.COLOR_CONTROL,
                attributeName: 'currentY',
                minInterval: 0,
                maxInterval: 300,
                minChange: 10,
              },
            ]);
          } catch (err) {
            this.log('could not configure Attribute Reporting');
            this.log(err);
            }

          } else {
              this.log('ZIGBEE 2.0 DEVICE');
          }

    }

    async onSettings({oldSettings, newSettings, changedKeys}) {

      this.log(changedKeys);
      this.log('oldSettings', oldSettings);
      this.log('newSettings', newSettings);

      if (changedKeys.includes('On_Off_TransitionTime')) {

        this.log('On_Off_TransitionTime: ', newSettings.On_Off_TransitionTime * 10);

        try {
          await this.zclNode.endpoints[this.getClusterEndpoint(CLUSTER.LEVEL_CONTROL)].clusters[CLUSTER.LEVEL_CONTROL.NAME].writeAttributes({onOffTransitionTime: newSettings.On_Off_TransitionTime * 10})
        } catch (err) {
            this.log('could not write On_Off_TransitionTime');
            this.log(err);
        }
      }
    }

}

module.exports = INNR_RGBW;
