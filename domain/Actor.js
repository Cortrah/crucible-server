let defaults = {
    id: 0,
    name:"?",
    team:"Bad Guys",
    controller:"AI",
    avatarImg:"../static/robot3.png",
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

export default class Actor {

    constructor(options) {
        if(typeof options !== 'undefined'){
            this.id = options.id || defaults.id; //get randomId or use index
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
}
