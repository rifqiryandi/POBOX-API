// * util
let u_respon = require('../utils/respon.util')

// ? model
let m_produkfinal = require('../model/produkfinal.model')

function getAllProdukFinal(req, res) {
    try {
        let data = m_produkfinal.getAllProdukFinal(res)
        u_respon.responCheck(data, res)
    } catch (error) {
        res.status(400).json({
            'responCode': 400,
            'Msg': error.message
        })
    }
}

function getProdukFinal(req, res) {
    try {
        let id = req.body.id
        let data = m_produkfinal.getProdukFinal(res, id)
        u_respon.responCheck(data, res)
    } catch (error) {
        res.status(400).json({
            'responCode': 400,
            'Msg': error.message
        })
    }
}

function inputProdukFinal(req, res) {
    try {
        let produk_id = req.body.produk_id
        let add_on_id = req.body.add_on_id
        let total = req.body.total
        let data = m_produkfinal.inputProdukFinal(produk_id, add_on_id, total)
        u_respon.responCheck(data, res)
    } catch (error) {
        res.status(400).json({
            'responCode': 400,
            'Msg': error.message
        })
    }
}

function getNewProdukFinal(req, res) {
    try {
        let data = m_produkfinal.getNewProdukFinal(res)
        u_respon.responCheck(data, res)
    } catch (error) {
        res.status(400).json({
            'responCode': 400,
            'Msg': error.message
        })
    }
}

module.exports = { getAllProdukFinal, getProdukFinal, inputProdukFinal, getNewProdukFinal }