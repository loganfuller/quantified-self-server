var restify = require("restify");

var server = restify.createServer();

server.get("/", function(req, res, next) {
    res.send("Hello, world!");
    return next();
});

server.listen(process.env.HTTP_PORT || 8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});
