const express = require('express');
const router = express.Router();
const pool = require('../pools/pool');

router.get('/all', (req, res)=>{
   console.log('Handling GET for /project');
   const queryText = `select * from project order by project.id`;
   pool.query(queryText).then((result)=>{
      res.send(result.rows);
   }).catch((error)=>{
      console.log('Error handling GET for /project: ', error);
   });
});

router.get('/hours', (req, res)=>{
   console.log('Handling GET for /project');
   const queryText = `select project.id, project.name as project, sum(entry.hours) as hours from project
   left join entry on project.id = entry.project_id
   group by project.id order by project.id;`;
   pool.query(queryText).then((result)=>{
      res.send(result.rows);
   }).catch((error)=>{
      console.log('Error handling GET for /project: ', error);
   });
});

router.post('/', (req, res)=>{
   const queryText = 'insert into project ("name") values ($1);';
   console.log('POST', req.body.title);
   pool.query(queryText, [req.body.title]).then((result)=>{
      res.sendStatus(201);
   }).catch((error)=>{
      console.log('Error handling POST for /project: ', error);
      res.sendStatus(500);
   });
});

router.delete('/:id', (req, res)=>{
   const queryText = 'delete from project where id = $1;';
   pool.query(queryText, [req.params.id]).then((result)=>{
      res.sendStatus(200);
   }).catch((error)=>{
      console.log('Error handling DELETE for /project: ', error);
      res.sendStatus(500);
   });
});

module.exports = router;