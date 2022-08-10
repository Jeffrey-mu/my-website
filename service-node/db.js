const { Sequelize } = require('sequelize');
const { dbConfig } = require('./config/config')
const sequelize = new Sequelize(
  dbConfig.database, dbConfig.username,
  dbConfig.password, {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: 'mysql'
});
// 测试连接
sequelize
  .authenticate()
  .then(() => {
    console.log("MySQL client connected");
  })
  .catch((e) => {
    console.error("Unable to connect to MySQL", e);
  });

module.exports = sequelize;
