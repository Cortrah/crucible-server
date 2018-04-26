'use strict';

const Command = require("../../main/Command");

module.exports = class ShieldUp extends Command {

    constructor(args) {
        super('shield-up');
        console.log(args);
    }

    doAction(context, data) {
        console.log('shield-up command called');
        let sourceActor = state.game.actors[shield.sourceId];
        let targetActor = state.game.actors[shield.targetId];
        if(state.game.status === "PLAYING") {
            shield.isUp = true;
        }
        return 'ok'
    }
};
