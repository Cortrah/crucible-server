'use strict';

const Command = require("../../main/Command");

module.exports = class DrawShield extends Command {

    constructor(actorId) {
        super('draw-shield');
        this.data = {
            actorId: actorId || 0
        };
    }

    doAction(store, command) {
        let data = command.data;
        let actor = store.actors[data.actorId];
        if(actor.mana >= 1 && actor.deck.length > 0) {
            let drawn = actor.deck[0];
            actor.cards.push({cardType:"SHIELD", value: drawn});
            actor.deck.splice(0, 1);
            actor.deckSize = actor.deck.length;
            actor.mana--;
        }
        return 'ok'
    }
};
