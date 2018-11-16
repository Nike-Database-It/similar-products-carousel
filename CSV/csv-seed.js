const fs = require('fs');

const csvSeed = () => {
  const start = new Date();
  const fileNum = 6;
  const file = fs.createWriteStream(`./CSV/shoes${fileNum}.csv`, { encoding: 'utf8', flags: 'a' });
  let char;
  let shoeID;
  let priceFull;
  let priceSale;
  let prodCat;
  let prodCols;
  let prodLine;
  let revsAvg;
  let revsCnt;
  let img;
  let output;

  const chars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const prodLines = ['Men\'s Shoe', 'Men\'s Running Shoe', 'Men\'s Boot', 'Women\'s Boot', 'Women\'s Shoe', 'Women\'s Running Shoe', 'Men\'s Basketball Shoe', 'Women\'s Basketball Shoe', 'Kids\' Shoe', 'Little Kids\' Shoe', 'Big Kids\' Shoe', 'Infant/Toddler Shoe'];

  const records = 20 * 1000000;

  for (let i = 0; i < records; i += 1) {
    shoeID = '';
    for (char = 0; char < 9; char += 1) {
      if (char < 6) {
        shoeID += chars[Math.floor(Math.random() * chars.length)];
      } else if (char === 6) {
        shoeID += '-';
        shoeID += chars[Math.floor(Math.random() * chars.length)];
      } else {
        shoeID += chars[Math.floor(Math.random() * chars.length)];
      }
    }
    priceFull = (Math.random() * 200 + 100).toFixed(2);
    priceSale = Math.random() > 0.5 ? (priceFull - Math.random() * 80).toFixed(2) : null;
    prodCat = Math.floor(Math.random() * 5);
    prodCols = Math.floor(Math.random() * 10 - 5);
    prodCols = prodCols < 1 ? 1 : prodCols;
    prodLine = prodLines[Math.floor(Math.random() * prodLines.length)];
    revsAvg = Math.random() * 3 + 2;
    revsAvg = revsAvg.toFixed(2);
    revsCnt = Math.floor(Math.random() * 80 - 40);
    revsCnt = revsCnt < 0 ? 0 : revsCnt;
    img = `https://s3-us-west-1.amazonaws.com/vb-sdc-shoe-photo-bucket/shoes/shoe${Math.floor(Math.random() * 800)}.jpg`;
    output = `${i + ((fileNum - 1) * records) + 1},${shoeID},${Math.round(priceFull)},${Math.round(priceSale)},${prodCat},${prodCols},${prodLine},${revsAvg},${revsCnt},${img}\n`;
    file.write(output);
    if ((i + 1) % 20000 === 0) {
      console.clear();
      console.log(`${((i / records) * 100).toFixed(2)}% complete...`);
    }
  }
  file.end();
  const end = new Date();
  console.log(`Took ${end - start} milliseconds to write ${records / 1000000} million files...`);
};

csvSeed();

module.exports = csvSeed;
