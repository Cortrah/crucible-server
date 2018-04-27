'use strict';

const Command = require("../../main/Command");

module.exports = class ManaTick extends Command {

    constructor(args) {
        super('mana-tick');
        console.log(args);
    }

    doAction(store, command) {
        let data = command.data;
        console.log('mana-tick command called');
        console.log("mana-tick");
        store.actors.forEach(function(actor){
            if(actor.maxMana < 10){
                actor.maxMana++;
            }
            if(actor.mana < actor.maxMana){
                actor.mana++;
            }
            if(actor.deck.length <= 0 && actor.cards.length === 0 && actor.isActive){
                actor.health--;
            }
        });
        this.gameEnded(this.store)
        return 'ok'
    }
};
