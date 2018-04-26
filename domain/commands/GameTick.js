'use strict';

const Command = require("../../main/Command");

module.exports = class GameTick extends Command {

    constructor(args) {
        super('game-tick');
        console.log(args);
    }

    doAction(context, data) {
        console.log('game-tick command called');
        this.manaTick(this.store);
        return 'ok'
    }
};
