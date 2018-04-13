'use strict';

const Lab = require('lab');
const Assert = require('assert');
const lab = exports.lab = Lab.script();

const User = require('/domain/User.js');

lab.experiment('test a User', (done) => {

    lab.test('- it creates a user with expected defaults', (done) => {

        const options = {
            method: 'POST',
            url: '/api/register-user'
        };

        client.inject( options, (res) => {

            Assert(res.statusCode === 200);
            let response = JSON.parse(res.payload);

            Assert(true === true);
            done();
        });

    });

});