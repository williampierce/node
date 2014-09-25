var http = require('http');
var url  = require('url');
var fs   = require('fs');
var path = require('path');

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
            // End of posted data
            // If the request is for a static page, return it; otherwise, route the request
            if(!serveStaticPage(request, pathname, response))
                route(handle, request, pathname, query, postedData, response);
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

function serveStaticPage(request, pathname, response)
{
    // Allow a special case to play with static pages
    var pathDirs = pathname.split("/");

    // pathDirs[0] will be the empty string before the first "/"
    if(pathDirs[1] == "static" && pathDirs.length == 3)
    {
        var pagePath = path.join(__dirname, "static", pathDirs[2]);
        // console.log("Attempting to serve page: " + pagePath);

        var input = fs.createReadStream(pagePath);
        input.on("data", function(data) { response.write(data); });

        input.on("error", function(err) { 
                console.log("Error reading static file"); 
                response.writeHead(404, {"Content-Type": "text/plain"});
                response.end("File not found"); });

        input.on("end", function() { response.end(); });

        return true;
    }
    return false;
}

exports.start= start;

