'use strict';

const Command = require("../../main/Command");

module.exports = class SelectCard extends Command {

    constructor(args) {
        super('select-card');
        console.log(args);
    }

    doAction(context, data) {
        console.log('select-card command called');
        console.log(context);
        console.log(data);
        return 'ok'
    }
};
