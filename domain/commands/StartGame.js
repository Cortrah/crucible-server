'use strict';

const Command = require("./Command");

module.exports = class StartGame extends Command {

    constructor(args) {
        super('start-game');
        console.log(args);
    }

    doAction(context, data) {
        console.log("start-game command called");
        console.log(context);
        console.log(data);
    }
};
