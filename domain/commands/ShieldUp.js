'use strict';

const Command = require("../../main/Command");

module.exports = class ShieldUp extends Command {

    constructor(args) {
        super('shield-up');
        console.log(args);
    }

    doAction(context, data) {
        console.log('shield-up command called');
        console.log(context);
        console.log(data);
        return 'ok'
    }
};
