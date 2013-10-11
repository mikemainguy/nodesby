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

    self.objectify = function(messageContext) {
        return self.contentHandlers[messageContext.inputtype].objectify(messageContext.inputdata);

    }

    self.serialize = function(messageContext) {
        return self.contentHandlers[messageContext.outputtype].serialize(messageContext.objectdata);

    }
}
module.exports = new ContentHandler();
