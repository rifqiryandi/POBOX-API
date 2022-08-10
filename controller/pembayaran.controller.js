// * util
let u_respon = require('../utils/respon.util')
let u_date = require('../utils/date.util')

// ? model
let m_pembayaran = require('../model/pembayaran.model')

function inputPembayaran(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({
                'responCode': 400,
                'Msg': 'Error Image: Harus Di Upload'
            })
        }
        let tanggal_pembayaran = u_date.dateNow()
        let {
            pemesanan_id
        } = req.body
        let foto_bukti = req.file.path
        let data = m_pembayaran.inputPembayaran(pemesanan_id, tanggal_pembayaran, foto_bukti)
        u_respon.responCheck(data, res, 2)
    } catch (error) {
        res.status(400).json({
            'responCode': 400,
            'Msg': 'Controller Error :' + error.message
        })
    }
}

function getAllPembayaran(req, res) {
    try {
        let data = m_pembayaran.getAllPembayaran(res)
        u_respon.responCheck(data, res)
    } catch (error) {
        res.status(400).json({
            'responCode': 400,
            'Msg': 'Controller Error :' + error.message
        })
    }
}

function getPembayaranById(req, res) {
    try {
        let id = req.body.id
        let data = m_pembayaran.getPembayaranById(res, id)
        u_respon.responCheck(data, res)
    } catch (error) {
        res.status(400).json({
            'responCode': 400,
            'Msg': 'Controller Error :' + error.message
        })
    }
}

module.exports = { inputPembayaran, getAllPembayaran, getPembayaranById }