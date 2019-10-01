'use strict';

const User = require('./users-model.js');

module.exports = (req, res, next) => {
  try {
    let [authType, encodedString] = req.headers.authorization.split(/\s+/);

    // BASIC Auth  ... Authorization:Basic ZnJlZDpzYW1wbGU=

    switch (authType.toLowerCase()) {
    case 'basic':
      return _authBasic(encodedString);
    default:
      return _authError();
    }
  } catch (e) {
    return _authError();
  }

  function _authBasic(authString) {
    let base64Buffer = Buffer.from(authString, 'base64'); // <Buffer 01 02...>
    let bufferString = base64Buffer.toString(); // john:mysecret
    let [username, password] = bufferString.split(':'); // variables username="john" and password="mysecret"
    let auth = [username, password];

    return User.authenticateBasic(auth).then((user) => {
      console.log('USER: ', user);
      _authenticate(user);
    });
  }

  function _authenticate(user) {
    if (user) {
      // CHANGED STUFF HERE
      req.user = user;
      req.token = user.generateToken();
      console.log({ token: req.token });
      next();
      // return Promise.resolve();
    } else {
      console.log('no user!');
      return _authError();
    }
  }

  function _authError() {
    next({
      status: 401,
      statusMessage: 'Unauthorized',
      message: 'Invalid User ID/Password',
    });
    return Promise.resolve();
  }
};