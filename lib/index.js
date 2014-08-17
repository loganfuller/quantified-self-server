var express = require("express"),
    bodyParser = require("body-parser"),
    apiRouter = require("./api").router,
    webRouter = require("./web").router,
    app = express(),
    config = require("stockpiler")({
        envPrefix: "QS",
        envMap: {
            "PORT": "PORT",
            "MONGOHQ_URL": "MONGODB__URL"
        }
    });

// Express middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Primary routers
app.use("/api", apiRouter);
app.use("/", webRouter);

module.exports = {
    start: function() {
        var server = app.listen(config.port, function() {
            console.log("listening on port %s", server.address().port);
        });
    }
}

