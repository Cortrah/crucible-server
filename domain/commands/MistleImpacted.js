'use strict';

const Command = require("../../main/Command");

module.exports = class MistleImpacted extends Command {

    constructor(args) {
        super('mistle-impacted');
        console.log(args);
    }

    doAction(context, data) {
        console.log('mistle-impacted command called');
        console.log(context);
        console.log(data);
        return 'ok'
    }
};
