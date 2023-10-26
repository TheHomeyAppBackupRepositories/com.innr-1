'use strict';

const { ZigBeeLightDevice } = require('homey-zigbeedriver');
const { CLUSTER } = require('zigbee-clusters');
// const { greenPowerProxy } = require('../../lib/greenPowerProxy');

class INNR_DIM extends ZigBeeLightDevice {

  async onNodeInit({ zclNode }) {

      // this.enableDebug();
      // this.printNode();

        await super.onNodeInit({ zclNode });

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

module.exports = INNR_DIM;
