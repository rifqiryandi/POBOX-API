let db = require('../config/db')

const getAllLokasi = async(res) => {
    try {
        let data = db.knex('lokasi')
        return await data
    } catch (error) {
        return res.status(400).json({
            'responCode': 400,
            'Msg': 'Error Model : ' + error.message
        })
    }
}

const getLokasiByKota = async(res, nama_kota) => {
    try {
        let data = db.knex('lokasi').where({ nama_kota: nama_kota })
        return await data
    } catch (error) {
        return res.status(400).json({
            'responCode': 400,
            'Msg': 'Error Model : ' + error.message
        })
    }
}

const inputLokasi = async(nama_kota, nama_kantor, gambar) => {
    let params = {
        nama_kota: nama_kota,
        nama_kantor: nama_kantor,
        gambar: gambar
    }
    let data = db.knex('lokasi').insert(params)
    return await data
}

module.exports = { getAllLokasi, getLokasiByKota, inputLokasi }