'use strict';

const { ZigBeeDevice } = require('homey-zigbeedriver');
const { CLUSTER } = require('zigbee-clusters');

class INNR_SMARTPLUG_Z3 extends ZigBeeDevice {

  async onNodeInit({ zclNode }) {

      // this.enableDebug();
      // this.printNode();

      await super.onNodeInit({ zclNode });

      // Register onoff capability
  		this.registerCapability('onoff', CLUSTER.ON_OFF, {
  			getOpts: {
          getOnStart: true,

  			},
  		});

      let ModelID = this.node.productId;
      let ModelIDnumber = ModelID.match(/-?\d+/g).map(Number);

      this.log('ProductID: ', ModelID);
      this.log('ProductID first number: ', ModelIDnumber[0]);
      this.log(parseInt(ModelIDnumber[0], 10));
      if (parseInt(ModelIDnumber[0], 10) > 200) {
        this.log('ZIGBEE 3.0 DEVICE');

      } else {
        this.log('ZIGBEE 2.0 DEVICE');
      }

    }

}

module.exports = INNR_SMARTPLUG_Z3;
