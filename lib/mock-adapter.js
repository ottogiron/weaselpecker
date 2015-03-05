var synon = require('sinon');

var modelMethods = ['hasJoin', 'join', 'create', 'find', 'findOne', 'update', 'destroy'];
var queryMethods =  ['where', 'limit', 'skip', 'sort', 'populate'];

var callResults = {};
var lastCalledFunctionKey;

var MockAdapterWrapper = module.exports = function(mockAdapter){
  this.mockAdapter = mockAdapter;
  mock.call(this);
};

function mock(mockAdapter){
  modelMethods.forEach(function(key){
    var functionToMock = key;
    MockAdapterWrapper.prototype[key] = synon.spy(function(){
      lastCalledFunctionKey = key;
      return this;
    });
  });

  queryMethods.forEach(function(key){
    MockAdapterWrapper.prototype[key] = synon.spy(function(){
      return this;
    });
  });

}

MockAdapterWrapper.prototype.exec = MockAdapterWrapper.prototype.then = synon.spy(function(cb){
  var results = callResults[lastCalledFunctionKey];
  if(results && results.length > 0){
    var result = results.length > 1 ? results.pop() : results[0];
    return cb(null, result);
  }
  cb(null, []);
});

MockAdapterWrapper.prototype.setResults = function(functionName, results){
  callResults[functionName] = results;
};

MockAdapterWrapper.prototype.clearResults = function(){
  callResults = {};
}
