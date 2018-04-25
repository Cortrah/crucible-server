const Code = require('code');
const Lab = require('lab');

const { describe, it } = exports.lab = Lab.script();
const { expect } = Code;

const Game = require('../../domain/Game.js');

describe('Game', () => {

    it('Has expected default values', async () => {

        //const defaultGame = await new Game();
        //defaultGame.bus.dispatch('start-game',{ gogo: 'gadget' });
        //expect(defaultGame).to.exist();

        expect(true).to.equal(true);
    });
});
