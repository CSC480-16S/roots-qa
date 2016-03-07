var request = require('supertest');
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
         
         it('should redirect to /userLogin', function (done) {
            //login
            
            //assert(sent.calledWith('Wrong password'));
            
            request(sails.hooks.http.app)
            .post('/userLogin')
            .send({ email: 'jmaccree@oswego.edu', password: 'passpass'}, function(){
                  if(error) throw error;
            })
            
            .expect(200, done)
            //.expect('location','/userLogin', done);
            
            });
         
         
         }).done;
