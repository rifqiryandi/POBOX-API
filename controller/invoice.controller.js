// * util
let u_respon = require('../utils/respon.util')

// ? model
let m_invoice = require('../model/invoice.model')

function inputInvoice(req, res) {
    try {
        let verifikasi_id = req.body.verifikasi_id
        let data = m_invoice.inputInvoice(verifikasi_id)
        u_respon.responCheck(data, res, 2)
    } catch (error) {
        res.status(400).json({
            'responCode': 400,
            'Msg': 'Error Controller :' + error.message
        })
    }
}

function getInvoice(req, res) {
    try {
        let id = req.headers.id
        let id_pemesanan = req.headers.idpemesanan
        let data = m_invoice.getInvoice(res, id, id_pemesanan)
        u_respon.responCheck(data, res, 1)
    } catch (error) {
        res.status(400).json({
            'responCode': 400,
            'Msg': 'Error Controller :' + error.message
        })
    }
}

function getProdukAndAddon(req, res) {
    try {
        let id = req.headers.id
        let id_pemesanan = req.headers.idpemesanan

        let data = m_invoice.getProdukAndAddon(res, id, id_pemesanan)
        u_respon.responCheck(data, res, 1)
    } catch (error) {
        res.status(400).json({
            'responCode': 400,
            'Msg': 'Error Controller :' + error.message
        })
    }
}

function getAllInvoice(req, res) {
    try {
        let data = m_invoice.getAllInvoice(res)
        u_respon.responCheck(data, res)
    } catch (error) {
        res.status(400).json({
            'responCode': 400,
            'Msg': 'Error Controller :' + error.message
        })
    }
}

module.exports = {
    inputInvoice,
    getInvoice,
    getAllInvoice,
    getProdukAndAddon
}