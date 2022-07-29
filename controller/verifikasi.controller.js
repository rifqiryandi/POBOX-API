// * util
let u_respon = require('../utils/respon.util')
let u_date = require('../utils/date.util')

// ? model
let m_verifikasi = require('../model/verifikasi.model')
let m_invoice = require('../model/invoice.model')


function inputVerifikasi(req, res) {
    try {
        let tanggal_verifikasi = u_date.dateNow()
        let {
            pembayaran_id,
            admin_id,
            status
        } = req.body

        let data = m_verifikasi.inputVerifikasi(pembayaran_id, tanggal_verifikasi, admin_id, status)
        u_respon.responCheck(data, res, 2)
    } catch (error) {
        res.status(400).json({
            'responCode': 400,
            'Msg': 'Controller Error :' + error.message
        })
    }
}

function getVerifikasiById(req, res) {
    try {
        let id = req.body.id
        let data = m_verifikasi.getVerifikasiById(res, id)
        u_respon.responCheck(data, res)
    } catch (error) {
        res.status(400).json({
            'responCode': 400,
            'Msg': 'Controller Error :' + error.message
        })
    }
}

function updateVerifikasi(req, res) {
    try {
        let {
            id,
            status
        } = req.body
        if (status == 1) {
            m_invoice.inputInvoice(id).then(() => {
                let data = m_verifikasi.updateVerifikasi(id, status)
                u_respon.responCheck(data, res, 2)
            })
        } else {
            let data = m_verifikasi.updateVerifikasi(id, status)
            u_respon.responCheck(data, res, 2)
        }
    } catch (error) {
        res.status(400).json({
            'responCode': 400,
            'Msg': 'Controller Error :' + error.message
        })
    }
}

module.exports = { inputVerifikasi, getVerifikasiById, updateVerifikasi }