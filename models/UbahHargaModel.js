import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;
const UbahHarga = db.define(
  "ubahharga",
  {
    pertamax: {
      type: DataTypes.INTEGER,
      defaultValue: 12000,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    pertamax_turbo: {
      type: DataTypes.INTEGER,
      defaultValue: 12000,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    pertalite: {
      type: DataTypes.INTEGER,
      defaultValue: 12000,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    pertamina_dex: {
      type: DataTypes.INTEGER,
      defaultValue: 12000,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    dexlite: {
      type: DataTypes.INTEGER,
      defaultValue: 12000,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    solar: {
      type: DataTypes.INTEGER,
      defaultValue: 12000,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

export default UbahHarga;
