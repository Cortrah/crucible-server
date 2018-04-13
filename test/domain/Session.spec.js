'use strict';

const Lab = require('lab');
const Assert = require('assert');
const lab = exports.lab = Lab.script();

const Session = require('/domain/Session.js');

lab.experiment('test a Session', (done) => {

    lab.test('- it creates a game with expected defaults', (done) => {

        const options = {
            method: 'POST',
            url: '/api/sign-in-user'
        };

        client.inject( options, (res) => {

            Assert(res.statusCode === 200);
            let response = JSON.parse(res.payload);

            Assert(true === true);
            done();
        });

    });
});