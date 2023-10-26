'use strict';

const RC2X0 = require('../../lib/RC2X0');

class RC210 extends RC2X0 {

  async onNodeInit({ zclNode }) {
    // Mark device as unavailable while configuring
    await this.setUnavailable(this.homey.__('pairing.configuring'));

    // enable debugging
    // this.enableDebug();

    // print the node's info to the console
    // this.printNode();

    // supported scenes and their reported attribute numbers (all based on reported data)

    this.buttonMap = {
      button_on: 'Button',
      button_reset: 'Reset Button',
    };

    this.sceneMap = {
      button_press: 'Single Press',
      button_double_press: 'Double Press',
      button_long_press: 'Long Press',
    };

    await super.onNodeInit({ zclNode });

    // Finally device is ready to be used, mark as available
    await this.setAvailable();
  }

}

module.exports = RC210;
