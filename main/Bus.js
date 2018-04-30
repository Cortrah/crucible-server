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

// ref?
//module.exports = function (app, db) {
//    var module = {};
//
//    module.auth = function (req, res) {
//        // This will be available 'outside'.
//        // Authy stuff that can be used outside...
//    };
//
//    // Other stuff...
//    module.pickle = function(cucumber, herbs, vinegar) {
//        // This will be available 'outside'.
//        // Pickling stuff...
//    };
//
//    function jarThemPickles(pickle, jar) {
//        // This will be NOT available 'outside'.
//        // Pickling stuff...
//
//        return pickleJar;
//    };
//
//    return module;
//};
//https://blog.risingstack.com/node-js-at-scale-module-system-commonjs-require/