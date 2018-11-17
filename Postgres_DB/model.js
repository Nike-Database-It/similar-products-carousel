const Knex = require('knex');

const cred = require('./POSTGRES_CRED');

const knex = Knex({
  client: 'pg',
  connection: {
    user: cred.username,
    password: cred.password,
    database: cred.database,
  },
});

const start = new Date();
knex.raw('select * from "shoes" where id=120000000')
  .catch((err) => {
    console.log(err);
  })
  .then((res) => {
    const end = new Date();
    console.log(res.rows[0]);
    console.log(`Took ${end - start} milliseconds to query the database for a single record ...`);
  });
