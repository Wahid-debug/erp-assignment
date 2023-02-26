const Order = require("../models/Order");
const User = require("../models/User");
const sequelize = require("sequelize")
const { getPagination, getPagingData, formatResult } = require("../services/pagination");

module.exports = {
    create: async (req, res) => {
        try {
            const { product, outlet, quantity, cost, user_id } = req.body;
            if (!product && !quantity && !cost) {
                return res.json({
                    code: 400,
                    msg: "Missing required fields",
                    data: []
                })
            }
            const order = await Order.create({
                product, outlet, quantity, cost, user_id
            })
            res.json({
                code: 201,
                msg: "Order saved successfully",
                data: order
            })
        } catch (err) {
            console.log(err)
            res.json({
                code: 500,
                msg: err.message || "Error in saving data",
                data: []
            })
        }
    },
    getAllOrders: async (req, res) => {
        try {
            const { page = 0, size = 10, ...searchParams } = req.query
            const { limit, offset } = getPagination(page, size);
            let where;
            let conditions = {
                where: where, distinct: true,
                order: [['order_id', 'DESC']],
            };
            if (size != '-1') {
                conditions['limit'] = limit;
                conditions['offset'] = offset;
            }
            const order = await Order.findAndCountAll(conditions);
            const response = getPagingData(order, page, limit);
            const Data = formatResult(response)
            res.json({
                code: 200,
                msg: "Data Fetched Successfully.",
                data: response,
            })

        } catch (err) {
            res.json({
                code: 500,
                msg: err.message || "Error in fetching data",
                data: []
            })
        }
    },
    deleteOrder: async (req, res) => {
        try {
            let where = { order_id: req.params.order_id };
            let conditions = {
                where: { ...where }
            }
            const order = await Order.findOne(conditions);
            if (!order) {
                return res.json({
                    code: 400,
                    msg: "Order not found!",
                    data: [],
                })
            }
            const data = await Order.destroy(conditions)
            res.json({
                code: 200,
                msg: "Data deleted.",
                data,
            })
        } catch (err) {
            res.json({
                code: 500,
                msg: err.message || "Error in deleting data",
                data: []
            })
        }
    },
    updateOrder: async (req, res) => {
        try {
            const { product, outlet, quantity, cost, user_id } = req.body;
            let where = { order_id: req.params.order_id };
            let conditions = {
                where: { ...where }
            }
            const order = await Order.findOne(conditions);
            if (!order) {
                return res.json({
                    code: 400,
                    msg: "Order not found!",
                    data: [],
                })
            }
            const data = await Order.update({
                product, outlet, quantity, cost, user_id
            }, conditions)
            res.json({
                code: 200,
                msg: "Data updated successfully",
                data: data
            })


        } catch (err) {
            console.log(err)
            res.json({
                code: 500,
                msg: err.message || "Error in updating data",
                data: []
            })
        }
    },
    orderReportByUser: async (req, res) => {
        try {
            const { page = 0, size = 10, ...searchParams } = req.query
            const { limit, offset } = getPagination(page, size);
            let where = {};
            let conditions = {
                where: where,
                distinct: true,
                attributes: [
                    [sequelize.fn('SUM', sequelize.col('cost')), 'totalCost'],
                    [sequelize.fn('COUNT', sequelize.col('product')), 'productCount'],
                    [sequelize.fn('SUM', sequelize.col('quantity')), 'totalQuantity'],
                ],
                include: [{
                    model: User,
                    attributes: ['name'],
                }],
                order: [['order_id', 'DESC']],
                group: ['user_id'],
            };
            if (size != '-1') {
                conditions['limit'] = limit;
                conditions['offset'] = offset;
            }
            const data = await Order.findAll(conditions)
            res.json({
                code: 200,
                msg: "Date fetched successfully",
                data
            })
        } catch (err) {
            console.log(err);
            res.json({
                code: 500,
                msg: err.message || "Error in updating data",
                data: []
            })
        }
    }
}