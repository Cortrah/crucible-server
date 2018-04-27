'use strict';

const Command = require("../../main/Command");

module.exports = class SelectCard extends Command {

    constructor(args) {
        super('select-card');
        console.log(args);
    }

    doAction(store, command) {
        let data = command.data;
        console.log('select-card command called');
        let actor = store.actors[data.actorId];
        actor.selectedCardIndex = data.cardIndex;
        return 'ok'
    }
};
