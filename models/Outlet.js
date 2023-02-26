const DataTypes = require("sequelize/lib/data-types");
const database = require("../config/database");
const Order = require("./order")

const hooks = {
    beforeCreate() { },
};

const Outlet = database.define(
    "Outlet",
    {
        outlet_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            unique: true,
            primaryKey: true
        },
        outlet_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        outlet_phone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        address:{
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
       timestamps: true,
       hooks,
       tableName: 'outlets',
       paranoid: false 
    }
)

// Outlet.sync({force: true});

module.exports = Outlet;