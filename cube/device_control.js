var http = require('http');

function set_state(state)
{
    var json_state = JSON.stringify(state);

    var headers = {
        'Content-Type': 'application/json',
        'Content-Length': json_state.length
    };

    var options = {
        host: 'agent.electricimp.com',
        port: 80,
        path: '/ck2d15weoILd/set_state',
        method: 'POST',
        headers: headers
    };

    var request = http.request(options, function(res) {
            console.log('STATUS: ' + res.statusCode);
            console.log('HEADERS: ' + JSON.stringify(res.headers));
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                console.log('BODY: ' + chunk);
                });
            });

    console.log(state);
    console.log(json_state);

    request.on('error', function(e) {
            console.log('Error: ' + e);
            });

    request.write(json_state);
    request.end();
}

exports.set_state = set_state;
