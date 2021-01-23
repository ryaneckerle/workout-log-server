let express = require('express');
const app = express();
const sequelize = require('./db');

let log = require('./controllers/logcontroller');

sequelize.sync();
//sequelize.sync({force: true});

app.use('/log', log);

app.listen(3000, () => console.log('App is listening on port 3000'));
