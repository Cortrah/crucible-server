const defaults = {
    name: 'Gogo Gadget',
    botChecked: false,
    ipAddress: 'https://123.122.1.2',
    port: '8000',
    token:'change me',
    selDog: '../static/dog1.png',
    selBot: '../static/robot1.png'
};

class Profile {

    constructor( options ) {

        if (options !== null) {
            this.name = options.name || defaults.name;
            this.botChecked = options.botChecked || defaults.botChecked;
            this.ipAddress = options.ipAddress || defaults.ipAddress;
            this.port = options.port || defaults.port;
            this.token = options.token || defaults.token;
            this.selDog = options.selDog || defaults.selDog;
            this.selBot = options.selBot || defaults.selBot;
        } else {
            Object.assign(this, defaults);
        }
    }
}

module.exports = Profile;