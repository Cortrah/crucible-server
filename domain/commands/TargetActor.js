'use strict';

const Command = require("../../main/Command");

module.exports = class TargetActor extends Command {

    constructor(bus, store) {
        super('target-actor');
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
        console.log('target-actor command called');
        let sourceActor = store.actors[data.sourceId];
        let targetActor = store.actors[data.targetId];
        let card = sourceActor.cards[data.cardIndex];
        if(sourceActor.mana >= card.value){
            sourceActor.mana -= card.value;
            sourceActor.cards.splice(sourceActor.selectedCardIndex, 1);
            sourceActor.selectedCardIndex = -1;
            if(card.cardType === "MISTLE") {
                store.mistles.push(data.mistle);
            } else if (card.cardType === "SHIELD"){
                targetActor.shields.push(data.shield);
            }
        }
        return 'ok'
    }
};
