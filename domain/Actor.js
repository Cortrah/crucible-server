'use strict';

const Uuid = require('uuid');

const defaults = {
    index:0,
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
    isActive:true,
};

module.exports = class Actor {

    constructor(index, bus, options) {
        // ToDo: figure out why require constructor doesn't get arguments
        // console.log(bus);
        this.id = Uuid.v4();

        // required
        this.index = index;
        this.bus = bus;

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

        this.bus.addEventListener('game-tick', function(command) {
            gameTick(command)
        });
    }

    gameTick(command){
        // main bot logic
        // decide weather to draw a mistle, a shield, select a card or target a player
        // the GameTick command should have the store data for the game
        let drawMistle = new DrawMistle(this.bus, command.data);
        drawMistle.dispatch();

        // ToDo: Edit this from december version, logic should be there though
        if(this.game.status === "PLAYING"){
            for(var i = 0; i < this.game.players.length; i++) {
                let player = this.game.players[i];
                if (player.isActive && player.controller === "AI") {
                    // if the player has < 5 cards and more than 1 mana draw a card
                    if (player.cards.length < 5 && player.mana > 0) {
                        this.$store.dispatch({ type: 'drawMistle', playerId: i});
                    } else {
                        // once a player has 5 cards
                        // if the player has cards and enough mana to fire a mistle
                        // eventually choose the best mistle possible to fire
                        // in this case we just choose the first and wait till we can fire it
                        var ci = 0;
                        var card = player.cards[ci];
                        if (card.value < player.mana) {
                            this.$store.dispatch({ type: 'selectCard', playerId:i, cardIndex:ci});
                        }
                        // choose an enemy that's still active
                        if (player.team === "Good Guys") {
                            // make the enemy chosen random
                            let activeFoes = this.game.players.filter((player) =>
                                player.isActive && player.team === "Bad Guys"
                            );
                            let foeCount = activeFoes.length;
                            let foeChosen = Math.floor(Math.random()*foeCount);
                            let foe = activeFoes[foeChosen];
                            // and fire at it
                            this.$store.dispatch({
                                type: 'targetPlayer',
                                sourceId:i,
                                targetId:foe.id,
                                cardIndex:ci
                            });
                        } else {
                            // if the player is axis its enemy is an allie
                            let activeFoes = this.game.players.filter((player) =>
                                player.isActive && player.team === "Good Guys"
                            );
                            let foeCount = activeFoes.length;
                            let foeChosen = Math.floor(Math.random()*foeCount);
                            let foe = activeFoes[foeChosen];
                            // and fire at it
                            this.$store.dispatch({
                                type: 'targetPlayer',
                                sourceId:i,
                                targetId:foe.id,
                                cardIndex:ci
                            });
                        }
                    }
                }
            }
        } else if( this.game.status === "OVER") {
            clearInterval(this.gameIntervalId);
        }

    }

    drawMistle(game){

        const data = {};
        let myself = game.actors[this.index];
        if(myself.isActive && game.state.status === "PLAYING"){
            if(myself.cards.length < 5 && myself.deckSize > 0){
                this.bus.dispatchEvent('draw-mistle', data);
                //this.$bus.$emit("draw-mistle", this.user.playerId);
                //this.$store.dispatch({ type: 'drawMistle', actorId: actorId});
            }
        }
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
        this.bus.dispatchEvent('draw-shield', data);
    }

    selectCard(){

        const data = {};
        let myself = this.game.actors[this.user.playerId];
        if(myself.isActive && this.game.status === "PLAYING"){
            this.$bus.$emit("select-card", this.user.playerId, cardIndex);
            //this.$store.dispatch({ type: 'selectCard', actorId:actorId, cardIndex:cardIndex});
        }
        this.bus.dispatchEvent('select-card', data);
    }

    targetActor(){

        const data = {};
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
        this.bus.dispatchEvent('target-player', data);
    }
};