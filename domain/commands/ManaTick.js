'use strict';

const Command = require("../../main/Command");

module.exports = class ManaTick extends Command {

    constructor(args) {
        super('mana-tick');
        console.log(args);
    }

    doAction(context, data) {
        console.log('mana-tick command called');
        console.log(context);
        console.log(data);
        return 'ok'
    }
};
