'use strict';

const { BoundCluster } = require('zigbee-clusters');

class RC2x0ConfigurationBoundCluster extends BoundCluster {

	constructor(onButtonpushedreport) {
    super();
    this._onButtonpushedreport = onButtonpushedreport;
  }

	buttonspushedreport() {
		if (typeof this._onButtonpushedreport === 'function') {
			this._onButtonpushedreport();
			This.log('onButtonspushedreport received');
		}
  }

}

module.exports = RC2x0ConfigurationBoundCluster;
