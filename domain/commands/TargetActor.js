'use strict';

const Command = require("../../main/Command");

module.exports = class TargetActor extends Command {

    constructor(args) {
        super('target-actor');
        console.log(args);
    }

    doAction(state, data) {
        console.log('target-actor command called');
        let sourceActor = state.game.actors[data.sourceId];
        let targetActor = state.game.actors[data.targetId];
        let card = sourceActor.cards[data.cardIndex];
        if(sourceActor.mana >= card.value){
            sourceActor.mana -= card.value;
            sourceActor.cards.splice(sourceActor.selectedCardIndex, 1);
            sourceActor.selectedCardIndex = -1;
            if(card.cardType === "MISTLE") {
                state.game.mistles.push(data.mistle);
            } else if (card.cardType === "SHIELD"){
                targetActor.shields.push(data.shield);
            }
        }
        return 'ok'
    }
};
