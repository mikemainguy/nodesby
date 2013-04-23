var ApplicationJson = function() {
    var self = this;
    self.contentType = "application/json";

    self.objectify = function(data) {
        return JSON.parse(data);
    }

    self.serialize = function(data) {
        return JSON.stringify(data);
    }

    self.match = function(inputType) {
        return self.contentType == inputType;
    }
}
module.exports = new ApplicationJson();