const pg = require('pg');
const Pool = pg.Pool;n

const config = {
   database: 'time_tracker',
   host: 'localhost',
   port: 5432,
   max: 10,
   idleTimeOutMillis: 1000
}

const pool = new Pool(config);

const DATABASE_NAME = 'time_tracker'

pool.on('connect', ()=>{
   console.log('Connected to database: ', DATABASE_NAME);
});

pool.on('error', (error)=>{
   console.log('Error connecting to database: ', DATABASE_NAME, error)
});

module.exports = pool;