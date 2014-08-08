var express = require("express"),
    bodyParser = require("body-parser"),
    app = express(),
    apiRouter = express.Router(),
    webRouter = express.Router();

// Express middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// API routes
apiRouter.use("/heartrate", require("./heartrate").router);

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

