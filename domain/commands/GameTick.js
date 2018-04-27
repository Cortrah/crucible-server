'use strict';

const Command = require("../../main/Command");

module.exports = class GameTick extends Command {

    constructor(bus, store) {
        super('game-tick');
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
        console.log('game-tick command called');
        this.manaTick(this.store);
        return 'ok'
    }
};
