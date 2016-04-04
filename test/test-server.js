var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/app');
var should = chai.should();
var expect = chai.expect;

chai.use(chaiHttp);


describe('configs', function() {


  it('should return an id on /config POST', function(done) {
  chai.request('http://localhost:8080')
    .post('/config')
    .send({"name": "host5", "hostname": "nessus-ntp.lab.com", "port":9900,"username":"toto"})
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      expect(res.body).to.have.property('id');

      done();
    });
  });

  it('should return an id on /config POST', function(done) {
  chai.request('http://localhost:8080')
    .post('/config')
    .send({"name": "host1", "hostname": "nessus-xml.lab.com", "port":3384,"username":"admin"})
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      expect(res.body).to.have.property('id');

      done();
    });
  });

  it('should return an id on /config POST', function(done) {
  chai.request('http://localhost:8080')
    .post('/config')
    .send({"name": "host4", "hostname": "hosty-thing2.somewhere.com", "port":4757,"username":"testy"})
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      expect(res.body).to.have.property('id');

      done();
    });
  });

  it('should return an id on /config POST', function(done) {
  chai.request('http://localhost:8080')
    .post('/config')
    .send({"name": "host3", "hostname": "hosty-thing.somewhere.com", "port":4555,"username":"useitorloseit"})
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      expect(res.body).to.have.property('id');

      done();
    });
  });

  it('should return an id on /config POST', function(done) {
  chai.request('http://localhost:8080')
    .post('/config')
    .send({"name": "host2", "hostname": "thing-hosty.aplace.com", "port":3939,"username":"placestogo"})
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      expect(res.body).to.have.property('id');

      done();
    });
  });

  it('should sort configs on /config?sort=name', function(done) {
    chai.request('http://localhost:8080')
      .get('/config?sort=name')
      .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          expect(res.body).to.have.property('configs');
          res.body.configs[0].name.should.equal('host1');
          done();
      });
  });

  it('should sort configs on /config?sort=hostname', function(done) {
    chai.request('http://localhost:8080')
      .get('/config?sort=hostname')
      .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          expect(res.body).to.have.property('configs');
          res.body.configs[0].hostname.should.equal('hosty-thing.somewhere.com');
          done();
      });
  });

  it('should sort configs on /config?sort=port', function(done) {
    chai.request('http://localhost:8080')
      .get('/config?sort=port')
      .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          expect(res.body).to.have.property('configs');
          res.body.configs[0].port.should.equal(3384);
          done();
      });
  });
  
  it('should sort configs on /config?sort=username', function(done) {
    chai.request('http://localhost:8080')
      .get('/config?sort=username')
      .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          expect(res.body).to.have.property('configs');
          res.body.configs[0].username.should.equal("admin");
          done();
      });
  });
  

  
});