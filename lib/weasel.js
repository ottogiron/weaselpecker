var MockAdapter = require('./mock-adapter');


function mock(options){
  
  return new MockAdapter(options);
}


module.exports.mock = mock;
