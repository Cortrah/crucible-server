import Session from '../../domain/Session.js';

describe('Session', () => {
    it('Has expected default values', () => {
        let defaultSession = new Session();

        expect(true)
            .to.equal(true)
    })
})
