'use strict';

module.exports = class Command {

    constructor(name, data) {
        this.name = name;
        this.data = data;
        this.at = new Date();
    };
};
