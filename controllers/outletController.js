const Order = require("../models/Order");
const Outlet = require("../models/Outlet");
const { getPagination, getPagingData, formatResult } = require("../services/pagination");

module.exports = {
    create: async (req, res) => {
        try {
            const { outlet_name, outlet_phone, address } = req.body;
            if (!outlet_name && !outlet_phone && !address) {
                return res.json({
                    code: 400,
                    msg: "Missing required fields",
                    data: []
                })
            }
            const outlet = await Outlet.create({
                outlet_name, outlet_phone, address
            })
            res.json({
                code: 201,
                msg: "Outlet saved successfully",
                data: outlet
            })
        } catch (err) {
            res.json({
                code: 500,
                msg: err.message || "Error in saving data",
                data: []
            })
        }
    },
    getAllOutlet: async (req, res) => {
        try {
            const { page = 0, size = 10, ...searchParams } = req.query
            const { limit, offset } = getPagination(page, size);
            let where;
            let conditions = {
                where: where, distinct: true,
                order: [['outlet_id', 'DESC']],
            };
            if (size != '-1') {
                conditions['limit'] = limit;
                conditions['offset'] = offset;
            }
            const outlet = await Outlet.findAndCountAll(conditions);
            const response = getPagingData(outlet, page, limit);
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
    deleteOutlet: async (req, res) => {
        try {
            let where = { outlet_id: req.params.outlet_id };
            let conditions = {
                where: { ...where }
            }
            const outlet = await Outlet.findOne(conditions);
            if (!outlet) {
                return res.json({
                    code: 400,
                    msg: "Outlet not found!",
                    data: [],
                })
            }
            const data = await Outlet.destroy(conditions)
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
    updateOutlet: async (req, res) => {
        try {
            const { outlet_name, outlet_phone, address } = req.body;
            let where = { outlet_id: req.params.outlet_id };
            let conditions = {
                where: { ...where }
            }
            const outlet = await Outlet.findOne(conditions);
            if (!outlet) {
                return res.json({
                    code: 400,
                    msg: "Outlet not found!",
                    data: [],
                })
            }
            const data = await Outlet.update({
                outlet_name, outlet_phone, address
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
    
}