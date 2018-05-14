'use strict';

const Command = require("../../main/Command");

module.exports = class SelectCard extends Command {

    constructor(actorId) {
        super('select-card');
        this.data = {
            actorId: actorId || 0
        };
    }

    doAction(store, command) {
        let data = command.data;
        let actor = store.actors[data.actorId];
        actor.selectedCardIndex = data.cardIndex;
        return 'ok'
    }
};
