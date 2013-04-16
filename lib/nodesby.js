var http = require('http');
var Negotiator = require('negotiator')
var port = 1337;
var availableMediaTypes = ['application/json', 'text/html', 'application/xml']

var parseString = require('xml2js').parseString;

var transform = function (response, data, outputtype, inputtype) {
    response.writeHead(200, {'Content-Type':outputtype});
    if (inputtype == outputtype) {
        response.end(data);
    }
    if (inputtype == 'application/xml') {
        parseString(data, function(err, result) {
           response.end(JSON.stringify(result));
        });
    }
}

var processor = function (request, response) {
    negotiator = new Negotiator(request);
    outputtype = negotiator.preferredMediaType(availableMediaTypes);
    inputtype = request.headers['content-type'] || 'application/json';
    console.log(inputtype);
    output = "";
    if (request.method == 'POST') {
        request.on('data', function (data) {
            output += data;
        });
        request.on('end', function () {
            transform(response, output, outputtype, inputtype);
        });
    }
}

var server = http.createServer(processor);
server.listen(port);
console.log('Server running on port ' + port);