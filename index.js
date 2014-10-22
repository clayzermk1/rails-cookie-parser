var crypto = require('crypto');
var Marshal = require('marshal');

function unpackRailsCookie (cookie, secret) {
  // Rails cookie sessions contain data and a digest joined by '--'
  var session = cookie.split('--');
  var data = session[0];
  var digest = session[1];

  // crate an HMAC out of the secret Rails uses to sign the cookies (<rails root>/config/secret_token.yml, etc.)
  var hmac = crypto.createHmac('sha1', secret);
  hmac.update(data);

  // validate the cookie session data secret
  if (secret && (digest == hmac.digest('hex'))) {
    // the Marshaled session is base64 encoded
    return new Buffer(data, 'base64');
  }
}

module.exports = function (name, secret) {
  return function (req, res, next) {
    // req.cookies should be available from cookie-parser
    if (req.cookies && req.cookies[name]) {
      var m = new Marshal(unpackRailsCookie(req.cookies[name], secret));
      // replace req.cookies.<name> with the un-marshaled object
      req.cookies[name] = m.parsed;
      next();
    }
    else {
      next();
    }
  };
};
