var requireDir = require('require-dir');
var handlers = requireDir('.', {recurse: true});


var ContentHandler = function() {
    var self = this;
    self.contentHandlers = {};

    for (var a in handlers)  {
            for (var b in handlers[a]) {
                self.contentHandlers[handlers[a][b].contentType] = handlers[a][b];
            }
    }

    self.objectify = function(contentType, data, messageContext) {
        return self.contentHandlers[contentType].objectify(data, messageContext);
    }

    self.serialize = function(contentType,  messageContext) {
        return self.contentHandlers[contentType].serialize(messageContext.workingMessage, messageContext);

    }
}
module.exports = new ContentHandler();
