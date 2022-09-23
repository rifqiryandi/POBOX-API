let db = require('../config/db')

const inputPembayaran = async(pemesanan_id, tanggal_pembayaran, foto_bukti) => {

    let params = {
        pemesanan_id: pemesanan_id,
        tanggal_pembayaran: tanggal_pembayaran,
        foto_bukti: foto_bukti
    }
    let data = db.knex('pembayaran').insert(params)
    return await data

}
const getAllPembayaran = async(res) => {
    try {
        let data = db.knex('pembayaran')
        return await data
    } catch (error) {
        return res.status(400).json({
            'responCode': 400,
            'Msg': 'Error Model : ' + error.message
        })
    }
}

const getPembayaranById = async(res, id) => {
    try {
        let data = db.knex('pembayaran').where({ id: id })
        return await data
    } catch (error) {
        return res.status(400).json({
            'responCode': 400,
            'Msg': 'Error Model : ' + error.message
        })
    }
}

const getPembayaranByPemesanan = async(res, id) => {
    try {
        let params = {
            id_pemesanan: id
        }
        let data = db.knex.raw('select p.foto_bukti, p.id  from pembayaran p join pemesanan p2 on p.pemesanan_id  = p2.id where p.pemesanan_id = :id_pemesanan ', params)
        return await data

    } catch (error) {
        return res.status(400).json({
            'responCode': 400,
            'Msg': 'Error Model : ' + error.message
        })
    }
}

module.exports = {
    inputPembayaran,
    getAllPembayaran,
    getPembayaranById,
    getPembayaranByPemesanan
}