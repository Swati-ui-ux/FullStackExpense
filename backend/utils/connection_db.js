const { Sequelize } = require("sequelize")


// db name root password
const sequelize = new Sequelize("expense", "root", "root123", {

    host: "localhost",
    dialect: "mysql",
})

    ; (async () => {
    try {
      await  sequelize.authenticate()
        console.log("db connected")
    } catch (error) {
        console.log("error in db",error)
    }
    
})()

module.exports = sequelize