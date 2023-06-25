'use strict';

const { Cluster } = require('zigbee-clusters');
const { ZCLDataTypes } = require('zigbee-clusters');

const ATTRIBUTES = {
	gpsMaxSinkTableEntries: { id: 0, type: ZCLDataTypes.uint8 },
	// SinkTable: { id: 1, type: ZCLDataTypes.eraw};
	gpsCommunicationMode: { id: 2, type: ZCLDataTypes.map8 },
	gpsCommissioningExitMode: { id: 3, type: ZCLDataTypes.map8 },
	gpsCommissioningWindow: { id: 4, type: ZCLDataTypes.uint16 },
	gpsSecurityLevel: { id: 5, type: ZCLDataTypes.map8 },
	gpsFunctionality: { id: 6, type: ZCLDataTypes.map24 },
	gpsActiveFunctionality: { id: 7, type: ZCLDataTypes.map24 },
	gppMaxProxyTableEntries: { id: 16, type: ZCLDataTypes.uint8 },
	// ProxyTable: { id: 17, type: ZCLDataTypes.eraw};
	gppFunctionality: { id: 22, type: ZCLDataTypes.map24 },
	gppActiveFunctionality: { id: 23, type: ZCLDataTypes.map24 },
	gpSharedSecurityKeyType: { id: 32, type: ZCLDataTypes.map8 },
	gpSharedSecurityKey: { id: 33, type: ZCLDataTypes.key128 },
	gpLinkKey: { id: 34, type: ZCLDataTypes.key128 },
};

const COMMANDS = {
	GPNotification: { id: 0 },
	GPPairing: { id: 1 },
	GPProxyCommissioningMode: { id: 2 },
	GPCommissioningNotification: { id: 4 },
	GPResponse: { id: 6 },
	GPSinkTableResponse: { id: 10 },
	GPProxyTableResponse: { id: 11 },
};

class GreenPowerProxy extends Cluster {

	static get ID() {
		return 33; // 0x0021
	}

	static get NAME() {
		return 'GreenPowerProxy';
	}

	static get ATTRIBUTES() {
		return ATTRIBUTES;
	}

	static get COMMANDS() {
		return COMMANDS;
	}

}

Cluster.addCluster(GreenPowerProxy);

module.exports = GreenPowerProxy;
