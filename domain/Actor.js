'use strict';

const UUID = require('uuid');
const Bus = require('../main/Bus');

const DrawMistle = require('./commands/DrawMistle');
const DrawShield = require('./commands/DrawShield');
const SelectCard = require('./commands/SelectCard');
const TargetActor = require('./commands/TargetActor');

const defaults = {
    id: null,
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
        console.log(index);
        console.log(bus);
        console.log(options);

        this.id = UUID.v4();

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
    }

    created(){
        this.bus.addEventListener('game-tick', function(command) {
            this.gameTick(command)
        });
    }

    gameTick(command){
        // decide weather to draw a mistle, a shield, select a card or target an actor
        if(command.store.status === 'PLAYING'){
            let actor = command.store.actors[this.index];
            if (actor.isActive && actor.controller === "AI") {
                // ToDo: choose whether to use an existing card instead of drawing a new one
                // if the actor has < 5 cards and more than 1 mana draw a card
                if (actor.cards.length < 5 && actor.mana > 0) {
                    // ToDo: choose to draw a mistle or a shield
                    new DrawMistle(actor.index).dispatch(command.bus, command.store);
                } else {
                    // if the actor has cards and enough mana to fire a mistle
                    // ToDo: choose a mistle based on a strategy
                    // in this case we just choose the first and wait till we can fire it
                    let cardIndex = 0;
                    let card = actor.cards[cardIndex];
                    if (card.value < actor.mana) {
                        new SelectCard(actor.index, cardIndex).dispatch(command.bus, command.store);
                    }
                    // choose an enemy that's still active
                    if (actor.team === "Good Guys") {
                        // make the enemy chosen random
                        let activeFoes = command.store.actors.filter((actor) =>
                            actor.isActive && actor.team === "Bad Guys"
                        );
                        let foeCount = activeFoes.length;
                        let foeChosen = Math.floor(Math.random()*foeCount);
                        let foe = activeFoes[foeChosen];
                        // and fire at it
                        new TargetActor(
                            actor.index,
                            foe.id,
                            cardIndex
                        ).dispatch(command.bus, command.store);
                    } else {
                        // if the actor is axis its enemy is an allie
                        let activeFoes = command.store.actors.filter((actor) =>
                            actor.isActive && actor.team === "Good Guys"
                        );
                        let foeCount = activeFoes.length;
                        let foeChosen = Math.floor(Math.random()*foeCount);
                        let foe = activeFoes[foeChosen];
                        // and fire at it
                        new TargetActor(
                            actor.index,
                            foe.id,
                            cardIndex
                        ).dispatch(command.bus, command.store);
                    }
                }
            }
        }
    }
};