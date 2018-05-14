'use strict';

const Command = require("../../main/Command");
const GameTick = require("./GameTick");

module.exports = class StartGame extends Command {

    constructor() {
        super('start-game');
    }

    doAction(store, command) {
        console.log(store)
        console.log(command)

        if(typeof store !== 'undefined'){
            store.gameIntervalId = setInterval(this.gameTick, store.rules.gameTickInterval);

            // shuffle each actors deck
            store.actors.forEach(function(actor){
                let remaining = actor.deck.length;
                let randomIndex;
                let last;
                while (remaining) {
                    randomIndex = Math.floor(Math.random() * remaining--);
                    last = actor.deck[remaining];
                    actor.deck[remaining] = actor.deck[randomIndex];
                    actor.deck[randomIndex] = last;
                }
            });
            store.status = "PLAYING";
            store.timeStarted = Date.now();
            store.timeRunning = 0;
        }
        return 'ok'
    }

    gameTick(){
        new GameTick().dispatch(this.bus, this.store);
    }
};
