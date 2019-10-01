# Authentication ![Build Status](https://travis-ci.org/colosrjones-401d4/lab-11.svg?branch=master)

### Author: Steven Jones

### Links and Resources
* [repo](https://github.com/colosrjones-401d4/lab-11/pull/1)
* [travis](https://travis-ci.org/colosrjones-401d4/lab-11/builds/591799452)
* [heroku](http://heroku.com)

### Description
Lab project that focuses on protecting routes using auth middleware. Also tests whether certain routes are protected and are successful.

### Modules
#### `middleware.js` `router.js` `users-model.js` `books.js`

### Setup
#### `.env` requirements
* `PORT` - 3000
* `MONGODB_URI` - mongodb://localhost/db

#### Running the app
* `npm run dbOn` && `npm start`

* POST `/signup`
  * Input: Username, password, e-mail, role (admin, user, editor)
  * Saves new user
* GET `/books`
  * Returns JSON object with count of books in database, and titles of books.
  * Protected; Can only be accessed when logged in as an authorized user
  
#### Tests
* `npm test`

##### Assertions
* fails a login for a user (admin) with the incorrect basic credentials
* logs in an admin user with the right credentials
* should give error when unauthorized user tries to GET /books
* should return books when an authorized user tries to GET /books
* can create a new user
* can signin a user
