var restify = require("restify");

var server = restify.createServer();

server.put("/", function(req, res, next) {
    res.send("Hello, world!");
    return next();
});
