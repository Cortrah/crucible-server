'use strict';

// 'sign-in-user' email, password => user:{email, password, _session_, profile}
module.exports = {
    method: 'POST',
    path: '/api/sign-in-user',
    options: {
        handler: async (request, h) => {}
    }
};
