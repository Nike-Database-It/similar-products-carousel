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

// const start = new Date();
// knex.raw('select * from "shoes" where id=120000000')
//   .catch((err) => {
//     console.log(err);
//   })
//   .then((res) => {
//     const end = new Date();
//     console.log(res.rows[0]);
//     console.log(`Took ${end - start} milliseconds to query the database for a single record ...`);
//   });

class Shoe {
  // eslint-disable-next-line max-len
  static addOne(prodSku, priceFull, priceSale, prodCat, prodCols, prodLine, revsAvg, revsCnt, imgSrc) {
    knex.raw('INSERT INTO shoes (product_sku, price_full, price_sale, product_cat, product_colors, product_line, reviews_avg, reviews_cnt, image_source) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [prodSku, priceFull, priceSale, prodCat, prodCols, prodLine, revsAvg, revsCnt, imgSrc])
      .catch((err) => {
        console.log(err);
      });
  }

  static getOne(id, cb) {
    knex.raw('SELECT * FROM shoes WHERE id = ? LIMIT 1', [id])
      .then((res) => { cb(null, res); })
      .catch((err) => { cb(err, null); });
  }

  static getImagesOfTwelveSimilar(category, cb) {
    knex.raw('SELECT * FROM shoes WHERE product_cat = ? LIMIT 12', [category])
      .then((res) => { cb(null, res); })
      .catch((err) => { cb(err, null); });
  }
}

module.exports = Shoe;
