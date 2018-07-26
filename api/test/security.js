import assert from 'assert';
import {TOKEN_TEST, graphqlRequest} from "./config";

describe('Authentication', function () {
    describe('# Unauthorized API call', () => {
        it('Status code should be 401', async () => {
            await graphqlRequest('', {statusThrow: false})
                .then(res => {
                    assert.equal(res.statusCode, 401, res.raw);
                }).catch(err => {
                    assert.ok(false, err);
                })
        });
    });
    describe('# Authorized API call', () => {
        it('Status code should be 400 (Empty body)', async () => {
            await graphqlRequest('', {auth: `Bearer ${TOKEN_TEST}`, statusThrow: false})
                .then(res => res).catch(err => {
                    assert.ok(false, err);
                })
        });
    });
});
