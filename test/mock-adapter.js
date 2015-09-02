var should = require('chai').should();
var expect = require('chai').expect;

var MockAdapter = require('../lib/mock-adapter');
var fixture1;
var fixture2;
var fixture3;
var fixture4;
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

    fixture3 = new Error('Weasel');
    
    fixture4 = new Error('Pecker');

  });

  it('should mock find method with results', function(done){
      var Model = new MockAdapter();
      Model.setResults('find', [fixture1]);

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

  it('should return results in the correct order', function(done){
    var Model = new MockAdapter();

    Model.setResults('find',  [fixture1, fixture2] );

    Model.find({})
    .exec(function(err, results){
      results.name.should.be.equal(fixture1.name);
      done();
    });

  });

  it('should return results and errors mixed', function(done){
    var Model = new MockAdapter();

    Model.setResults('find',  [fixture1, fixture3, fixture2, fixture4] );

    Model.find({})
    .exec(function(err, results) {
    
      expect(err).to.not.exist;
      results.name.should.be.equal(fixture1.name);
      
      Model.find({})
      .exec(function(err, results) {
      
        expect(err).to.exist;
        err.message.should.be.equal(fixture3.message);
        expect(results).to.not.exist;

        Model.find({})
        .exec(function(err, results) {
    
          expect(err).to.not.exist;
          results.name.should.be.equal(fixture2.name);
      
          Model.find({})
          .exec(function(err, results) {
      
            expect(err).to.exist;
            err.message.should.be.equal(fixture4.message);
            expect(results).to.not.exist;

            done();
          });
      
        });
        
      });
      
    });

  });

  it('should add a custom method ', function(done) {

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
