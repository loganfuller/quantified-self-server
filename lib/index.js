var restify = require("restify"),
    server = restify.createServer();

// Restify plugins
server.use(restify.queryParser());
server.use(restify.bodyParser());

// Metric modules
require("./heartrate").routes(server);

module.exports = {
    start: function() {
        server.listen(process.env.PORT || 8080, function() {
            console.log('%s listening at %s', server.name, server.url);
        });
    }
}

