var request = require('request');
var requestS = require('supertest');
var cheerio = require('cheerio');
var should = require('should');
var url = 'http://pi.cs.oswego.edu:2751';

describe('Make sure the server is running', function() {
    it('should redirect to port 2751', function(done) {
        this.timeout(10000);
        requestS('http://pi.cs.oswego.edu/~jbrower/PHPs/roots.php')
        .get('/')
        .end(function(err, res, body) {
            res.status.should.equal(302);
            res.header.location.should.equal(url);
            done();
        });
    });
});

describe('Test Login Features', function() {
    it('1) should redirect to /treeViewer with correct credentials', 
        function(done)
    {
        this.timeout(10000);
        requestS(url)
        .post('/userLogin')
        .send({email:'rcurran@oswego.edu',
               password:'notpassword'})
        .end(function(err, res, body) {
            res.text.should.equal('Found. Redirecting to /treeViewer');
            res.status.should.equal(302);
            res.header.location.should.equal('/treeViewer');
            done();
        });
    });
    
    describe('Display correct information to user after incorrect credentials\n'
            + '\tare entered', function()
    {
        it('1.a) email does not exist', function(done) {
            this.timeout(10000);
            requestS(url)
            .post('/userLogin')
            .send({email:'abcdefg12345@aol.com', 
                   password:'incorrectPassword55'})
            .end(function(err, res, body) {
                var $ = cheerio.load(res.text);
                var text = $('div[class=form]').text();
                text.includes('Incorrect credentials.').should.be.true();
                res.status.should.equal(200);
                done();
            });
        });

        it('1.b) password is incorrect', function(done) {
            this.timeout(10000);
            requestS(url)
            .post('/userLogin')
            .send({email:'rcurran@oswego.edu',
                   password:'ThisPasswordIsWrongForSure'})
            .end(function(err, res, body) {
                var $ = cheerio.load(res.text);
                var text = $('div[class=form]').text();
                text.includes('Incorrect credentials.').should.be.true();
                res.status.should.equal(200);
                done();
            });            
        });

        it('1.c) email >= 32 chars', function(done) {
            this.timeout(10000);
            requestS(url)
            .post('/userLogin')
            .send({email:'abcdefghijklmnopqrstuvqxyz'+
                         'abcefghijklmnopqrstuvwxyz'+
                         'abcdefghijklmnopqrstuvwxyz@aol.com',
                   password:'password123456'})
            .end(function(err, res, body) {
                var $ = cheerio.load(res.text);
                var text = $('div[class=form]').text();
                text.includes('Incorrect credentials.').should.be.true();
                res.status.should.equal(200);
                done();
            });
        }); 

        it('1.d) password >= 32 chars', function(done) {
            this.timeout(10000);
            requestS(url)
            .post('/userLogin')
            .send({email:'rcurran@oswego.edu',
                   password:'abcdefghijklmnopqrstuvwxyz'+
                            'abcdefghijklmnopqrstuvwxyz'+
                            'abcdefghijklmnopqrstuvwxyz'})
            .end(function(err, res, body) {
                var $ = cheerio.load(res.text);
                var text = $('div[class=form]').text();
                text.includes('Incorrect credentials.').should.be.true();
                res.status.should.equal(200);
                done();
            });
        });
    });
});
