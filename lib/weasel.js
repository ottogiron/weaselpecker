var MockAdapter = require('./mock-adapter');


function mock(){
  return new MockAdapter();
}


module.exports.mock = mock;
