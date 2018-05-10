'use strict';

const UUID = require('uuid');
const Bus = require('../main/Bus');
const Actor = require('./Actor');

const StartGame = require('./commands/StartGame');
const DrawMistle = require('./commands/DrawMistle');
const DrawShield = require('./commands/DrawShield');
const SelectCard = require('./commands/SelectCard');
const TargetActor = require('./commands/TargetActor');
const GameTick = require('./commands/GameTick');
const ManaTick = require('./commands/ManaTick');
const MistleImpact = require('./commands/MistleImpact');
const ShieldUp = require('./commands/ShieldUp');
const EndGame = require('./commands/EndGame');

module.exports = class Game {

    constructor(options) {
        this.id = UUID.v4();
        this.bus = new Bus();

        this.store = {
            name:'Waypoint Crucible Game X',
            status:'PREPARING',
            winner:'',
            rules: {
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
            },
            actorCount:10,
            actors:[],
            mistles:[],
            shields:[],
            gameIntervalId: null,
            manaIntervalId: null,
            timeStarted: 0,
            timeRunning: 0,
        };

        this.commands = [
            new StartGame(),
            new DrawMistle(), new DrawShield(),
            new SelectCard(), new TargetActor(),
            new GameTick(), new ManaTick(),
            new MistleImpact(), new ShieldUp(),
            new EndGame()
        ];

        // init actors
        for (let index = 0; index < this.store.actorCount; index++) {
            const randomIndex = Math.round(Math.random() * 4);
            let avatarImg = '../static/robot' + randomIndex + '.png';
            let team = "Bad Guys";
            if (index >= this.store.actorCount / 2) {
                team = 'Good Guys';
            }
            let options = {
                team: team,
                avatarImg: avatarImg,
            };
            // ToDo: figure out why require constructor doesn't get arguments
            let newActor = new Actor(index, this.bus, options);
            this.store.actors.push(newActor);
        }
        this.created();
    }

    created(){
        this.commands.forEach(command => {
            this.bus.registerEvent(command.name);
            this.bus.addEventListener(command.name, function(command) {
                command.doAction(this.store, command);
            });
        });
        commands[0].dispatch(this.bus, this.store);
    }

    beforeDestroy(){
        clearInterval(this.store.gameIntervalId);
    }
};