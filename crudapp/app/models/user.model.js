module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    fname: {
      type: Sequelize.STRING
    },
    lname: {
      type: Sequelize.STRING
    },
    dob: {
      type: Sequelize.DATE
    }
  });

  return User;
};