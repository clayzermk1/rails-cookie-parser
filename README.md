# rails-cookie-parser

Express middleware to parse Rails session cookies. Uses [node-marshal](https://github.com/clayzermk1/node-marshal) to parse Marshal strings into JavaScript objects.

## Installation

`npm install rails-cookie-parser`

## Use

### Basic use

Create an external file to hold your Rails cookie secret or pass it in through the environment. The following example assumes you are passing in `RAILS_COOKIE_SECRET` from the environment and that your Rails session cookie is called `_session`.

```javascript
var express = require('express');
var app = express();

/// middleware
// ...
app.use(require('cookie-parser')());
app.use(require('rails-cookie-parser')('_session', process.env.RAILS_COOKIE_SECRET));
// ...

app.use('/', function (req, res, next) {
  console.log(req.cookies['_session']); // Rails session cookie
});
```

## Features / Limitations

`rails-cookie-parser` is only able to parse `node-marshal`'s [supported Marshal types](https://github.com/clayzermk1/node-marshal#supported-types).

`rails-cookie-parser` is not able to originate or manage Rails sessions, it is only able to read / "piggy-back" off of them.
