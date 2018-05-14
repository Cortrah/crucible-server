'use strict';

const Command = require("../../main/Command");

module.exports = class ShieldUp extends Command {

    constructor(shield) {
        super('shield-up');
        this.data = {
            shield: shield
        };
    }

    doAction(store, command) {
        let sourceActor = store.actors[this.data.shield.sourceId];
        let targetActor = store.actors[this.data.shield.targetId];
        if(store.status === "PLAYING") {
            this.data.shield.isUp = true;
        }
        return 'ok'
    }
};
