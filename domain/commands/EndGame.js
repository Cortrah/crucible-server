'use strict';

const Command = require("../../main/Command");

module.exports = class EndGame extends Command {

    constructor(args) {
        super('end-game');
        console.log(args);
    }

    doAction(context, data) {
        console.log('end-game command called');
        console.log(context);
        console.log(data);
        return 'ok'
    }
};
