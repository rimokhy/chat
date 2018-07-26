'use strict';

var _graphqlTester = require('graphql-tester');

var _config = require('../src/config');

const test = (0, _graphqlTester.tester)({
    url: `${_config.BASE_URI}/graphql`
});

// This test a successful request for the name of person 1
test('').then(response => {
    assert(response.success == true);
    assert(response.status == 200);
    assert(response.data.person.name == 'Luke Skywalker');
});
//# sourceMappingURL=index.js.map