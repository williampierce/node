var http = require('http');

// Send request to update device state
// Uses agent id to determine URL; sends device state as JSON
//     state
//         agent: <agent id string>
//         face:  1..6
function setState(state)
{
    var jsonState = JSON.stringify(state);

    var headers = {
        'Content-Type': 'application/json',
        'Content-Length': jsonState.length
    };

    var options = {
        host: 'agent.electricimp.com',
        port: 80,
        // Example path: '/ck2d15weoILd/setState',
        path: '/' + state.agent + '/setState',
        method: 'POST',
        headers: headers
    };

    console.log(options);

    var request = http.request(options, function(res) {
            console.log('STATUS: ' + res.statusCode);
            console.log('HEADERS: ' + JSON.stringify(res.headers));
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                console.log('BODY: ' + chunk);
                });
            });

    console.log(state);
    console.log(jsonState);

    request.on('error', function(e) {
            console.log('Error: ' + e);
            });

    request.write(jsonState);
    request.end();
}

exports.setState = setState;
