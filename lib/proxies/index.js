var requireDir = require('require-dir');
var proxies = requireDir('.', {recurse: true});
module.exports = proxies;