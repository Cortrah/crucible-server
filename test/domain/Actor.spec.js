const Code = require('code');
const Lab = require('lab');

const { describe, it } = exports.lab = Lab.script();
const { expect } = Code;

const Actor = require('../../domain/Actor.js');

describe('Actor', () => {

    it('Has expected default values', () => {

        let defaultActor = new Actor(1,"bus", {});
        expect(defaultActor).to.exist();
    });
});
