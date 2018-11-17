const cassandra = require('cassandra-driver');

const client = new cassandra.Client({ contactPoints: ['127.0.0.1'] });

client.connect((err) => {
  if (err) {
    console.log(err);
  }
  const query = 'SELECT * FROM nike_sdc.shoes where id=20050000';
  const start = new Date();
  client.execute(query, (error, result) => {
    if (error) {
      console.log(err);
    } else {
      console.log(result.rows[0]);
      const end = new Date();
      console.log(`Took ${end - start} milliseconds to query the database for a single record ...`);
      process.exit();
    }
  });
});
