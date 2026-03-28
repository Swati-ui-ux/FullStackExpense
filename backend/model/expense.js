const sequelize = require("../utils/connection_db")
const {DataTypes} = require("sequelize")
const Expense = sequelize.define("expenses", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,

    }
    
   
}, { timestamps: true })
module.exports = Expense