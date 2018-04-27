'use strict';

const Uuid = require('uuid');
const Bus = require('../main/Bus');
const Actor = require('./Actor');

const StartGame = require('./commands/StartGame');
const GameTick = require('./commands/GameTick');
const DrawMistle = require('./commands/DrawMistle');
const TargetActor = require('./commands/TargetActor');

module.exports = class Game {

    constructor(options) {
        this.id = Uuid.v4();
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
            new StartGame(this.bus, this.store),
            new DrawMistle(this.bus, this.store), new DrawShield(),
            new SelectCard(), new TargetActor(this.bus, this.store),
            new GameTick(this.bus, this.store), new ManaTick(),
            new MistleImpact(), new ShieldUp(),
            new EndGame()
        ];

        for (let i = 0; i < this.store.actorCount; i++) {
            let avatarImg =  this.randomRobotImg();
            let team = "Bad Guys";
            if (i >= this.store.actorCount / 2) {
                team = 'Good Guys';
            }
            // ToDo: figure out why require constructor doesn't get arguments
            let newActor = new Actor();
            newActor.index = i;
            newActor.bus = this.bus;
            newActor.team = team;
            newActor.avatarImg = avatarImg;
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
        // ToDo: obviously turn the commands into a map with named keys (where 0 is 'start-game')
        this.commands[0].dispatch(this.bus, this.store);
    }

    beforeDestroy(){
        // ToDo: move this to EndGame Command
        clearInterval(this.store.gameIntervalId);
    }

    static randomRobotImg(){
        const randomIndex = Math.round(Math.random() * 4);
        return '../static/robot' + randomIndex + '.png';
    }
};