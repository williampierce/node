var querystring = require("querystring");
var logic       = require("./logic");

// Debug
function ping(query, data, response) 
{
    console.log("PING!");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("PING received!");
    response.end();
}

// *** Device/Agent to Server ***

// Agent reports device state
//     agent_id: <string>
//     face:     1..6
function reportState(query, data, response) 
{
    console.log("reportState called...");

    var state = JSON.parse(data);
    console.log(state);

    logic.updateState(state);

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("reportState request received!");
    response.end();
}

// *** Operator to Server ***

// Operator sets device state using a query string
//     <server>/setState?agent_id=<string>&face=<1..6>
function setState(query, data, response) 
{
    console.log("setState called...");

    var state = querystring.parse(query);
    console.log(query);
    console.log(state);
    console.log(data);

    // deviceControl.setState(state);
    logic.updateState(state);

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("setState request received!");
    response.end();
}

exports.ping        = ping;
exports.reportState = reportState;
exports.setState    = setState;
