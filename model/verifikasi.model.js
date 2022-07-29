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

const updateVerifikasi = async(id, status) => {

    let data = db.knex('verifikasi').where({ id: id }).update({ status: status })
    return await data

}

module.exports = { inputVerifikasi, getVerifikasiById, updateVerifikasi }