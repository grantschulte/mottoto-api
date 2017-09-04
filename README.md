Mottoto API
===========

JSON API for the Mottoto Web App. This API uses Mongoose and MongoDB.

## Setup
Install dependencies with `yarn` or `npm install`.
```
yarn
```

## Mongoose and MongoDB
Mottoto uses Mongoose for object modeling and MongoDB as a database. You must have
MongoDB installed and the MongoDB daemon running in order to develop.

Run the MongoDB daemon in it's own session.
```
mongod
```

## Databases
The development database is named `mottoto` and the database used for testing is
called `mottoto-test`. You'll need a `.env` for mongoose to connect to the development
database.

## Develop

Start the API server
```
yarn start
```

## Deploy
This project uses Heroku as a host for the staging environment. In order to
push to staging you must have permission to access the Heroku project. You can
then push to Heroku with `yarn deploy:staging` as long as your staging remote
is set to the Heroku git endpoint for this project.

## Tests
Mocha and chai are used as to test this project. The tests should cover every
available endpoint.
```
yarn test
```
