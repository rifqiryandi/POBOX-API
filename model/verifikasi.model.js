let db = require('../config/db')

const inputVerifikasi = async(pembayaran_id, tanggal_verifikasi, admin_id, status) => {

    let params = {
        pembayaran_id: pembayaran_id,
        tanggal_verifikasi: tanggal_verifikasi,
        admin_id: admin_id,
        status: status
    }
    let data = db.knex('verifikasi').insert(params)
    return await data

}

const getVerifikasiById = async(res, id) => {
    try {
        let data = db.knex('verifikasi').where({ id: id })
        return await data
    } catch (error) {
        return res.status(400).json({
            'responCode': 400,
            'Msg': 'Error Model : ' + error.message
        })
    }
}

const getVerifikasiByPemesanan = async(res, id) => {
    try {
        let params = { id_pemesanan: id }
        let data = db.knex.raw('select * from verifikasi v join pembayaran p on v.pembayaran_id  = p.id join pemesanan p2 on p2.id = p.pemesanan_id where p2.id = :id_pemesanan ', params)
        return await data
    } catch (error) {
        return res.status(400).json({
            'responCode': 400,
            'Msg': 'Error Model : ' + error.message
        })
    }
}

const updateVerifikasi = async(id, status) => {

    let data = db.knex('verifikasi').where({ id: id }).update({ status: status })
    return await data

}

module.exports = {
    inputVerifikasi,
    getVerifikasiById,
    updateVerifikasi,
    getVerifikasiByPemesanan
}