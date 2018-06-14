const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
   console.log('Handling GET for /history');
   queryText = `select entry.id as entry_id, entry.description as description, entry.date as date, entry.hours as hours, project_id, project.name as project from entry 
   join project on entry.project_id = project.id
   order by entry.date desc;`;
   pool.query(queryText).then((result)=>{
      res.send(result.rows);
   }).catch((error)=>{
      console.log('Error handling GET for /history: ', error);
      res.sendStatus(500);
   });
});

module.exports = router;