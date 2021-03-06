'use strict';

module.exports = {
    method: 'get',
    path: '/api/random-name',
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
