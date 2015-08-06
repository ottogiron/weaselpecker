var should = require('chai').should();
var expect = require('chai').expect;

var MockAdapter = require('../lib/mock-adapter');
var fixture1;
var fixture2;
var errorFixture;
describe('Mock adapter', function(){

  before(function(){
    fixture1 = {
      name: 'Otto',
      lastName: 'Giron'
    };

    fixture2 = {
      name: 'Juan',
      lastName: 'Perez'
    };

  });

  it('should mock find method with results', function(done){
      var Model = new MockAdapter();
      Model.setResults('find',[fixture1]);

      Model.find({})
      .populate()
      .exec(function(err, results){
        results.should.be.an('object');
        results.name.should.be.equal(fixture1.name);
        done();
      });
  });

  it('should mock find method with errors', function(done){
    var Model = new MockAdapter();
    var err = 'serach returned an error';
    Model.setErrors('find', [err]);
    Model.find({})
    .populate()
    .exec(function(err, results){
      expect(err).exists;
      done();
    });
  });

  it('Should return results in the correct order', function(done){
    var Model = new MockAdapter();

    Model.setResults('find',  [fixture1, fixture2] );

    Model.find({})
    .exec(function(err, results){
      results.name.should.be.equal(fixture1.name);
      done();
    });

  });

  it('Should add a custom method ', function(done) {

    var Model = new MockAdapter({
      extraModelMethods: ['findByID', 'findByID']
    });

    Model.setResults('findByID',  [fixture1, fixture2] );

    Model.findByID({})
    .exec(function(err, results){
      results.name.should.be.equal(fixture1.name);
      done();
    });

  });

});
