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

const location = '/home/vigneshb/tmp/shoes6.csv';
const start = new Date();
knex.raw(`copy shoes(id,product_sku,price_full,price_sale,product_cat,product_colors,product_line,reviews_avg,reviews_cnt,image_source) FROM '${location}' DELIMITER ','`)
  .catch((err) => {
    console.log(err);
  }).then(() => {
    const end = new Date();
    console.log(`Took ${end - start} milliseconds to seed Postgres database with 20 million records...`);
    process.exit();
  });
