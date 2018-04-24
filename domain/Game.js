const Bus = require('./Bus');
const Actor = require('./Actor');

class Game {

    constructor(options) {
        this.id = 0;
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
            console.log('--------');
            console.log(i);
            console.log(this.bus);
            console.log(team);
            console.log(avatarImg);
            let newActor = new Actor(i, this.bus, {
                team: team,
                avatarImg: avatarImg
            });
            console.log(newActor);
            console.log(this.store.actors);
            this.store.actors.push(newActor);
        }
        this.created();
    }

    created(){
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
        // let gameEvents = [
        //     'start-game',
        //     'draw-mistle','draw-shield',
        //     'select-card','target-actor',
        // ];

        // ----------------------------------------------
        // nes websocket always server initiated
        // ----------------------------------------------
        // 'mana-tick',
        // 'game-tick',
        // 'mistle-impact',
        // 'shield-up',
        // 'end-game'

        // let _self = this;
        // gameEvents.forEach(eventName => {
        //     this.bus.on(eventName, function(data) {
        //         _self.eventSwitch(eventName, data);
        //     });
        // });

        const data = { type: 'startGame', otherStuff: 'gogo gadget' };
        this.bus.on('start-game',this.store, data);

        // this.bus.on('draw-mistle',this.store, data);
        // this.bus.on('draw-shield',this.store, data);
        // this.bus.on('select-card',this.store, data);
        // this.bus.on('target-actor',this.store, data);
        //
        // this.bus.on('mana-tick',this.store, data);
        // this.bus.on('game-tick',this.store, data);
        // this.bus.on('mistle-impact',this.store, data);
        // this.bus.on('shield-up',this.store, data);
        // this.bus.on('end-game',this.store, data);
    }

    beforeDestroy(){
        clearInterval(this.store.gameIntervalId);
    }

    startGame(state, data) {
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
        })
    }

    endGame(state, data) {
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
}

module.exports = Game;
