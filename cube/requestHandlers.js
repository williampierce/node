var querystring = require("querystring");

function start(response, postedData) 
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

function ping(response, postedData) 
{
    console.log("PING!");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("PING received!");
    response.end();
}

function report_state(response, postedData) 
{
    console.log("report_state called...");

    var state = JSON.parse(postedData);
    console.log(state);

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("report_state request received!");
    response.end();
}

function upload(response, postedData) 
{
    console.log("Request handler 'upload' was called.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Posted data: " + querystring.parse(postedData).text);
    response.end();
}

exports.start        = start;
exports.report_state = report_state;
exports.ping         = ping;
exports.upload       = upload;
