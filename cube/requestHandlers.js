var querystring    = require("querystring");
var device_control = require("./device_control");

function start(query, data, response) 
{
    console.log("Request handler 'start' was called.");

    var body = '<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" content="text/html; '+
        'charset=UTF-8" />'+
        '</head>'+
        '<body>'+
        '<form action="/upload" method="post">'+
        '<textarea name="text" rows="20" cols="60"></textarea>'+
        '<input type="submit" value="Submit text" />'+
        '</form>'+
        '</body>'+
        '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function ping(query, data, response) 
{
    console.log("PING!");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("PING received!");
    response.end();
}

// Uses JSON to report device state
function report_state(query, data, response) 
{
    console.log("report_state called...");

    var state = JSON.parse(data);
    console.log(state);

    device_control.set_state(state);

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("report_state request received!");
    response.end();
}

// Simple user interface with query strings
function set_state(query, data, response) 
{
    console.log("set_state called...");

    var state = querystring.parse(query);
    console.log(query);
    console.log(state);
    console.log(data);

    device_control.set_state(state);

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("set_state request received!");
    response.end();
}

function upload(query, data, response) 
{
    console.log("Request handler 'upload' was called.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Posted data: " + querystring.parse(data).text);
    response.end();
}

exports.start        = start;
exports.report_state = report_state;
exports.set_state    = set_state;
exports.ping         = ping;
exports.upload       = upload;
