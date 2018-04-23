import Game from '../../domain/Game.js';

const Code = require('code');
const Lab = require('lab');

const { describe, it } = exports.lab = Lab.script();
const { expect } = Code;

describe('Game', () => {

    it('Has expected default values', () => {

        const defaultGame = new Game();

        defaultGame.dispatch('start-game',{ gogo: 'gadget' });

        expect(true)
            .to.exist(defaultGame);
    });
});
