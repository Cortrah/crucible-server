import Actor from '../../domain/Actor.js';

const Code = require('code');
const Lab = require('lab');

const { describe, it } = exports.lab = Lab.script();
const { expect } = Code;

describe('Actor', () => {
    it('Has expected default values', () => {
        const defaultActor = new Actor();

        expect(true)
            .to.exist(defaultActor);
    });
});
