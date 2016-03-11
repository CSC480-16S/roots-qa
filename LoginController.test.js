/** 
 * Unit tests for LoginController.js
 */

var supertest = require("supertest");
    request = require("supertest");
    should = require("should");
    expect = require("expect");

describe("Test Login", function() {
    it("should redirect to /treeview with correct credentials", function(done) {
        request("http://myroots.xyz")
        .post("/userLogin") // we are giving you information, give me a response
        .send({ email: "rcurran@oswego.edu", password: "password"})
        .expect(302)
        .expect("location", "/treeViewer")
        .end(done);
    });

    it("should stay on /userLogin with incorrect credentials",
        function(done) 
    {
        request("http://myroots.xyz")
        .post("/userLogin")
        .send({email: "abcdefg12345@gmail.com", password: "baseball"})
        .expect(200)
        .end(done);
    });

    it("should respond with incorrect username if username does not exist",
        function(done)
    {
        // try to collect response so we know this case is true
        request("http://myroots.xyz")
        .post("/userLogin")
        .send({email: "abcdefg12345@gmail.com", password: "baseball"})
        .expect(200)
        .end(done);
    });

    it("should redirect you to '/' if you are not logged in and trying to "
        +"access page that requires authentication", function(done)
    {
        request("http://myroots.xyz")
        .get("/profile")
        .expect(302)
        .expect("location", "/")
        .end(done);
    });
});
