const mysql = require('mysql');
const promise = require('bluebird');

const connection = mysql.createConnection({
  user: 'warpv',
  password: 'justdoit',
  database: 'airjordans',
  multipleStatements: true,
});
promise.promisifyAll(connection);

class Shoe {
  constructor() {
    this.connection = mysql.createConnection({
      user: 'warpv',
      password: 'justdoit',
      database: 'airjordans',
    });
  }

  addOne(prodSku, priceFull, priceSale, prodCat,
    prodCols, prodLine, prodName, revsAvg, revsCnt, imgSrc) {
    this.connection.queryAsync(
      'INSERT INTO shoes (product_sku, price_full, price_sale, product_cat, product_colors, product_line, product_name, reviews_avg, reviews_cnt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [prodSku, priceFull, priceSale, prodCat, prodCols, prodLine, prodName, revsAvg, revsCnt],
    );

    this.connection.queryAsync(
      'INSERT INTO images (product_sku, image_view, image_source) VALUES (?, ?, ?)',
      [prodSku, 'profile_left', imgSrc],
    );
  }

  updateOne(shoeID, col, value, cb) {
    this.connection.query(`UPDATE shoes SET ${col} = ? WHERE product_sku = ?`, [value, shoeID], cb);
  }

  deleteOne(shoeID, cb) {
    this.connection.query('DELETE FROM shoes WHERE product_sku = ?', [shoeID], cb);
    this.connection.query('DELETE FROM images WHERE product_sku = ?', [shoeID], cb);
  }

  getOne(opts, cb) {
    this.connection.query('SELECT * FROM shoes WHERE product_sku = ? LIMIT 1', opts, cb);
  }

  getAll(cb) {
    this.connection.query('SELECT * FROM shoes', cb);
  }

  getImagesOfTwelveSimilar(opts, cb) {
    const q = 'SELECT * FROM shoes INNER JOIN images ON shoes.product_sku = images.product_sku WHERE shoes.product_line = ? OR shoes.product_cat = ? AND shoes.product_sku != ? ORDER BY RAND() LIMIT 12';
    this.connection.query(q, opts, cb);
  }
}

module.exports.Shoe = new Shoe();
