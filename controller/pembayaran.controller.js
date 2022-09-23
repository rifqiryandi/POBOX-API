// * util
let u_respon = require('../utils/respon.util')
let u_date = require('../utils/date.util')

// ? model
let m_pembayaran = require('../model/pembayaran.model')
let path = require('path');

function inputPembayaran(req, res, filepath, pemesanan_id) {
    try {
        if (!req.files) {
            return res.status(400).json({
                'responCode': 400,
                'Msg': 'Error Image: Harus Di Upload'
            })
        } else {
            let file = req.files.pymntImg
            const extensionName = path.extname(file.name);
            const allowedExtension = ['.png', '.jpg', '.jpeg'];
            if (!allowedExtension.includes(extensionName)) {
                return res.status(400).json({
                    'responCode': 400,
                    'Msg': 'Error Image: Invalid Image'
                })
            }
            const paths = filepath + u_date.dateNowCustom() + '-' + file.name;
            let foto_bukti = 'PYMNT-' + u_date.dateNowCustom() + '-' + file.name
            file.mv(paths, function(err) {
                if (err) {
                    console.log(err.message);
                } else {
                    let tanggal_pembayaran = u_date.dateNow()
                    let data = m_pembayaran.inputPembayaran(pemesanan_id, tanggal_pembayaran, foto_bukti)
                    u_respon.responCheck(data, res, 2)
                }
            })
        }

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

function getPembayaranByPemesanan(req, res) {
    try {
        let id = req.params['id']
        let data = m_pembayaran.getPembayaranByPemesanan(res, id)
        u_respon.responCheck(data, res, 1)
    } catch (error) {
        res.status(400).json({
            'responCode': 400,
            'Msg': 'Controller Error :' + error.message
        })
    }
}

module.exports = {
    inputPembayaran,
    getAllPembayaran,
    getPembayaranById,
    getPembayaranByPemesanan
}