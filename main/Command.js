'use strict';

module.exports = class Command {

    constructor(name, data) {
        this.name = name;
        this.data = data;
        this.at = new Date();
    };

    dispatch(bus, store) {
        this.bus = bus;
        this.store = store;
        this.bus.dispatchEvent(this.name, store);
    }
};
