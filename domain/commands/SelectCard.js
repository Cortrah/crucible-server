'use strict';

const Command = require("../../main/Command");

module.exports = class SelectCard extends Command {

    constructor(args) {
        super('select-card');
        console.log(args);
    }

    doAction(state, data) {
        console.log('select-card command called');
        let actor = state.game.actors[data.actorId];
        actor.selectedCardIndex = data.cardIndex;
        return 'ok'
    }
};
