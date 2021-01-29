const { sequelize } = require('./models');

const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PSQL connected!');
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToDB;
