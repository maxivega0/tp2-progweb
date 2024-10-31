const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Student = sequelize.define('Student', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  sid: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true
  },
  firstname: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      len: [1, 100]
    }
  },
  lastname: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      len: [1, 100]
    }
  },
  dni: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true,
    validate: {
      isNumeric: true,
      len: [1, 8]
    }
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      len: [1, 100],
      isEmail: true
    }
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'students',
  timestamps: true
});

module.exports = Student;