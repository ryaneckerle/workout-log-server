// description store string  null = false
// definition store string   null = false
// result store string       null = false
// owner_id store integer    null = false

module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define('log', {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    definition: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    result: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    owner_id: {
      type: DataTypes.INTEGER,
    },
  });
  return Log;
};
