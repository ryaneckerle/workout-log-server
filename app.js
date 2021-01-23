require('dotenv').config();
let express = require('express');
const app = express();
const sequelize = require('./db');

let user = require('./controllers/usercontroller');
let log = require('./controllers/logcontroller');

sequelize.sync();
//sequelize.sync({force: true});
app.use(express.json());

app.use('/user', user);

app.use('/log', log);

app.listen(3000, () => console.log('App is listening on port 3000'));
