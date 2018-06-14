const express = require('express');
const router = express.Router();
const pool = require('../pools/pool');

router.get('/', (req, res)=>{
   console.log('Handling GET for /project');
   const queryText = `select project.id, project.name as project, sum(entry.hours) as hours from project
   join entry on project.id = entry.project_id
   group by project.id;`
   pool.query(queryText).then((result)=>{
      res.send(result.rows);
   }).catch((error)=>{
      console.log('Error handling GET for /project: ', error);
   });
});

module.exports = router;