var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}

// Test/debug
handle["/ping"]        = requestHandlers.ping;

// Agent requests
handle["/reportState"] = requestHandlers.reportState;

// User requests
handle["/setState"]    = requestHandlers.setState;

server.start(router.route, handle);
