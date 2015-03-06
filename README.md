# Weasel
## Waterline Simple Mocking Library

### Quick Example
```javascript
var weasel = require('weasel');
// Create a model mock instance
var ModelMock = weasel.mock();
// Set results for find method
ModelMock.setResults('find', [
  [{name: 'pecker'}]
]);

ModelMock.find({})
         .where({})
         .populate('anything')
         .exec(function(err, results){
           console.log(results); // [{name: 'pecker'}]
         });
```
## Documentation

###Weasel
####mock()

Creates a new instance of a mock model

####setFindResults(str, arr)

Sets mock results for an specific model method call. Results are returned depending the order defined in the array. If there's only one result left it will always return that as result.

#####example
```javascript
  Model.setResults('find', ['result1', 'result2']);
  //first call
  Model.find({})
    .execute(function(err, result){
      console.log(result); // result1
      //second call
      Model.find({})
      .execute(function(err, result){
        console.log(result); //result2
        //third call
        Model.find({}, function(err, result){
          console.log(result); //result2
        });
      });
    });
```

####arguments
  * str: Name of the model method e.g 'find'
  * arr: Array of mock results

####clearResults()

Clears all mock results.

####setErrors(str, arr)

Sets mock errors for an specific model method call. Results are returned depending the order defined in the array. If there's only one error left it will always return that as error.

#####example
```javascript
  Model.setErrors('find', ['error1', 'error2']);
  //first call
  Model.find({})
    .execute(function(err, result){
      console.log(err); // error1
      //second call
      Model.find({})
      .execute(function(err, result){
        console.log(err); //error2
        //third call
        Model.find({}, function(err, result){
          console.log(err); //err2
        });
      });
    });
```

####arguments
  * str: Name of the model method e.g 'find'
  * arr: Array of mock errors

####clearErrors()

Clears all mocked errors.
