'use strict';

const Command = require("../../main/Command");

module.exports = class DrawMistle extends Command {

    constructor(args) {
        super('draw-mistle');
        console.log(args);
    }

    doAction(context, data) {
        console.log('draw-mistle command called');
        let actor = state.game.actors[data.actorId];
        if(actor.mana >= 1 && actor.deck.length > 0) {
            let drawn = actor.deck[0];
            actor.cards.push({cardType:"MISTLE", value: drawn});
            actor.deck.splice(0, 1);
            actor.deckSize = actor.deck.length;
            actor.mana--;
        }
        return 'ok'
    }
};
