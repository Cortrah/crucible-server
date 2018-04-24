const defaults = {
    signedIn: false,
    authHeader: '',
    sessionId: '',
    sessionKey: ''
};

class Session {

    constructor( options ) {

        if (options !== null) {
            this.signedIn = options.signedIn || defaults.signedIn;
            this.authHeader = options.authHeader || defaults.authHeader;
            this.sessionId = options.sessionId || defaults.sessionId;
            this.sessionKey = options.sessionKey || defaults.sessionKey;
        } else {
            Object.assign(this, defaults);
        }
    }
}

module.exports = Session;