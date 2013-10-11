var http = require('http');
var Negotiator = require('negotiator');
var content_handlers = require('./content_handlers');
var proxies = require('./proxies');

var port = 1337;
var availableMediaTypes = ['application/json', 'text/html', 'application/xml']



var main = function (request, response) {
    var negotiator = new Negotiator(request);
    var writeoutput = function(outputdata) {
        response.writeHead(200, {'Content-Type': outputtype});
        response.end(outputdata);
    }
    var outputtype = negotiator.preferredMediaType(availableMediaTypes);
    var inputtype = request.headers['content-type'] || 'application/json';
    console.log(inputtype);
    var inputdata = "";

    if (request.method == 'POST') {
        request.on('data', function (data) {
            inputdata += data;
        });

        request.on('end', function () {

            var messageContext = {
                'inputdata': inputdata,
                'inputtype': inputtype,
                'outputtype': outputtype,
                'count':0,
                'start': function() {
                    this.count += 1;
                },
                'done': function() {
                    this.count -= 1;
                    if (this.count <=0){
                        writeoutput(content_handlers.serialize(this));
                    }
                }

            }

            messageContext.objectdata = content_handlers.objectify(messageContext);

            for(i in proxies) {
                if (proxies.hasOwnProperty(i)) {
                    var proxy = proxies[i];
                    if (!proxy.match || proxy.match(request)) {
                        proxies[i].process(messageContext) ;
                    }
                }
            }

            if(messageContext.count == 0) {
                messageContext.done();
            }

        });
    }
}

var server = http.createServer(main);
server.listen(port);
console.log('Server running on port ' + port);