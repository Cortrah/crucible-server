'use strict';

const Command = require("../../main/Command");

module.exports = class DrawMistle extends Command {

    constructor(args) {
        super('draw-mistle');
        console.log(args);
    }

    doAction(context, data) {
        console.log('draw-mistle command called');
        console.log(context);
        console.log(data);
        return 'ok'
    }
};
