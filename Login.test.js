var request = require('supertest');
var req = require('request');

var sinon = require('sinon');
var assert = require('assert');
//var should = require('should');

var LoginController = require('../../../api/controllers/LoginController.js');


//var server = request.agent("localhost:1337");
//var login  = request.agent("localhost:1337/userLogin");

describe('Login Test with Correct Credentials', function() {

    it('should redirect to /treeview', function (done) {
        //login
       request(sails.hooks.http.app)
        .post('/userLogin')
       .send({ email: 'jmaccree@oswego.edu', password: 'password'})
       
        .expect(302)
        .expect('location','/treeViewer', done);
    });


}).done;

describe('Login Test with Bad Credentials', function() {
         
         it('should remain at /userLogin', function (done) {
            
            request(sails.hooks.http.app)
            .post('/userLogin')
            .send({ email: 'jmaccree@oswego.edu', password: 'passpass'})
            
            .expect(200)
            .end(function(err, res){
                 if(res) throw res;
                 done();
                 })
            //.expect('location','/userLogin', done);
            
            });
         
         
         }).done;

describe('userLogin', function(){
         /*
         var res = LoginController.userLogin({ email: 'jmaccree@oswego.edu', password: 'passpass'}, var whatever )
         .then(function(res){
               done()
               })
          
         it('Checks the response of a bad login', function(done){
            request(sails.hooks.http.app, function(done){console.log(done);})
            .post('/userLogin')
            .send({ email: 'jmaccree@oswego.edu', password: 'passpass'}, done)
            
            })
         */
         
         });









