const Game = require('./Game');

class Table {

    constructor(options) {

        this.id = 0;
        if (options !== null){
            this.game = options.game || new Game();
        }
    }
}
module.exports = Table;