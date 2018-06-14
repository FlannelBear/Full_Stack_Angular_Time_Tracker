const express = require('express');
const app = express();
app.use(express.static('server/public'));

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
   console.log('Server running on port: ', PORT);
});