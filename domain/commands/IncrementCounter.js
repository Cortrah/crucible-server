'use strict';

const Command = require("./Command");

module.exports = class IncrementCounter extends Command {

    constructor() {
        super('increment-counter')
    }

    async doAction(context) {
        await setTimeout(() => {
            context.commit('increment');
        }, 10);
        return context.state.count;
    }
};
