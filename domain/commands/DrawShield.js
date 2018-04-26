'use strict';

const Command = require("../../main/Command");

module.exports = class DrawShield extends Command {

    constructor(args) {
        super('draw-shield');
        console.log(args);
    }

    doAction(context, data) {
        console.log('draw-shield command called');
        console.log(context);
        console.log(data);
        return 'ok'
    }
};
