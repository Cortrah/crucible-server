'use strict';

const uuid = require('uuid');

const defaults = {
    name:'?',
    team:'Bad Guys',
    controller:'AI',
    avatarImg:'../static/robot3.png',
    maxMana:0,
    mana:0,
    maxHealth:30,
    health:30,
    shields:[],
    cards:[],
    selectedCardIndex:0,
    deck:[0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
    deckSize:20,
    drawEnabled:false,
    isbleedingOut:false,
    isActive:true
};

module.exports = class Actor {

    constructor(id, bus, options) {

        // required
        this.id = uuid.v4();
        this.bus = bus;
        console.log(bus);

        if (typeof options !== 'undefined'){
            this.name = options.name || defaults.name;
            this.team = options.team || defaults.team;
            this.controller = options.controller || defaults.controller;
            this.avatarImg = options.avatarImg || defaults.avatarImg;
            this.maxMana = options.maxMana || defaults.maxMana;
            this.mana =  options.mana || defaults.mana;
            this.maxHealth = options.maxHealth || defaults.maxHealth;
            this.health = options.health || defaults.health;
            this.shields = options.shields || [];
            this.cards = options.cards || [];
            this.selectedCardIndex = options.selectedCardIndex || defaults.selectedCardIndex;
            this.deck = options.deck || Object.assign(this.deck, defaults.deck);
            this.deckSize = options.deckSize || defaults.deckSize;
            this.drawEnabled = options.drawEnabled || defaults.drawEnabled;
            this.isbleedingOut = options.isbleedingOut || defaults.isbleedingOut;
            this.isActive = options.isActive || defaults.isActive;
        } else {
            Object.assign(this, defaults);
        }
    }

    drawMistle(){

        const data = {};
        let myself = this.game.actors[this.user.playerId];
        if(myself.isActive && this.game.status === "PLAYING"){
            if(myself.cards.length < 5 && myself.deckSize > 0){
                this.$bus.$emit("draw-mistle", this.user.playerId);
                //this.$store.dispatch({ type: 'drawMistle', actorId: actorId});
            }
        }
        this.bus.dispatch('draw-mistle', data);
    }

    drawShield(){

        const data = {};
        let myself = this.game.actors[this.user.playerId];
        if(myself.isActive && this.game.status === "PLAYING"){
            if(myself.cards.length < 5 && myself.deckSize > 0) {
                this.$bus.$emit("draw-shield", this.user.playerId);
                //this.$store.dispatch({ type: 'drawShield', actorId: actorId});
            }
        }
        this.bus.dispatch('draw-shield', data);
    }

    selectCard(){

        const data = {};
        let myself = this.game.actors[this.user.playerId];
        if(myself.isActive && this.game.status === "PLAYING"){
            this.$bus.$emit("select-card", this.user.playerId, cardIndex);
            //this.$store.dispatch({ type: 'selectCard', actorId:actorId, cardIndex:cardIndex});
        }
        this.bus.dispatch('select-card', data);
    }

    targetActor(){

        const data = {};
        // if no store.user.actorId == null and game.status === "Preparing"
        // then we are setting a slot to a player instead of a bot
        // (if there is an actorId there should be a way to leave a spot by setting it back to null)
        if ((this.user.playerId == null) && (this.game.status === "Preparing")){
            this.$bus.$emit("sit-at-table", targetId);
        }

        let myself = this.game.actors[this.user.playerId];
        let cardIndex = myself.selectedCardIndex;
        if(myself.isActive && this.game.status === "PLAYING"){
            this.$bus.$emit("target-actor", this.user.playerId, targetId, cardIndex);
            // this.$store.dispatch({
            //     type: 'targetActor',
            //     sourceId:sourceId,
            //     targetId:targetId,
            //     cardIndex:cardIndex
            // });
        }
        this.bus.dispatch('target-player', data);
    }
};