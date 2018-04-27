'use strict';

const Command = require("../../main/Command");
const ManaTick = require("./ManaTick");

module.exports = class GameTick extends Command {

    constructor() {
        super('game-tick');
    }

    doAction(store, command) {
        new ManaTick().dispatch(store);
        return 'ok'
    }
};
