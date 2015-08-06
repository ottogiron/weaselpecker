var synon = require('sinon');
var _ = require('lodash');

var modelMethods = ['hasJoin', 'join', 'create', 'find', 'findOne', 'update', 'destroy', 'count'];
var queryMethods =  ['where', 'limit', 'skip', 'sort', 'populate'];

var MockAdapterWrapper = module.exports = function(options){
  this.callResults = {};
  this.callErrors = {};
  this.lastCalledFunctionKey;
  this.options = options || {};
  this.modelMethods = mergeArrays(modelMethods, this.options.extraModelMethods || []);

  mock.call(this);
};

function mergeArrays(arr1, arr2) {

  var result = arr1.slice(0);
  arr2.forEach(function(value, index) {
    if(!_.includes(result, value)) {
      result.push(value);
    }
  });  
  return result;
}

function mock(mockAdapter){

  this.modelMethods.forEach(function(key){
    var functionToMock = key;
    MockAdapterWrapper.prototype[key] = synon.spy(function(){
      this.lastCalledFunctionKey = key;
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
  var results = this.callResults[this.lastCalledFunctionKey];
  var errors = this.callErrors[this.lastCalledFunctionKey];

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
