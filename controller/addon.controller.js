// * util
let u_respon = require('../utils/respon.util')

// ? model
let m_addon = require('../model/addon.model')

function getAllAddon(req, res) {
    try {
        let data = m_addon.getAllAddon(res)
        u_respon.responCheck(data, res)
    } catch (error) {
        res.status(400).json({
            'responCode': 400,
            'Msg': error.message
        })
    }
}

function getAddon(req, res) {
    try {
        let id = req.body.id
        let data = m_addon.getAddon(res, id)
        u_respon.responCheck(data, res)
    } catch (error) {
        res.status(400).json({
            'responCode': 400,
            'Msg': error.message
        })
    }
}

function inputAddon(req, res) {
    try {
        let nama = req.body.nama
        let harga = req.body.harga

        let data = m_addon.inputAddon(nama, harga)
        u_respon.responCheck(data, res, 2)
    } catch (error) {
        res.status(400).json({
            'responCode': 400,
            'Msg': error.message
        })
    }
}

function updateAddon(req, res) {
    try {
        let nama = req.body.nama
        let harga = req.body.harga
        let id = req.body.id

        let data = m_addon.updateAddon(nama, harga, id)
        u_respon.responCheck(data, res, 2)
    } catch (error) {
        res.status(400).json({
            'responCode': 400,
            'Msg': error.message
        })
    }
}

module.exports = {
    getAllAddon,
    getAddon,
    inputAddon,
    updateAddon
}