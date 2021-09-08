//csv model

module.exports = (sequelize, Sequelize) => {
  const csv = sequelize.define("csv", {
    user_id: {
      type: Sequelize.STRING,
    },
    user_name: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    salary: {
      type: Sequelize.FLOAT,
    },
  });

  return csv;
};
