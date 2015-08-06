var should = require('chai').should();
var weaselpecker = require('../');

describe('weaselpecker module', function(){
  it('should create a mock with the correct interface', function(){
      var ModelMock = weaselpecker.mock({
        extraModelMethods: ['findByID']
      });
      ModelMock.should.be.an('object');
      ModelMock.find.should.be.a('function');
      ModelMock.create.should.be.a('function');
      ModelMock.destroy.should.be.a('function');
      ModelMock.update.should.be.a('function');
      ModelMock.findByID.should.be.a('function');
  });
});
