'use strict';

const Command = require("../../main/Command");

module.exports = class StartGame extends Command {

    constructor(bus, store) {
        super('start-game');
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
        console.log('start-game command called');
        console.log(store);
        console.log(data);

        store.gameIntervalId = setInterval(this.gameTick, this.store.rules.gameTickInterval);
        let scope = this;
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
        return 'ok'
    }
};
