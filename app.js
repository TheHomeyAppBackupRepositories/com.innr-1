'use strict';

const Homey = require('homey');

// Enable zigbee-cluster logging
const { Util } = require('homey-zigbeedriver');
const { debug } = require('zigbee-clusters');
const { CLUSTER } = require('zigbee-clusters');

// Enables debug logging in zigbee-clusters
debug(true);

class INNRZigbeeApp extends Homey.App {
	onInit() {
		this.log('init');

		// Controller button trigger cards
		this.triggerController_button = this.homey.flow
		.getDeviceTriggerCard('controller_button');


		this.actionStartDimLevelChange = this.homey.flow.getActionCard('action_DIM_startLevelChange');
			//.register()
			this.actionStartDimLevelChange
				.registerRunListener(this.actionStartDimLevelChangeRunListener.bind(this));
		this.actionStopDimLevelChange = this.homey.flow.getActionCard('action_DIM_stopLevelChange');
			//.register()
			this.actionStopDimLevelChange
				.registerRunListener(this.actionStopDimLevelChangeRunListener.bind(this));
	}

	async actionStartDimLevelChangeRunListener(args, state) {

		if (!args.hasOwnProperty('direction')) return Promise.reject('direction_property_missing');
		args.device.log('FlowCardAction triggered to start dim level change in direction', args.direction, 'with rate', 100 * args.rate);

		if (args.device.zclNode.endpoints[1].clusters[CLUSTER.LEVEL_CONTROL.NAME]) {
					args.device.log("FlowCardAction triggered to start action_DIM_startLevelChange");
					args.device.log("ARGS.DIRECTION: ", args.direction);
					// return await args.device.node.endpoints[1].clusters['genLevelCtrl'].do("moveWithOnOff", moveObj)
					//return await this.setClusterCapabilityValue('dim', CLUSTER.LEVEL_CONTROL, moveObj.movemode, {duration: moveObj.rate});

					// Send moveToLevel command to levelControl cluster on endpoint 1 and don't wait for
					// the default response confirmation.
					//zcl level-control move [moveMode:1] [rate:1] [optionMask:1] [optionOverride:1]
				await args.device.zclNode.endpoints[1].clusters[CLUSTER.LEVEL_CONTROL.NAME].move({moveMode: parseInt(args.direction), rate: Math.round(100 * args.rate)});
		}

		const result = await args.device.zclNode.endpoints[1].clusters[CLUSTER.LEVEL_CONTROL.NAME].readAttributes('currentLevel');

		args.device.log("RESULT OFF READ LEVEL: ",result);
		if (args.device.getCapabilityValue('onoff') === false && result > 0) {
			args.device.setCapabilityValue('onoff', true);
		}
		// 4. update dim capability
		if (args.device.hasCapability('dim')) {
			args.device.setCapabilityValue('dim', result / 254);
		}
	}

	async actionStopDimLevelChangeRunListener(args, state) {
		args.device.log("FlowCardAction triggered to stop dim level change");

		if (args.device.zclNode.endpoints[1].clusters[CLUSTER.LEVEL_CONTROL.NAME]) {

			try {
				// 1. trigger stop command
				// await args.device.node.endpoints[1].clusters["genLevelCtrl"].do("stop", {});
				await args.device.zclNode.endpoints[1].clusters[CLUSTER.LEVEL_CONTROL.NAME].stop()

				// 2. when stop command is successfull, trigger currentLevel read command
				// const result = await args.device.node.endpoints[1].clusters["genLevelCtrl"].read("currentLevel");

				const result = await args.device.zclNode.endpoints[1].clusters[CLUSTER.LEVEL_CONTROL.NAME].readAttributes('currentLevel');

				args.device.log(result);
				args.device.log('Updating capabilities after stopping, onoff:', result > 1, 'dim:', result / 254);
				// 3. update onoff capability

				if (args.device.getCapabilityValue('onoff') === false && result > 0) {
		      args.device.setCapabilityValue('onoff', true);
				}
				// 4. update dim capability
				if (args.device.hasCapability('dim')) {
					args.device.setCapabilityValue('dim', result / 254);
				}
			}
			catch (err) {
				args.device.log(err);
				return Promise.reject(err);;
			}
		}
		else {
			return Promise.reject('unknown_error');
		}
	}

}

module.exports = INNRZigbeeApp;
