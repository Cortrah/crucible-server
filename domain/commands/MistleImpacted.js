'use strict';

const Command = require("../../main/Command");

module.exports = class MistleImpacted extends Command {

    constructor(args) {
        super('mistle-impacted');
        console.log(args);
    }

    doAction(store, command) {
        let data = command.data;
        console.log('mistle-impacted command called');
        let sourceActor = store.actors[mistle.sourceId];
        let targetActor = store.actors[mistle.targetId];
        if(store.status === "PLAYING") {
            targetActor.health = Math.max(0, targetActor.health - mistle.card.value);
            mistle.landed = true;
            if (targetActor.health <= 0) {
                targetActor.isActive = false;
                let activeOpponents = store.actors.filter(actor => (actor.isActive && actor.team === targetActor.team));
                if(activeOpponents.length === 0){
                    store.winner = sourceActor.team;
                    store.status = "OVER";
                }
            }
        }
        return 'ok'
    }
};
