var express = require("express"),
    bodyParser = require("body-parser"),
    apiRouter = require("./api").router,
    webRouter = require("./web").router,
    app = express();

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
        var server = app.listen(process.env.PORT || 8080, function() {
            console.log("listening on port %s", server.address().port);
        });
    }
}

