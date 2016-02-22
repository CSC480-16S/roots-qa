var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("localhost:1337");
    login  = supertest.agent("localhost:1337/userlogin");

// begin unit tests

describe("SAMPLE unit test", function() {
    // Test 1 should return the home page

    it("should redirect to login page", function(done) {
        // call home page api
        server
        .get("/")
        .expect("Content-type", /json/)
        .expect(302) // This is HTTP response
        .end(function(err, res) {
            // HTTP status should be 302
            res.status.should.equal(302); 
            // Error key should be false
            // res.body.error.should.equal(false); // not working ?
            done();
        });
    });

    it("the login page is the home page", function(done) {
        login
        .get("/")
        .expect("Content-type", /json/)
        .expect(200) 
        .end(function(err, res) {
            res.status.should.equal(200);
            done();
        });
    });
});
