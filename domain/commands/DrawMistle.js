'use strict';

const Command = require("../../main/Command");

module.exports = class DrawMistle extends Command {

    constructor(bus, store) {
        super('draw-mistle');
        console.log(args);
        this.bus = bus;
        this.store = store;
    }

    // eventually use the bus and the store from the constructor
    // for now they are placeholders until I figure out the problem with the constructor args
    dispatch(bus, store) {
        bus.dispatchEvent(this.name, store);
    }

    doAction(store, command) {
        let data = command.data;
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
