'use strict';

const { ZigBeeDevice } = require('homey-zigbeedriver');
const { CLUSTER } = require('zigbee-clusters');

class SmartPlugSP240 extends ZigBeeDevice {

  async onNodeInit({ zclNode }) {

      this.enableDebug();
      this.printNode();

      await super.onNodeInit({ zclNode });

      // Configuring the attribute reporting in combination with mapping it to a onoff capability
      if (this.hasCapability('onoff')) {
        this.registerCapability('onoff', CLUSTER.ON_OFF, {
          reportOpts: {
            configureAttributeReporting: {
              minInterval: 0, // No minimum reporting interval
              maxInterval: 300, // Maximally every 5
              minChange: 1, // Report when value changed by 1
            },
          },
        });
      }

    // Configuring the attribute reporting in combination with mapping it to a meter_power capability

    if (this.hasCapability('meter_power')) {
      this.meteringFactor = 0.01;
      this.registerCapability('meter_power', CLUSTER.METERING, {
        reportOpts: {
          configureAttributeReporting: {
            minInterval: 0, // No minimum reporting interval
            maxInterval: 300, // Maximally every 5 min
            minChange: 1, // Report when value changed by 1
          },
        },
      });
    }

    // Configuring the attribute reporting in combination with mapping it to a measure_power capability
    if (this.hasCapability('measure_power')) {
      if (typeof this.activePowerFactor !== 'number') {
       const { acPowerMultiplier, acPowerDivisor } = await zclNode.endpoints[
           this.getClusterEndpoint(CLUSTER.ELECTRICAL_MEASUREMENT)
         ]
         .clusters[CLUSTER.ELECTRICAL_MEASUREMENT.NAME]
         .readAttributes('acPowerMultiplier', 'acPowerDivisor');

       this.activePowerFactor = acPowerMultiplier / acPowerDivisor;
      }
      this.registerCapability('measure_power', CLUSTER.ELECTRICAL_MEASUREMENT, {
        reportOpts: {
          configureAttributeReporting: {
            minInterval: 0, // No minimum reporting interval
            maxInterval: 300, // Maximally every 5 min
            minChange: 1, // Report when value changed by 1
          },
        },
      });
    }

    // Configuring the attribute reporting in combination with mapping it to a measure_current capability
    if (this.hasCapability('measure_current')) {
      if (typeof this.acCurrentFactor !== 'number') {
        const { acCurrentMultiplier, acCurrentDivisor } = await zclNode.endpoints[
            this.getClusterEndpoint(CLUSTER.ELECTRICAL_MEASUREMENT)
          ]
          .clusters[CLUSTER.ELECTRICAL_MEASUREMENT.NAME]
          .readAttributes('acCurrentMultiplier', 'acCurrentDivisor');

        this.acCurrentFactor = acCurrentMultiplier/ acCurrentDivisor;
      }
      this.registerCapability('measure_current', CLUSTER.ELECTRICAL_MEASUREMENT, {
        reportOpts: {
          configureAttributeReporting: {
            minInterval: 0, // No minimum reporting interval
            maxInterval: 300, // Maximally every 5 min
            minChange: 10, // Report when value changed by 1
          },
        },
      });
    }

    // Configuring the attribute reporting in combination with mapping it to a measure_voltage capability
    if (this.hasCapability('measure_voltage')) {
      if (typeof this.activePowerFactor !== 'number') {
       const { acVoltageMultiplier, acVoltageDivisor } = await zclNode.endpoints[
           this.getClusterEndpoint(CLUSTER.ELECTRICAL_MEASUREMENT)
         ]
         .clusters[CLUSTER.ELECTRICAL_MEASUREMENT.NAME]
         .readAttributes('acVoltageMultiplier', 'acVoltageDivisor');
      this.acVoltageFactor = acVoltageMultiplier / acVoltageDivisor;
      }
      this.registerCapability('measure_voltage', CLUSTER.ELECTRICAL_MEASUREMENT, {
        reportOpts: {
          configureAttributeReporting: {
            minInterval: 0, // No minimum reporting interval
            maxInterval: 300, // Maximally every 5 min
            minChange: 1, // Report when value changed by 1
          },
        },
      });
    }

  }

}

module.exports = SmartPlugSP240;
