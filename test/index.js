const Code = require('code');
const Lab = require('lab');
const Server = require('../server');
const Package = require('../package.json');

const { describe, it } = exports.lab = Lab.script();
const { expect } = Code;

describe('Deployment', () => {

    it('registers the main plugin.', async () => {

        const server = await Server.deployment();

        expect(server.registrations[Package.name]).to.exist();
    });
});
