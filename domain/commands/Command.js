'use strict';

module.exports = class Command {

    constructor(name, data) {
        this.name = 'start-game';
        this.data = data;
        this.at = new Date();
    };
};
