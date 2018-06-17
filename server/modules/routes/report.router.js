const express = require('express');
const router = express.Router();
const pool = require('../pools/pool');

router.get('/:need', (req, res)=>{
   if(req.params.need === 'label'){
      queryText = 'select project.name from project order by project.id;';
      pool.query(queryText).then((result)=>{
         console.log(result.rows);
         res.send(result.rows);
      }).catch((error)=>{
         console.log('Err', error);
         res.sendStatus(404);
      });
   } else if(req.params.need === 'data'){
      queryText = `select sum(entry.hours) as hours from project
      left join entry on project.id = entry.project_id
      group by project.id order by project.id;`;
      pool.query(queryText).then((result)=>{
         console.log(result.rows);
         res.send(result.rows);
      }).catch((error)=>{
         console.log('Err', error);
         res.sendStatus(404);
      });
   }

});

module.exports = router;