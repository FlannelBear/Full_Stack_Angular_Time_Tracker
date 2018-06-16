// Express
const express = require('express');
const app = express();
app.use(express.static('server/public'));

// Body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Port
const PORT = process.env.PORT || 3000;

// Routers
const historyRouter = require('./modules/routes/history.router');
app.use('/history', historyRouter);

const projectRouter = require('./modules/routes/project.router');
app.use('/project', projectRouter);

const reportRouter = require('./modules/routes/report.router');
app.use('/report', reportRouter);

// Listen
app.listen(PORT, ()=>{
   console.log('Server running on port: ', PORT);
});