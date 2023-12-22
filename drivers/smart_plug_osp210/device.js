'use strict';

const { ZigBeeDevice } = require('homey-zigbeedriver');
const { CLUSTER } = require('zigbee-clusters');

class SmartPlugOSP210 extends ZigBeeDevice {

  async onNodeInit({ zclNode }) {

      //this.enableDebug();
      //this.printNode();

      await super.onNodeInit({ zclNode });

      // Register onoff capability
      if (this.hasCapability('onoff')) {
  		  this.registerCapability('onoff', CLUSTER.ON_OFF, {
          getOpts: {
            getOnStart: true,
            pollInterval: this.getSetting('report_interval') * 1000 || 60000,
          },
        });
      }

		}

		onSettings({oldSettings, newSettings, changedKeys}) {

			this.log(changedKeys);
			this.log('newSettings', newSettings);
			this.log('oldSettings', oldSettings);

			// pollsetting report settings changed

			if (changedKeys.includes('report_interval')) {

				this.log('report_interval: ', newSettings.report_interval);

        this.registerCapability('onoff', CLUSTER.ON_OFF, {
          getOpts: {
            getOnStart: true,
            pollInterval: this.getSetting(newSettings.report_interval) * 1000,
          },
        });

			}
		}

}

module.exports = SmartPlugOSP210;
