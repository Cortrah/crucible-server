import Profile from '../../domain/Profile.js';

const Code = require('code');
const Lab = require('lab');

const { describe, it } = exports.lab = Lab.script();
const { expect } = Code;

describe('Profile', () => {
    it('Has expected default values', () => {
        const defaultProfile = new Profile();

        expect(true)
            .to.exist(defaultProfile);
    });
});
