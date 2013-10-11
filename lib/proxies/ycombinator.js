var jsdom = require('jsdom');
var Proxy = function () {
    self = this;
    self.match = function(request) {
        return request.url == "/weather";
    }
    self.process = function (messageContext) {

        var jsdom = require("jsdom");
        messageContext.start();
        //a86e08f4ac5ba328
        //GET http://api.wunderground.com/api/a86e08f4ac5ba328/features/settings/q/query.format
        jsdom.env(
          'http://api.wunderground.com/api/a86e08f4ac5ba328/features/settings/q/37.776289,-122.395234.xml',
          ["http://code.jquery.com/jquery.js"],
                function(error,window) {
                    messageContext.objectdata.weather = window.document;
                    messageContext.done();
                });
    }
}

module.exports = new Proxy();