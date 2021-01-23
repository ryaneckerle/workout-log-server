const Sequelize = require('sequelize');
const sequelize = new Sequelize('workout-log', 'postgres', 'Eleven50#2021', {
  host: 'localhost',
  dialect: 'postgres',
});

sequelize
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch((err) => console.error('Unable to connect to the database:', err));

module.exports = sequelize;
