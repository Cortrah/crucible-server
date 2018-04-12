'use strict';

import User from '../../domain/User';

let players = [];

// 'register-user' user:{email,password,session,profile} => user:{email, password, _session_, profile}
module.exports = {

    method: 'POST',
    path: '/api/register-user',
    config: {
        description: 'Takes a user object with email, password and profile parameters, gives it a valid guid and session variables',
        notes: ['generate a name for the profile if not given'],
        validate: {
            payload: {
                user: typeof User
            }
        },
        response: {
            schema: {
                user: typeof User
            }
        }
    },
    options: {
        handler: async (request, kit) => {
            let newUser = new User(request.user);
            players.push(newUser);

            kit.response(newUser);
        }
    }
};
