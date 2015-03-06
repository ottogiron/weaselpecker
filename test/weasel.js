var should = require('chai').should();
var weasel = require('../');

describe('Weasel module', function(){
  it('should create a mock with the correct interface', function(){
      var ModelMock = weasel.mock();
      ModelMock.should.be.an('object');
      ModelMock.find.should.be.a('function');
      ModelMock.create.should.be.a('function');
      ModelMock.destroy.should.be.a('function');
      ModelMock.update.should.be.a('function');
  });
});
