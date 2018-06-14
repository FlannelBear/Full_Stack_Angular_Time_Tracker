const express = require('express');
const app = express();
app.use(express.static('server/public'));

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

const pool = require('./modules/pools/pool');

app.get('/test', (req, res)=>{
   const queryText = 'SELECT * FROM dummyData;';
   pool.query(queryText).then((result)=>{
      console.log('Got it!');
      res.send(result.rows);
   }).catch((error)=>{
      console.log('Error handling GET for /test', error);
      res.sendStatus(404);
   });
});



app.listen(PORT, ()=>{
   console.log('Server running on port: ', PORT);
});