const DataTypes = require("sequelize/lib/data-types");
const database = require("../config/database");
const Order = require("./order");

const hooks = {
    beforeCreate() { },
};

const Product = database.define(
    "Product",
    {
        product_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            unique: true,
            primaryKey: true
        },
        product_name: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        p_cost: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
    {
       timestamps: true,
       hooks,
       tableName: 'products',
       paranoid: false 
    }
)

// Product.sync({force: true});

module.exports = Product;