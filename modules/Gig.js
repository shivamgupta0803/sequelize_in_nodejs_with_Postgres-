// In your Gig model (models/Gig.js)
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Gig extends Model {}

Gig.init(
  {
    // Your model attributes here
    title: DataTypes.STRING,
    technologies: DataTypes.STRING,
    budget: DataTypes.STRING,
    description: DataTypes.STRING,
    contact_email: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: 'gig',
  }
);

Gig.prototype.toJSON = function () {
  const values = { ...this.get() };
  delete values.createdAt;
  delete values.updatedAt;
  return values;
};

module.exports = Gig;