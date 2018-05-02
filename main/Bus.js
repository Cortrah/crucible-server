'use strict';

const Event = require('./Event');

module.exports = class Bus {

    constructor(){
        this.events = {};
    }

    registerEvent(eventName){
        let event = new Event(eventName);
        this.events[eventName] = event;
    };

    dispatchEvent(eventName, eventArgs){
        this.events[eventName].callbacks.forEach(function(callback){
            callback(eventArgs);
        });
    };

    addEventListener(eventName, callback){
        this.events[eventName].registerCallback(callback);
    };
};