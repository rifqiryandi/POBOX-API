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
            'Msg': 'Error Controller :' + error.message
        })
    }
}

function checkProduk(req, res) {
    try {
        let id = req.body.id
        let data = m_produk.getProduk(res, id)
        data.then((result) => {
            let jenisProduk = result[0].produk
            let arrProduk = jenisProduk.split(' ')

            if (arrProduk[0] == 'Enterprise') {
                res.status(200).json({
                    'responCode': 200,
                    'Msg': 'Jenis Produk :' + arrProduk[0],
                    'Data': { 'status': false }
                })
            } else {
                res.status(200).json({
                    'responCode': 200,
                    'Msg': 'Jenis Produk :' + arrProduk[0],
                    'Data': { 'status': true }
                })
            }
        }).catch((err) => {
            res.status(400).json({
                'responCode': 400,
                'Msg': error.message
            })
        });
    } catch (error) {
        res.status(400).json({
            'responCode': 400,
            'Msg': error.message
        })
    }
}

function getProduk(req, res) {
    try {
        let id = req.headers.id
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

module.exports = { getAllProduk, getProduk, inputProduk, updateProduk, checkProduk }