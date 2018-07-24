'use strict';

module.exports = {
    method: 'post',
    path: '/api/gogo-gobler',
    options: {
        cors: {
            origin: ['http://localhost:8080']
        },
        handler: async (request, h) => {

            const names = [
                'Hondo', 'Pufinstuf', 'Hong Kong Phooey',
                'Inspector Gadget', 'Alexi', 'Franko', 'Soupy',
                'Digdug', 'Grouper', 'Flayrah', 'Joe'
            ];

            const randomIndex = await Math.round(Math.random(10) * 10);

            return names[randomIndex] + ' ' +
                Math.round(Math.random(10) * 10) +
                Math.round(Math.random(10) * 10);
        }
    }
};
