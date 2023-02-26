const User = require("../models/User");
const { getPagination, getPagingData, formatResult } = require("../services/pagination");

module.exports = {
    create: async (req, res) => {
        try {
            const { name, phone, reporting_manager } = req.body;
            if (!name && !phone && !reporting_manager) {
                return res.json({
                    code: 400,
                    msg: "Missing required fields",
                    data: []
                })
            }
            const user = await User.create({
                name, phone, reporting_manager
            })
            res.json({
                code: 201,
                msg: "User saved successfully",
                data: user
            })
        } catch (err) {
            res.json({
                code: 500,
                msg: err.message || "Error in saving data",
                data: []
            })
        }
    },
    getAllUsers: async (req, res) => {
        try {
            const { page = 0, size = 10, ...searchParams } = req.query
            const { limit, offset } = getPagination(page, size);
            let where;
            let conditions = {
                where: where, distinct: true,
                order: [['id', 'DESC']],
            };
            if (size != '-1') {
                conditions['limit'] = limit;
                conditions['offset'] = offset;
            }
            const user = await User.findAndCountAll(conditions);
            const response = getPagingData(user, page, limit);
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
    deleteUser: async (req, res) => {
        try {
            let where = { id: req.params.id };
            let conditions = {
                where: { ...where }
            }
            const user = await User.findOne(conditions);
            if (!user) {
                return res.json({
                    code: 400,
                    msg: "User not found!",
                    data: [],
                })
            }
            const data = await User.destroy(conditions)
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
    updateUser: async (req, res) => {
        try {
            const { name, phone, reporting_manager } = req.body;
            let where = { id: req.params.id };
            let conditions = {
                where: { ...where }
            }
            const user = await User.findOne(conditions);
            if (!user) {
                return res.json({
                    code: 400,
                    msg: "User not found!",
                    data: [],
                })
            }
            const data = await User.update({
                name, phone, reporting_manager
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