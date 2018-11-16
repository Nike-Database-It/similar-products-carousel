const cassandra = require('cassandra-driver');

const client = new cassandra.Client({ contactPoints: ['127.0.0.1'] });

client.connect((err) => {
  if (err) {
    console.log(err);
  }
  const query = "CREATE KEYSPACE IF NOT EXISTS nike_sdc WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 3}";
  client.execute(query, (e) => {
    if (e) {
      console.log(e);
    } else {
      console.log(">>>>> Created Cassandra keyspace 'nike_sdc' ...");
      client.execute('USE nike_sdc', (error) => {
        if (error) {
          console.log(err);
        } else {
          const table = `(
            id int PRIMARY KEY,
            product_sku text,
            price_full int,
            price_sale int,
            product_cat int,
            product_colors int,
            product_line text,
            reviews_avg decimal,
            reviews_cnt int,
            image_source text
          )`;
          client.execute(`CREATE TABLE IF NOT EXISTS shoes ${table}`, (err2) => {
            if (err2) {
              console.log(err2);
            }
            process.exit();
          });
        }
      });
    }
  });
});
