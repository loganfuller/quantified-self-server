if(process.env.NEW_RELIC_LICENSE_KEY) {
    require('newrelic');
}

var server = require("./lib/index");

server.start();

