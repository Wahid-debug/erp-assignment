const DataTypes = require("sequelize/lib/data-types");
const database = require("../config/database");
const Outlet = require("./Outlet");
const Product = require("./product");
const User = require("./user")
const hooks = {
    beforeCreate() { },
};

const Order = database.define(
    "Order",
    {
        order_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            unique: true,
            primaryKey: true
        },
        product: {
            type: DataTypes.STRING,
            allowNull: false
        },
        outlet: {
            type: DataTypes.STRING,
            allowNull: true
        },
        quantity:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cost: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: true
        }
    },
    {
       timestamps: true,
       hooks,
       tableName: 'orders',
       paranoid: false 
    }
)

Order.belongsTo(User, { foreignKey: 'userId', sourceKey: 'id' });

// Order.sync({force: true});

module.exports = Order;