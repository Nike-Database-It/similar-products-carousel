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


knex.schema.createTable('shoes', (table) => {
  table.increments();
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
  process.exit();
});
