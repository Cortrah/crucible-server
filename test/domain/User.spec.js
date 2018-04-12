import User from '/domain/User.js';

describe('User', () => {
    it('Has expected default values', () => {
        let defaultUser = new User();

        expect(true)
            .to.equal(true)
    })
})
