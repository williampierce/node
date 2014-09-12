var http = require('http');
var url = require('url');
var querystring = require('querystring');

function start(route, handle)
{
    function onRequest(request, response)
    {
        var request_parse = url.parse(request.url);
        var pathname      = request_parse.pathname;
        var query         = request_parse.query;
        var query_parse   = querystring.parse(query);
        var postedData    = "";

        function postData(chunk)
        {
            postedData += chunk;
            console.log("Received POST data chunk '" + chunk + "'.");
        }

        function postEnd()
        {
            route(handle, pathname, response, postedData);
        }

        console.log("Request for " + pathname + " received.");
        // console.log(query);
        // console.log(query_parse);

        request.setEncoding("utf8");

        request.addListener("data", postData);
        request.addListener("end",  postEnd);
    }

    http.createServer(onRequest).listen(8765); 
    console.log('Server running on port 8765');
}

exports.start= start;

