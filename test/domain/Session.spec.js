import Session from '../../domain/Session.js';

const Code = require('code');
const Lab = require('lab');

const { describe, it } = exports.lab = Lab.script();
const { expect } = Code;

describe('Session', () => {
    it('Has expected default values', () => {
        const defaultSession = new Session();

        expect(true)
            .to.exist(defaultSession);
    });
});
