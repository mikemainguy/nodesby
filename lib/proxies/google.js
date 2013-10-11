var http = require('http');
var Proxy = function () {
    self = this;
    self.match = function(request) {
        return request.url == "/google";
    }
    self.process = function (messageContext) {

        messageContext.start();
        var options = {
            hostname:messageContext.objectdata.host,
            port:80,
            path:'/',
            method:'GET'
        };


        var req = http.request(options, function (res) {
            res.setEncoding('utf8');
            var data = '';
            res.on('data', function (chunk) {
                data += chunk;
            });

            res.on('end', function() {
                messageContext.objectdata.googleStat = res.statusCode;
                messageContext.objectdata.size = data.length;
                messageContext.done();

            });

        });


        req.on('error', function (e) {
            console.log('problem with request: ' + e.message);
        });


        // write data to request body
        req.write('data\n');
        req.write('data\n');
        req.end();
    }
}

module.exports = new Proxy();

