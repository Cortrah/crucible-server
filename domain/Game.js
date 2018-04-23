import Bus from './Bus';
import Actor from './Actor';

// ----------------------------------------------------
// game events
// ----------------------------------------------------
// host only
// 'start-game' table.game
//
// server events for actors, client events for players
// 'draw-mistle' gameId actorId
// 'draw-shield' gameId  actorId
// 'select-card' gameId  actorId cardIndex
// 'target-actor' gameId  sourceId targetId cardIndex
let gameEvents = [
    'start-game',
    'draw-mistle','draw-shield',
    'select-card','target-actor',
];

// ----------------------------------------------
// nes websocket always server initiated
// ----------------------------------------------
// 'mana-tick',
// 'game-tick',
// 'mistle-impact',
// 'shield-up',
// 'end-game'


export default class Game {

    constructor() {
        this.id = 0;
        this.bus = new Bus();
        this.name = 'Waypoint Crucible Game X';
        this.status = 'PREPARING';
        this.winner = '';
        this.rules = {
            maxMana:10,
            maxHealth:30,
            startingDeck:[0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8],
            startingHandSize:0,
            maxCards:5,
            manaGrowthInterval:1000,
            manaReplentishInterval:1000,
            drawInterval:1000,
            fireInterval:500,
            bleedoutInterval:1000,
            flightTime:4000,
            shieldsUpTime:1000,
            shieldDecayRate:1000
        };
        this.actorCount = 10;
        this.actors = [];
        for (let i = 0; i < this.actorCount; i++){
            this.actors.push(new Actor(this.bus));
            this.actors[i].id = i;
            this.actors[i].avatarImg = this.randomRobot();
            if (i >= this.actorCount / 2){
                this.actors[i].team = 'Good Guys';
            }
        }
        this.mistles = [];
        this.shields = [];
        this.gameIntervalId = null;
        this.manaIntervalId = null;
        this.timeStarted = 0;
        this.timeRunning = 0;
        this.created();
    }

    created(){
        const options = { optionA: 'A', optionB: 'B' };
        this.bus.on('start-game',this.startGameOptions, options);
    }

    beforeDestroy(){
        clearInterval(this.gameIntervalId);
    }

    startGameOptions(options){
        console.log(options);
    }

    startGame(state, payload) {
        this.gameIntervalId = setInterval(this.gameTick, this.rules.gameTickInterval);
        let scope = this;
        state.game.actors.forEach(function(actor){
            let remaining = actor.deck.length;
            let randomIndex;
            let last;

            while (remaining) {
                randomIndex = Math.floor(Math.random() * remaining--);
                last = actor.deck[remaining];
                actor.deck[remaining] = actor.deck[randomIndex];
                actor.deck[randomIndex] = last;
            }
        });
        state.game.status = "PLAYING";
        state.game.timeStarted = Date.now();
        state.game.timeRunning = 0;
    }

    gameTick(){
        console.log("game-tick");
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
        })
    }

    endGame(state, payload) {
        state.game.status = "OVER";
    }

    mistleDrawn(state, payload){
        let actor = state.game.actors[payload.actorId];
        if(actor.mana >= 1 && actor.deck.length > 0) {
            let drawn = actor.deck[0];
            actor.cards.push({cardType:"MISTLE", value: drawn});
            actor.deck.splice(0, 1);
            actor.deckSize = actor.deck.length;
            actor.mana--;
        }
    }

    shieldDrawn(state, payload){
        let actor = state.game.actors[payload.actorId];
        if(actor.mana >= 1 && actor.deck.length > 0) {
            let drawn = actor.deck[0];
            actor.cards.push({cardType:"SHIELD", value: drawn});
            actor.deck.splice(0, 1);
            actor.deckSize = actor.deck.length;
            actor.mana--;
        }
    }

    cardSelected(state, payload){
        let actor = state.game.actors[payload.actorId];
        actor.selectedCardIndex = payload.cardIndex;
    }

    actorTargeted(state, payload) {
        let sourceActor = state.game.actors[payload.sourceId];
        let targetActor = state.game.actors[payload.targetId];
        let card = sourceActor.cards[payload.cardIndex];
        if(sourceActor.mana >= card.value){
            sourceActor.mana -= card.value;
            sourceActor.cards.splice(sourceActor.selectedCardIndex, 1);
            sourceActor.selectedCardIndex = -1;
            if(card.cardType === "MISTLE") {
                state.game.mistles.push(payload.mistle);
            } else if (card.cardType === "SHIELD"){
                targetActor.shields.push(payload.shield);
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

    randomRobot(){
        const randomIndex = Math.round(Math.random() * 4);
        return '../static/robot' + randomIndex + '.png';
    }
}
