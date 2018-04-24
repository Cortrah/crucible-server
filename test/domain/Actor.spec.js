const Code = require('code');
const Lab = require('lab');

const { describe, it } = exports.lab = Lab.script();
const { expect } = Code;

const Actor = require('../../domain/Actor.js');

describe('Actor', () => {

    it('Has expected default values', () => {

        const defaultActor = new Actor();

        expect(defaultActor).to.exist();
    });
});
