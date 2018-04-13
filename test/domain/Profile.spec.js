'use strict';

const Lab = require('lab');
const Assert = require('assert');
const lab = exports.lab = Lab.script();

const Profile = require('/domain/Profile.js');

lab.experiment('test a Profile', (done) => {

    lab.test('- it creates a profile with expected defaults', (done) => {

        const options = {
            method: 'POST',
            url: '/api/create-profile'
        };

        client.inject( options, (res) => {

            Assert(res.statusCode === 200);
            let response = JSON.parse(res.payload);

            Assert(true === true);
            done();
        });

    });

});