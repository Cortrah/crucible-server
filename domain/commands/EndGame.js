'use strict';

const Command = require("../../main/Command");

module.exports = class EndGame extends Command {

    constructor(args) {
        super('end-game');
        console.log(args);
    }

    doAction(context, data) {
        console.log('end-game command called');
        console.log("end-game");
        state.game.status = "OVER";
        return 'ok'
    }
};
