require('newrelic');

const express = require('express');
const path = require('path');
const parser = require('body-parser');
const morgan = require('morgan');

// const model = require('./../database/model.js');
const Shoe = require('./../Postgres_DB/model.js');

const app = express();

app.use(express.static(path.join(__dirname, './../public')));
app.use(express.static(path.join(__dirname, './../node_modules')));

app.use(parser.json());
app.use(morgan('dev'));

// app.get('/:product_sku/similar', (req, res) => {
//   model.Shoe.getOne(req.params.product_sku, (err1, data1) => {
//     if (err1) {
//       res.status(500).send(err1.message);
//     } else {
//       const opts = [data1[0].product_line, data1[0].product_cat, data1[0].product_sku];
//       model.Shoe.getImagesOfTwelveSimilar(opts, (err2, data2) => {
//         if (err2) {
//           res.status(500).send(err2.message);
//         } else {
//           res.send(data2);
//         }
//       });
//     }
//   });
// });

app.get('/:product_sku/similar', (req, res) => {
  const randID = Math.floor(Math.random() * 120000000);
  Shoe.getOne(randID, (err1, data1) => {
    if (err1) {
      console.log(err1);
      res.status(500).send(err1);
    } else {
      Shoe.getImagesOfTwelveSimilar(data1.rows[0].product_cat, (err2, res2) => {
        if (err2) {
          console.log(err2);
          res.status(500).send(err2);
        } else {
          res.send(res2.rows);
        }
      });
    }
  });
});

// app.post('/:product_sku/similar', (req, res) => {
//   const info = req.body;
//   model.Shoe.addOne(info.product_sku, info.price_full, info.price_scale, info.product_cat, info.product_colors, info.product_line, 'Best shoe ever', info.reviews_avg, info.reviews_cnt, info.img_src);
//   res.end();
// });

// app.patch('/:product_sku/similar', (req, res) => {
//   const info = req.body;
//   model.Shoe.updateOne(info.product_sku, info.col, info.val, (err) => {
//     if (err) {
//       console.log(err);
//     }
//     res.end();
//   });
// });

// app.delete('/:product_sku/similar', (req, res) => {
//   const info = req.body;
//   model.Shoe.deleteOne(info.product_sku, (err) => {
//     if (err) {
//       console.log(err);
//     }
//     res.end();
//   });
// });

module.exports = app;
