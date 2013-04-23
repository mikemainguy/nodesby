var easyXml = require('easyXML');
var parseString = require('xml2js').parseString;

var ApplicationXml = function() {
    var self = this;

    self.contentType="application/xml";
    self.objectify = function(input) {
        var output;
        parseString(input,function(err,parsed) {
            output = parsed;
        });
        return output;
    }

    self.serialize = function(data) {
        return easyXml.render(data);
    }

    self.match = function(inputType) {
        return self.contentType = inputType;
    }
}
module.exports = new ApplicationXml();