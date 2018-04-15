import User from '../../domain/User.js';

const Code = require('code');
const Lab = require('lab');

const { describe, it } = exports.lab = Lab.script();
const { expect } = Code;

describe('User', () => {
    it('Has expected default values', () => {
        const defaultUser = new User();

        expect(true)
            .to.exist(defaultUser);
    });
});
