var synon = require('sinon');

var modelMethods = ['hasJoin', 'join', 'create', 'find', 'findOne', 'update', 'destroy'];
var queryMethods =  ['where', 'limit', 'skip', 'sort', 'populate', 'count'];

var MockAdapterWrapper = module.exports = function(mockAdapter){
  this.callResults = {};
  this.callErrors = {};
  this.lastCalledFunctionKey;
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
  var results = this.callResults[lastCalledFunctionKey];
  var errors = this.callErrors[lastCalledFunctionKey];

  if(errors && errors.length > 0){
    var error = errors.length > 1 ? errors.shift() : errors[0];
    return cb(new Error(error));
  }
  else if(results && results.length > 0){
    var result = results.length > 1 ? results.shift() : results[0];
    return cb(null, result);
  }
  cb(null, []);
});

MockAdapterWrapper.prototype.setResults = function(functionName, results){
  this.callResults[functionName] = results;
};

MockAdapterWrapper.prototype.setErrors = function(functionName, errors){
  this.callErrors[functionName] = errors;
};

MockAdapterWrapper.prototype.clearResults = function(){
  this.callResults = {};
}

MockAdapterWrapper.prototype.clearErrors = function(){
  this.callErrors = {};
}
