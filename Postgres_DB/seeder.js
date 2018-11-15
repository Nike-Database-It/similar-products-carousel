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

knex.schema.hasTable('shoes')
  .then((exists) => {
    if (!exists) {
      knex.schema.dropTableIfExists('shoes')
        .catch((err) => {
          console.log(err);
        })
        .then(() => {
          console.log(">>>>> TABLE 'shoes' DROPPED...");
          knex.schema.createTable('shoes', (table) => {
            table.increments('id').primary();
            table.string('product_sku', 20);
            table.integer('price_full');
            table.integer('price_sale');
            table.integer('product_cat');
            table.integer('product_colors');
            table.string('product_line', 40);
            table.decimal('reviews_avg', 5, 2);
            table.integer('reviews_cnt');
            table.string('image_source', 150);
          }).catch((err) => {
            console.log(err);
          }).then(() => {
            console.log(">>>>> TABLE 'shoes' CREATED...");
          });
        });
    }
  }).then(() => {
    const location = '/home/vigneshb/tmp/shoes6.csv';
    const start = new Date();
    knex.raw(`copy shoes(product_sku,price_full,price_sale,product_cat,product_colors,product_line,reviews_avg,reviews_cnt,image_source) FROM '${location}' DELIMITER ','`)
      .catch((err) => {
        console.log(err);
      }).then(() => {
        const end = new Date();
        console.log(`Took ${end - start} milliseconds to seed Postgres database...`);
        process.exit();
      });
  });
