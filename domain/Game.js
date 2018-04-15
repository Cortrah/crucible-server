import Actor from './Actor';

export default class Game {

    constructor() {
        this.id = 0;
        this.title = 'Waypoint Crucible Game X';
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
            this.actors.push(new Actor());
            this.actors[i].id = i;
            this.actors[i].avatarImg = this.randomRobot();
            if (i >= this.actorCount / 2 ){
                this.actors[i].team = 'Good Guys';
            }
        }
        this.mistles = [];
        this.shields = [];
        this.timeStarted = 0;
        this.timeRunning = 0;
    }

    randomRobot(){
        const randomIndex = Math.round(Math.random() * 4);
        return '../static/robot' + randomIndex + '.png'
    }
}
