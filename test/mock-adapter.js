var should = require('chai').should();

var MockAdapter = require('../lib/mock-adapter');

describe('Mock adapter', function(){

  it('should mock find method', function(done){
      var Model = new MockAdapter();
      var fixture = {
        name: 'Otto',
        lastName: 'Giron'
      }

      Model.setResults('find',[fixture]);

      Model.find({})
      .populate()
      .exec(function(err, results){
        results.should.be.an('object');
        results.name.should.be.equal(fixture.name);
        done();
      });

  });

});
