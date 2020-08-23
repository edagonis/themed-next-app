import { Sequelize } from "sequelize"

let databaseConnection

export const getDatabaseConnection = async () => {
  if (databaseConnection) {
    console.log("=> using existing database connection")
    return databaseConnection
  }

  if (!process.env.DATABASE_HOST) {
    console.error("No database endpoint was found")
    return Promise.reject()
  }

  console.log("=> using new database connection")

  // Option 2: Passing parameters separately (other dialects)
  const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
      host: process.env.DATABASE_HOST,
      dialect: "mysql",
      dialectModule: require("mysql2"),
    }
  )

  try {
    await sequelize.authenticate()
    console.log("Connection has been established successfully.")
  } catch (error) {
    console.error("Unable to connect to the database:", error)
  }

  databaseConnection = sequelize

  return databaseConnection
}
