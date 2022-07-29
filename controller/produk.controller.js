// * util
let u_respon = require('../utils/respon.util')

// ? model
let m_produk = require('../model/produk.model')

function getAllProduk(req, res) {
    try {
        let data = m_produk.getAllProduk(res)
        u_respon.responCheck(data, res)
    } catch (error) {
        res.status(400).json({
            'responCode': 400,
            'Msg': error.message
        })
    }
}

function getProduk(req, res) {
    try {
        let id = req.body.id
        let data = m_produk.getProduk(res, id)
        u_respon.responCheck(data, res)
    } catch (error) {
        res.status(400).json({
            'responCode': 400,
            'Msg': error.message
        })
    }
}

function inputProduk(req, res) {
    try {
        let produk = req.body.produk
        let harga = req.body.harga

        let data = m_produk.inputProduk(produk, harga)
        u_respon.responCheck(data, res, 2)
    } catch (error) {
        res.status(400).json({
            'responCode': 400,
            'Msg': error.message
        })
    }
}

function updateProduk(req, res) {
    try {
        let produk = req.body.produk
        let harga = req.body.harga
        let id = req.body.id

        let data = m_produk.updateProduk(produk, harga, id)
        u_respon.responCheck(data, res, 2)
    } catch (error) {
        res.status(400).json({
            'responCode': 400,
            'Msg': error.message
        })
    }
}

module.exports = { getAllProduk, getProduk, inputProduk, updateProduk }