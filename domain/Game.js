'use strict';

const Uuid = require('uuid');
const Bus = require('../main/Bus');
const Actor = require('./Actor');

const StartGame = require('./commands/StartGame');

module.exports = class Game {

    constructor(options) {
        this.id = Uuid.v4();
        this.bus = new Bus();

        this.state = {
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

        this.commands = [
            new StartGame(),
            new DrawMistle(), new DrawShield(),
            new SelectCart(), new TargetActor(),
            new GameTick(), new ManaTick(),
            new MistleImpact(), new ShieldUp(),
            new EndGame()
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
            this.state.actors.push(newActor);
        }
        this.created();
    }

    created(){
        this.commands.forEach(command => {
            this.bus.registerEvent(command.name);
            this.bus.addEventListener(command.name, function(command) {
                command.doAction(this.state, command.data);
            });
        });
        this.bus.dispatchEvent('start-game');
    }

    beforeDestroy(){
        clearInterval(this.state.gameIntervalId);
    }

    randomRobotImg(){
        const randomIndex = Math.round(Math.random() * 4);
        return '../static/robot' + randomIndex + '.png';
    }
};