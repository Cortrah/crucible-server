'use strict';

const Command = require("../../main/Command");

module.exports = class ShieldUp extends Command {

    constructor(args) {
        super('shield-up');
        console.log(args);
    }

    doAction(store, command) {
        let data = command.data;
        console.log('shield-up command called');
        let sourceActor = store.actors[shield.sourceId];
        let targetActor =store.actors[shield.targetId];
        if(store.status === "PLAYING") {
            shield.isUp = true;
        }
        return 'ok'
    }
};
