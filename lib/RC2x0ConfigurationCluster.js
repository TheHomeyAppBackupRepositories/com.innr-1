'use strict';

const { Cluster, ZCLDataTypes, ZCLDataType } = require('zigbee-clusters');

const COMMANDS = {
	buttonspushedreport: {
		id: 18,
		manufacturerId: 4456,
		args: {
			groupId: ZCLDataTypes.uint8,
			//keyId: ZCLDataTypes.uint8,
			keyId: ZCLDataTypes.enum8({
        button_none: 0,
				button_reset: 1,
				button_ok: 2,
				button_up: 3,
				button_down: 4,
				button_left: 5,
				button_right: 6,
      }),
			//keyEvent: ZCLDataTypes.uint8,
			keyEvent: ZCLDataTypes.enum8({
        button_press: 1,
				button_long_press: 2,
				button_double_press: 4,
				button_short_release: 8,
				button_long_release: 16,
				button_release: 32,
      }),
			expandField: ZCLDataTypes.uint8,
		},
	}
};

const ATTRIBUTES = {
		DeviceInformation: { id: 0x0000, type: ZCLDataTypes.uint32, manufacturerId: 4454, },
		KeyReportMask: { id: 0x0004, type: ZCLDataTypes.uint8, manufacturerId: 4454, },
		ClusterVersion: { id: 0xFFFD, type: ZCLDataTypes.uint16, manufacturerId: 4454, },
}

class RC2x0ConfigurationCluster extends Cluster {

	static get COMMANDS() {
		return COMMANDS;
	}

	static get ID() {
		return 64769; // 0xFD01
	}

	static get NAME() {
		return 'deviceConfiguration';
	}

	static get ATTRIBUTES() {
		return ATTRIBUTES;
	}

}

Cluster.addCluster(RC2x0ConfigurationCluster);

module.exports = RC2x0ConfigurationCluster;
