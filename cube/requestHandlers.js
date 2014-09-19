// requestHandlers.js
//
// Provide a function for each type of request, as determined by the router, typically
// by examining the pathname.

var querystring = require("querystring");
var logic       = require("./logic");     // business logic

// Debug
function ping(query, data, response) 
{
    console.log("PING!");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("PING received!");
    response.end();
}

// *** Device/Agent to Server ***

// Agent reports device state using JSON
//     agent_id: <string>
//     face:     1..6
function reportState(query, data, response) 
{
    // console.log("Function reportState called, updating state...");

    var state = JSON.parse(data);
    // console.log("  state: " + state);

    logic.updateState(state);

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("OK (reportState)");
}

// *** Operator to Server ***

// Operator sets device state using a query string
//     <server>/setState?agent_id=<string>&face=<1..6>
//
// For test, probably not needed longterm.
function setState(query, data, response) 
{
    console.log("Function setState called...");

    var state = querystring.parse(query);
    console.log("    query: " + query);
    if(data)
        console.log("    data:  " + data);

    logic.updateState(state);

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("OK (setState)");
}

exports.ping        = ping;
exports.reportState = reportState;
exports.setState    = setState;
