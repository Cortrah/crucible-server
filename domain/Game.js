'use strict';

const Uuid = require('uuid');
const Bus = require('../main/Bus');
const Actor = require('./Actor');

const StartGame = require('./commands/StartGame');

module.exports = class Game {

    constructor(options) {
        this.id = Uuid.v4();
        this.bus = new Bus();

        this.store = {
            name:'Waypoint Crucible Game X',
            status:'PREPARING',
            winner:'',
            actors:[],
            mistles:[],
            shields:[],
            gameIntervalId: null,
            manaIntervalId: null,
            timeStarted: 0,
            timeRunning: 0,
        };

        // ----------------------------------------------------
        // game events, host only
        // ----------------------------------------------------
        // 'start-game' table.game

        // ----------------------------------------------------
        // server events for actors, client events for players
        // ----------------------------------------------------
        // 'draw-mistle' gameId actorId
        // 'draw-shield' gameId  actorId
        // 'select-card' gameId  actorId cardIndex
        // 'target-actor' gameId  sourceId targetId cardIndex

        // ----------------------------------------------
        // always server initiated
        // ----------------------------------------------
        // 'mana-tick',
        // 'game-tick',
        // 'mistle-impact',
        // 'shield-up',
        // 'end-game'

        // ToDo: read these by loading the list of commands and getting their names and parameters (and type them)
        this.gameEvents = [
            'start-game',
            'draw-mistle','draw-shield',
            'select-card','target-actor',
            'game-tick','mana-tick',
            'mistle-impact',
            'shield-up',
            'end-game'
        ];

        this.commands = [
            new StartGame()
        ];

        this.rules = {
            maxMana: 10,
            maxHealth: 30,
            startingDeck: [0, 0, 1, 1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5, 6, 6, 7, 8],
            startingHandSize: 0,
            maxCards: 5,
            gameTickInterval: 1000,
            manaGrowthInterval: 1000,
            manaReplentishInterval: 1000,
            drawInterval: 1000,
            fireInterval: 500,
            bleedoutInterval: 1000,
            flightTime: 4000,
            shieldsUpTime: 1000,
            shieldDecayRate: 1000
        };

        this.actorCount = 10;
        for (let i = 0; i < this.actorCount; i++) {
            let avatarImg =  this.randomRobotImg();
            let team = "Bad Guys";
            if (i >= this.actorCount / 2) {
                team = 'Good Guys';
            }
            // ToDo: figure out why require constructor doesn't get arguments
            let newActor = new Actor();
            newActor.id = i;
            newActor.bus = this.bus;
            newActor.team = team;
            newActor.avatarImg = avatarImg;
            this.store.actors.push(newActor);
        }
        this.created();
    }

    created(){

        // this.gameEvents.forEach(eventName => {
        //     this.bus.registerEvent(eventName);
        //     this.bus.addEventListener(eventName, function(data) {
        //         _scope.eventSwitch(eventName, data)
        //     });
        // });

        let _scope = this;
        this.commands.forEach(command => {
            this.bus.registerEvent(command.name);
            this.bus.addEventListener(command.name, function(command) {
                _scope.eventSwitch(command)
            });
        });
        this.bus.dispatchEvent('start-game');
    }

    beforeDestroy(){
        clearInterval(this.store.gameIntervalId);
    }

    eventSwitch(command) {
        switch (command.name) {
            case 'start-game': {
                this.startGame(this.store, command.data);
                command.doAction(this.store, command.data);
                // in vue
                // this.$store.dispatch('startGame', data);
                break;
            }
            case 'game-tick': {
                this.gameTick(this.store, data);
                break;
            }
            case 'mana-tick': {
                this.manaTick(this.store, data);
                break;
            }
            case 'draw-mistle': {
                this.mistleDrawn(this.store, data);
                break;
            }
            case 'draw-shield': {
                this.shieldDrawn(this.store, data);
                break;
            }
            case 'select-card': {
                this.cardSelected(this.store, data);
                break;
            }
            case 'target-actor': {
                this.actorTargeted(this.store, data);
                break;
            }
            case 'mistle-impacted': {
                this.mistleImpacted(this.store, data);
                break;
            }
            case 'shield-up': {
                this.shieldUp(this.store, data);
                break;
            }
            case 'end-game': {
                this.gameEnded(this.store, data);
                break;
            }
            default: {
                throw "App error, invalid event: " + event + " .";
            }
        }
    }

    startGame(state, data) {
        console.log('startGame called');
        console.log(state);
        console.log(data);
        // this.store.gameIntervalId = setInterval(this.gameTick, this.rules.gameTickInterval);
        // let scope = this;
        // state.game.actors.forEach(function(actor){
        //     let remaining = actor.deck.length;
        //     let randomIndex;
        //     let last;
        //
        //     while (remaining) {
        //         randomIndex = Math.floor(Math.random() * remaining--);
        //         last = actor.deck[remaining];
        //         actor.deck[remaining] = actor.deck[randomIndex];
        //         actor.deck[randomIndex] = last;
        //     }
        // });
        // state.game.status = "PLAYING";
        // state.game.timeStarted = Date.now();
        // state.game.timeRunning = 0;
    }

    gameTick(){
        console.log("game-tick");
        this.manaTick(this.store);
    }

    manaTick(state) {
        console.log("mana-tick");
        state.game.actors.forEach(function(actor){
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
    }

    gameEnded(state, data) {
        console.log("end-game");
        state.game.status = "OVER";
    }

    mistleDrawn(state, data){
        let actor = state.game.actors[data.actorId];
        if(actor.mana >= 1 && actor.deck.length > 0) {
            let drawn = actor.deck[0];
            actor.cards.push({cardType:"MISTLE", value: drawn});
            actor.deck.splice(0, 1);
            actor.deckSize = actor.deck.length;
            actor.mana--;
        }
    }

    shieldDrawn(state, data){
        let actor = state.game.actors[data.actorId];
        if(actor.mana >= 1 && actor.deck.length > 0) {
            let drawn = actor.deck[0];
            actor.cards.push({cardType:"SHIELD", value: drawn});
            actor.deck.splice(0, 1);
            actor.deckSize = actor.deck.length;
            actor.mana--;
        }
    }

    cardSelected(state, data){
        let actor = state.game.actors[data.actorId];
        actor.selectedCardIndex = data.cardIndex;
    }

    actorTargeted(state, data) {
        let sourceActor = state.game.actors[data.sourceId];
        let targetActor = state.game.actors[data.targetId];
        let card = sourceActor.cards[data.cardIndex];
        if(sourceActor.mana >= card.value){
            sourceActor.mana -= card.value;
            sourceActor.cards.splice(sourceActor.selectedCardIndex, 1);
            sourceActor.selectedCardIndex = -1;
            if(card.cardType === "MISTLE") {
                state.game.mistles.push(data.mistle);
            } else if (card.cardType === "SHIELD"){
                targetActor.shields.push(data.shield);
            }
        }
    }

    mistleImpacted(state, mistle){
        let sourceActor = state.game.actors[mistle.sourceId];
        let targetActor = state.game.actors[mistle.targetId];
        if(state.game.status === "PLAYING") {
            targetActor.health = Math.max(0, targetActor.health - mistle.card.value);
            mistle.landed = true;
            if (targetActor.health <= 0) {
                targetActor.isActive = false;
                let activeOpponents = state.game.actors.filter(actor => (actor.isActive && actor.team === targetActor.team));
                if(activeOpponents.length === 0){
                    state.game.winner = sourceActor.team;
                    state.game.status = "OVER";
                }
            }
        }
    }

    shieldUp(state, shield){
        let sourceActor = state.game.actors[shield.sourceId];
        let targetActor = state.game.actors[shield.targetId];
        if(state.game.status === "PLAYING") {
            shield.isUp = true;
        }
    }

    randomRobotImg(){
        const randomIndex = Math.round(Math.random() * 4);
        return '../static/robot' + randomIndex + '.png';
    }
};