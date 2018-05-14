'use strict';

const Command = require("../../main/Command");

module.exports = class EndGame extends Command {

    constructor() {
        super('end-game');
    }

    doAction(store, command) {
        store.status = "OVER";
        return 'ok'
    }
};
