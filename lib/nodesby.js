var http = require('http');
var Negotiator = require('negotiator');
var content_handlers = require('./content_handlers');

var port = 1337;
var availableMediaTypes = ['application/json', 'text/html', 'application/xml']



var transform = function (response, data, outputtype, inputtype) {
    response.writeHead(200, {'Content-Type': outputtype});
    var messageContext = {};
    messageContext.workingMessage = content_handlers.objectify(inputtype, data, messageContext);




    response.end(content_handlers.serialize(outputtype, messageContext));
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