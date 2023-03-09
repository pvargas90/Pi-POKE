const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Pokemon",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imagen: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      vida: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ataque: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      defensa: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      velocidad: {
        type: DataTypes.STRING,
      },
      altura: {
        type: DataTypes.STRING,
      },
      peso: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );
};
