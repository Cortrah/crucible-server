const Code = require('code');
const Lab = require('lab');

const { describe, it } = exports.lab = Lab.script();
const { expect } = Code;

const Game = require('../../domain/Game.js');

describe('Game', () => {

    it('Has expected default values', () => {

        const defaultGame = new Game();
        expect(defaultGame).to.exist();
    });
});
