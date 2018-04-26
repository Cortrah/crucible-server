'use strict';

const Command = require("../../main/Command");

module.exports = class TargetActor extends Command {

    constructor(args) {
        super('target-actor');
        console.log(args);
    }

    doAction(context, data) {
        console.log('target-actor command called');
        console.log(context);
        console.log(data);
        return 'ok'
    }
};
