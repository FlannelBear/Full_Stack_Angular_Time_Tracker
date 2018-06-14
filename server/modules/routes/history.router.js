const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
   console.log('In get');
   res.send('woof');
});

module.exports = router;