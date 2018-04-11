'use strict';

// 'register-user' user:{email,password,session,profile} => user:{email, password, _session_, profile}
module.exports = {
    method: 'POST',
    path: '/api/register-user',
    options: {
        //handler: async (request, h) => {}

        handler: async (request, h) => {
            let newPlayer = new Player(request.payload.name, request.payload.ip, request.payload.port);
            players.push(newPlayer);

            h.response({
                id: newPlayer.id,
                name: newPlayer.name,
                ip: newPlayer.ip,
                port: newPlayer.port,
                wins: newPlayer.wins,
                losses: newPlayer.losses
            });
        }
    }
};
