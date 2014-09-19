var http = require('http');
var url = require('url');

function start(route, handle)
{
    function onRequest(request, response)
    {
        var request_parse = url.parse(request.url);
        var pathname      = request_parse.pathname;
        var query         = request_parse.query;
        var postedData    = "";

        function postData(chunk)
        {
            console.log("Received POST data chunk '" + chunk + "'");
            postedData += chunk;
        }

        function postEnd()
        {
            // End of posted data; route request
            route(handle, pathname, query, postedData, response);
        }

        console.log("HTTP " + request.method + " request for " + pathname + " received");
        if(query)
            console.log("  Query: " + query);

        request.setEncoding("utf8");
        request.addListener("data", postData);
        request.addListener("end",  postEnd);
    }

    http.createServer(onRequest).listen(8765); 
    console.log('Server running on port 8765');
}

exports.start= start;

