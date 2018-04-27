'use strict';

const Command = require("../../main/Command");

module.exports = class DrawShield extends Command {

    constructor(args) {
        super('draw-shield');
        console.log(args);
    }

    doAction(state, command) {
        let data = command.data;
        console.log('draw-shield command called');
        let actor = state.game.actors[data.actorId];
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
