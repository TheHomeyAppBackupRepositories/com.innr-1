'use strict';

const INNR_DIMMABLE = require('../../lib/INNR_DIMMABLE');

class RCL extends INNR_DIMMABLE {

  async onNodeInit({ zclNode }) {

    //this.printNode();

    await super.onNodeInit({ zclNode });

    if (!this.hasCapability('dim')) {
      await this.addCapability('dim').catch(this.error);
    }
  }
}

module.exports = RCL;
