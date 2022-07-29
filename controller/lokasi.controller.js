// * util
let u_respon = require('../utils/respon.util')

// ? model
let m_lokasi = require('../model/lokasi.model')

function getAllLokasi(req, res) {
    try {
        let data = m_lokasi.getAllLokasi(res)
        u_respon.responCheck(data, res)
    } catch (error) {
        res.status(400).json({
            'responCode': 400,
            'Msg': error.message
        })
    }

}

function getLokasiByKota(req, res) {
    try {
        let nama_kota = req.body.nama_kota
        let data = m_lokasi.getLokasiByKota(res, nama_kota)
        u_respon.responCheck(data, res)
    } catch (error) {
        res.status(400).json({
            'responCode': 400,
            'Msg': 'Error Controller :' + error.message
        })
    }
}

function inputLokasi(req, res) {
    try {
        let nama_kota = req.body.nama_kota
        let nama_kantor = req.body.nama_kantor
        let gambar = req.body.gambar

        let data = m_lokasi.inputLokasi(nama_kota, nama_kantor, gambar)
        u_respon.responCheck(data, res, 2)
    } catch (error) {
        res.status(400).json({
            'responCode': 400,
            'Msg': 'Error Controller :' + error.message
        })
    }
}

module.exports = { getAllLokasi, getLokasiByKota, inputLokasi }