const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');  

// define the User model
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,  
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  highScore: {
    type: DataTypes.INTEGER,
    defaultValue: 0,  
  }
}, {
  timestamps: true, 
});

// sync the model with the database
User.sync()
  .then(() => console.log('User model synced with the database.'))
  .catch(err => console.log('Error syncing User model:', err));

module.exports = User;
