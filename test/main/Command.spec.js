const Code = require('code');
const Lab = require('lab');

const { describe, it } = exports.lab = Lab.script();
const { expect } = Code;

const Command = require('../../main/Command');
const StartGame = require('../../stage/commands/StartGame');

describe('Command', () => {

    it('Accepts a constructor Argument', () => {

        const com = new Command('start-game');

        expect(com).to.exist();
        expect(com.name).to.equal('start-game');
    });

    it('Can be subclassed', () => {

        const start = new StartGame();

        expect(start).to.exist();
        expect(start.name).to.equal('start-game');
    });

    it('Executes an action', () => {

        const start = new StartGame();
        expect(start.doAction()).to.equal('ok');
    });
});
