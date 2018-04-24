'use strict';

const Command = require("./Command");

module.exports = class CreateTable extends Command {

    constructor(tableName) {
        super('create-table');
        this.data = {name: tableName};
    }

    async doAction(context) {
        console.log("createTable1")
        await setTimeout(() => {
            console.log("createTable2")
            context.commit('createTable');
        }, 10);
    }
};
