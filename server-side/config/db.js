require('dotenv').config(); // load environment variables from a .env file
const { Sequelize } = require('sequelize'); // import Sequelize library for database interactions

// initialize a new Sequelize instance with configuration from environment variables
const sequelize = new Sequelize({
  host: process.env.DB_HOST,      
  dialect: process.env.DB_DIALECT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// test the database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate(); // attempt to authenticate the connection
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error); 
  }
};

testConnection(); 

module.exports = sequelize; 
