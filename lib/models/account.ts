import { DataTypes, Model } from "sequelize"

import { getDatabaseConnection } from "../helpers/database-connector"

export const getAccountModel = async (): Promise<any> => {
  const sequelize = (await getDatabaseConnection()) as any

  const Account = sequelize.define(
    "accounts",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  )

  Account.associate = (models) => {
    Account.hasMany(models.Player)
  }

  Account.prototype.toJSON = function () {
    const values = { ...this.get() }
    delete values.password
    return values
  }

  return Account
}
