const DataTypes = require("sequelize/lib/data-types");
const database = require("../config/database");
const Order = require("./Order");

const hooks = {
    beforeCreate() { },
};

const User = database.define(
    "User",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            unique: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        reporting_manager:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
       timestamps: true,
       hooks,
       tableName: 'users',
       paranoid: false 
    }
)

User.associate = (models) => {
    User.hasMany(models.Order, {
        foreignKey: 'user_id'
    });
}

// User.sync({force: true});

module.exports = User;