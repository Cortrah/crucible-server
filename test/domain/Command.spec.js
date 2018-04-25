const Code = require('code');
const Lab = require('lab');

const { describe, it } = exports.lab = Lab.script();
const { expect } = Code;

const Command = require('../../domain/commands/Command');

describe('Command', () => {

    it('Accepts a constructor Argument', () => {

        const com = new Command('start-game');

        expect(com).to.exist();
        expect(com.name).to.equal('start-game');
    });
});
