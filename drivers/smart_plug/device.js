'use strict';

const { ZigBeeDevice } = require('homey-zigbeedriver');
const { CLUSTER } = require('zigbee-clusters');

class SmartPlug extends ZigBeeDevice {

  async onNodeInit({ zclNode }) {

      // this.enableDebug();
      // this.printNode();

      await super.onNodeInit({ zclNode });

      // Register onoff capability
  		this.registerCapability('onoff', CLUSTER.ON_OFF, {
  			getOpts: {
          getOnStart: true,
  				pollInterval: 15000,
  			},
  		});
		}
}

module.exports = SmartPlug;
