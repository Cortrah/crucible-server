'use strict';

const Command = require("../../main/Command");

module.exports = class MistleImpacted extends Command {

    constructor(args) {
        super('mistle-impacted');
        console.log(args);
    }

    doAction(context, data) {
        console.log('mistle-impacted command called');
        let sourceActor = state.game.actors[mistle.sourceId];
        let targetActor = state.game.actors[mistle.targetId];
        if(state.game.status === "PLAYING") {
            targetActor.health = Math.max(0, targetActor.health - mistle.card.value);
            mistle.landed = true;
            if (targetActor.health <= 0) {
                targetActor.isActive = false;
                let activeOpponents = state.game.actors.filter(actor => (actor.isActive && actor.team === targetActor.team));
                if(activeOpponents.length === 0){
                    state.game.winner = sourceActor.team;
                    state.game.status = "OVER";
                }
            }
        }
        return 'ok'
    }
};
