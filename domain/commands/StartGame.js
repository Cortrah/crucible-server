'use strict';

const Command = require("../../main/Command");

module.exports = class StartGame extends Command {

    constructor(args) {
        super('start-game');
        console.log(args);
    }

    doAction(state, data) {
        console.log('start-game command called');
        console.log(state);
        console.log(data);

         state.gameIntervalId = setInterval(this.gameTick, this.rules.gameTickInterval);
         let scope = this;
         state.game.actors.forEach(function(actor){
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
         state.game.status = "PLAYING";
         state.game.timeStarted = Date.now();
         state.game.timeRunning = 0;
        return 'ok'
    }
};
