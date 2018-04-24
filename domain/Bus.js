'use strict';

// some interesting options
// https://stackoverflow.com/questions/15308371/custom-events-model-without-using-dom-events-in-javascript
module.exports = class Bus {

    constructor() {
        this.events = {};
    }

    on(event, callback) {
        const handlers = this.events[event] || [];
        handlers.push(callback);
        this.events[event] = handlers;
    }

    dispatch(event, data) {
        const handlers = this.events[event];

        if (!handlers || handlers.length == 0){
            return;
        } else {
            [].forEach.call(handlers, (handler) => {
                handler(data);
            });
        }
    }
};