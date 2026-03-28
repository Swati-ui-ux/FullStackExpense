const sequelize = require("../utils/connection_db")
const {DataTypes} = require("sequelize")
const User =  sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull: false,
        
    }
    , name: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },password: {
        type: DataTypes.STRING,
        allowNull: false,
        
    }, email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
    },salary: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },

  // 💵 Remaining Balance
  remainingBalance: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }

},{
timestamps:true
}
)

module.exports =  User