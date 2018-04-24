'use strict';

// some other interesting options
// https://stackoverflow.com/questions/15308371/custom-events-model-without-using-dom-events-in-javascript
// https://github.com/sindresorhus/p-queue

module.exports = class CommandQueue {

    constructor (view, playHead = 0, commands = []) {
        this.view = view;
        this.playhead = playHead;
        this.commands = commands;
        this.isRunning = false;
    }

    add(command) {
        command.setCommandQueue(this);
        this.commands.push(command);
    }

    async play() {
        this.isRunning = true;
        while(this.isRunning && (this.playhead < this.commands.length)){
            let command = this.commands[this.playhead];
            if((command.name === 'sign-in')||command.name === 'sign-out'||command.name === 'create-table'){
                await this.view.$store.dispatch('stageground/run', command);
            } else {
                await this.view.$store.dispatch('run', command);
            }
            if(this.playhead < this.commands.length + 1) {
                this.playhead++;
            }
        }
    }

    pause() {
        this.isRunning = false;
    }
};
