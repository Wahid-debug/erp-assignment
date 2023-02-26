const Sequelize = require("sequelize");
const Product = require("../models/Product");
const Order = require("../models/Order");

const { getPagination, getPagingData, formatResult } = require("../services/pagination");

module.exports = {
    create: async (req, res) => {
        try {
            const { product_name, p_cost, order_id } = req.body;
            if (!product_name && !p_cost) {
                return res.json({
                    code: 400,
                    msg: "Missing required fields",
                    data: []
                })
            }
            const product = await Product.create({
                product_name, p_cost, order_id
            })
            res.json({
                code: 201,
                msg: "Product saved successfully",
                data: product
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
    getAllProduct: async (req, res) => {
        try {
            const { page = 0, size = 10, ...searchParams } = req.query
            const { limit, offset } = getPagination(page, size);
            let where;
            let conditions = {
                where: where, distinct: true,
                order: [['product_id', 'DESC']],
            };
            if (size != '-1') {
                conditions['limit'] = limit;
                conditions['offset'] = offset;
            }
            const product = await Product.findAndCountAll(conditions);
            const response = getPagingData(product, page, limit);
            const Data = formatResult(response)
            res.json({
                code: 200,
                msg: "Data Fetched Successfully.",
                data: Data,
            })

        } catch (err) {
            res.json({
                code: 500,
                msg: err.message || "Error in fetching data",
                data: []
            })
        }
    },
    deleteProduct: async (req, res) => {
        try {
            let where = { product_id: req.params.product_id };
            let conditions = {
                where: { ...where }
            }
            const product = await Product.findOne(conditions);
            if (!product) {
                return res.json({
                    code: 400,
                    msg: "Product not found!",
                    data: [],
                })
            }
            const productDelete = await Product.destroy(conditions)
            res.json({
                code: 200,
                msg: "Data deleted.",
                data: productDelete,
            })
        } catch (err) {
            res.json({
                code: 500,
                msg: err.message || "Error in deleting data",
                data: []
            })
        }
    },
    updateProduct: async (req, res) => {
        try {
            const { product_name, p_cost, order_id } = req.body;
            let where = { product_id: req.params.product_id };
            let conditions = {
                where: { ...where }
            }
            const product = await Product.findOne(conditions);
            if (!product) {
                return res.json({
                    code: 400,
                    msg: "Product not found!",
                    data: [],
                })
            }
            const data = await Product.update({
                product_name, p_cost, order_id
            }, conditions)
            res.json({
                code: 200,
                msg: "Data updated successfully",
                data: data
            })
        } catch (err) {
            res.json({
                code: 500,
                msg: err.message || "Error in updating data",
                data: []
            })
        }
    },

    // orderReportByProduct: async(req,res)=>{
    //     try{
    //         let where={};
    //         let conditions = {
    //             where: where,
    //             distinct: true,
    //             attributes:[
    //                 ["product_name", "product"]
    //             ],
    //             group: ['product_id'],
    //             include: [{
    //                 model: Order,
    //                 attributes: [
    //                     "product_id"
    //                     [Sequelize.fn('SUM', Sequelize.col('quantity')), 'totalQty'],
    //                     [Sequelize.fn('SUM', Sequelize.col('p_cost')), 'cost'],
    //                 ],
    //             }],
    //             order: [['product_id', 'DESC']],
                
    //         }

    //         const data = await Product.findAll(conditions)
    //         res.json({
    //             code: 200,
    //             msg: "Date fetched successfully",
    //             data
    //         })
    //     }catch(err){
    //         console.log(err)
    //         res.json({
    //             code: 500,
    //             msg: err.message || "Error in updating data",
    //             data: []
    //         })
    //     }
    // }
    orderReportByProduct: async(req,res)=>{
        try{
            const data = await Order.findAll({
                where: {
                //   date: {
                //     [Sequelize.Op.between]: [startDate, endDate],
                //   },
                },
                attributes: [
                  'productId',
                  [Sequelize.fn('SUM', Sequelize.col('quantity')), 'totalQty'],
                  [Sequelize.fn('SUM', Sequelize.col('cost')), 'cost'],
                ],
                group: ['productId'],
                include: [
                  {
                    model: Product,
                    attributes: ['name'],
                  },
                ],
              });
            
              res.json(data);
            
        }catch(err){
            console.log(err)
            res.json({err})
        }
    }
    
    
}