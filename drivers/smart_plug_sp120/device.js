'use strict';

const { ZigBeeDevice } = require('homey-zigbeedriver');
const { CLUSTER } = require('zigbee-clusters');

class SmartPlugSP120 extends ZigBeeDevice {

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

			if (this.hasCapability('meter_power')) {
        this.meteringFactor = 0.01;
				this.registerCapability('meter_power', CLUSTER.METERING, {
					getOpts: {
						getOnStart: true,
						pollInterval: 3600000,
					},
          endpoint: this.getClusterEndpoint(CLUSTER.METERING),
				});
			}

			if (this.hasCapability('measure_power')) {
        if (typeof this.activePowerFactor !== 'number') {
          try {
            const { acPowerMultiplier, acPowerDivisor } = await zclNode.endpoints[
                this.getClusterEndpoint(CLUSTER.ELECTRICAL_MEASUREMENT)
              ]
              .clusters[CLUSTER.ELECTRICAL_MEASUREMENT.NAME]
              .readAttributes('acPowerMultiplier', 'acPowerDivisor');

            this.activePowerFactor = acPowerMultiplier / acPowerDivisor;
          } catch (err) {
            this.error('Error: could not read electrical measurement attributes', err);
          }
        }
				this.registerCapability('measure_power', CLUSTER.ELECTRICAL_MEASUREMENT, {
					getOpts: {
						getOnStart: true,
						pollInterval: this.getSetting('report_interval') * 1000 || 60000,
					},
          endpoint: this.getClusterEndpoint(CLUSTER.ELECTRICAL_MEASUREMENT),
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

        this.registerCapability('measure_power', CLUSTER.ELECTRICAL_MEASUREMENT, {
					getOpts: {
						getOnStart: true,
						pollInterval: this.getSetting(newSettings.report_interval) * 1000,
					},
          endpoint: this.getClusterEndpoint(CLUSTER.ELECTRICAL_MEASUREMENT),
				});

			}
		}

}

module.exports = SmartPlugSP120;
