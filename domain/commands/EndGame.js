'use strict';

const Command = require("../../main/Command");

module.exports = class EndGame extends Command {

    constructor(args) {
        super('end-game');
        console.log(args);
    }

    doAction(state, command) {
        let data = command.data;
        console.log('end-game command called');
        console.log("end-game");
        store.status = "OVER";
        return 'ok'
    }
};
