import assert from 'assert';
import {TOKEN_TEST, graphqlRequest} from "./config";
import {Operation} from "../src/mutations/room";
import TestData from "../src/database"

describe('GraphQLMutation', function () {
    describe('Room', () => {
        it('#addRoom', async () => {
            await graphqlRequest('mutation {\n' +
                '  addRoom(title: "room1") {\n' +
                '    id\n' +
                '    operation\n' +
                '    users {id, username, email, avatar}\n' +
                '  }\n' +
                '}', {auth: `Bearer ${TOKEN_TEST}`})
                .then(res => {
                    const json = JSON.parse(res);

                    assert.ok(json.data.addRoom.users, `Users not found:\n${res}`);
                    assert.ok(json.data.addRoom.id, res);
                    assert.equal(json.data.addRoom.operation, Operation.Create, res);
                }).catch(err => {
                    assert.ok(false, err);
                })
        });
        it('#updateRoom', async () => {
            console.log(TestData);
            await graphqlRequest(`mutation {\n  updateRoom(room: "${TestData.room.ROOM_TO_UPDATE}", title: "Hello world") {\n    id\n    operation\n    users {id, username, email, avatar}\n  }\n}`, {auth: `Bearer ${TOKEN_TEST}`})
                .then(res => {
                    console.log(res);
                    const json = JSON.parse(res);

                    assert.equal(json.data.updateRoom.operation, Operation.Update, res);
                    assert.ok(json.data.updateRoom.id, res);
                    assert.ok(json.data.updateRoom.users, `Users not found:\n${res}`);
                }).catch(err => {
                    assert.ok(false, err);
                })
        });
        it('#updateRoom: Unknown room', async () => {
            await graphqlRequest('mutation {\n' +
                '  updateRoom(title: "Room Updated", room: "unknown") {\n' +
                '    id\n' +
                '    operation\n' +
                '  }\n' +
                '}', {auth: `Bearer ${TOKEN_TEST}`})
                .then(res => {
                    res = JSON.parse(res);
                    console.log(res);
                    assert.equal(res.errors[0].errorCode, 422, res);
                }).catch(err => {
                    assert.ok(false, err);
                })
        });
        it('#removeRoom: Unknown room', async () => {
            await graphqlRequest('mutation {\n' +
                '  removeRoom(room: "unknown") {\n' +
                '    id\n' +
                '    operation\n' +
                '  }\n' +
                '}', {auth: `Bearer ${TOKEN_TEST}`})
                .then(res => {
                    res = JSON.parse(res);
                    assert.equal(res.errors[0].errorCode, 422, res);
                }).catch(err => {
                    assert.ok(false, err);
                })
        });
    });
});
