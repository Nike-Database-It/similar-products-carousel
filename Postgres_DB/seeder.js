const Sequelize = require('sequelize');
const cred = require('./POSTGRES_CRED');

const sequelize = new Sequelize(cred.database, cred.username, cred.password, {
  host: 'localhost',
  dialect: 'postgres',
});

const Shoes = sequelize.define('shoes', {
  product_sku: Sequelize.STRING(20),
  price_full: Sequelize.SMALLINT,
  price_sale: Sequelize.SMALLINT,
  product_cat: Sequelize.SMALLINT,
  product_colors: Sequelize.SMALLINT,
  product_line: Sequelize.STRING(40),
  reviews_avg: Sequelize.DECIMAL(3, 2).UNSIGNED,
  reviews_cnt: Sequelize.SMALLINT,
  image_source: Sequelize.STRING(150),
});
