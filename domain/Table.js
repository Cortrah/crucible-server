import Game from './Game';

export default class Table {

    constructor(options) {
        this.id = 0;
        if (options !== null){
            this.game = options.game || new Game();
        }
    }
}
