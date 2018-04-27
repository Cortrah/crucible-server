'use strict';

const Command = require("../../main/Command");

module.exports = class TargetActor extends Command {

    constructor(sourceId, targetId, cardIndex) {
        super('target-actor');
        this.data = {
            sourceId: actorId || 0,
            targetId: targetId || 0,
            cardIndex: cardIndex || 0,
        };
    }

    doAction(store, command) {
        let data = command.data;
        let sourceActor = store.actors[data.sourceId];
        let targetActor = store.actors[data.targetId];
        let card = sourceActor.cards[data.cardIndex];
        if(sourceActor.mana >= card.cardValue){
            sourceActor.mana -= card.cardValue;
            sourceActor.cards.splice(sourceActor.selectedCardIndex, 1);
            sourceActor.selectedCardIndex = -1;
            if(card.cardType === "MISTLE") {
                store.mistles.push(card);
            } else if (card.cardType === "SHIELD"){
                targetActor.shields.push(card);
            }
        }
        return 'ok'
    }
};
