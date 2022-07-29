let db = require('../config/db')

const getInvoice = async(res) => {
    try {
        let data = db.knex.raw('SELECT i.id,pe.id,l.nama,pe.kustomisasi_nama,pro.harga,ad.harga,pe.totalharga FROM invoice i JOIN verifikasi v ON i.verifikasi_id = v.id JOIN admin a ON a.id = v.admin_id JOIN pembayaran p ON p.id = v.pembayaran_id JOIN pemesanan pe ON pe.id = p.pemesanan_id JOIN customer c ON c.id = pe.customer_id JOIN lokasi l ON l.id = pe.lokasi_id JOIN produkfinal pr ON pr.produk_id = pe.produk_id JOIN produk pro ON pro.id = pr.produk_id JOIN add_on ad ON ad.id = pr.add_on_id ')
        return await data
    } catch (error) {
        return res.status(400).json({
            'responCode': 400,
            'Msg': 'Error Model : ' + error.message
        })
    }
}

const getAllInvoice = async(res) => {
    try {
        let data = db.knex('invoice')
        return await data
    } catch (error) {
        return res.status(400).json({
            'responCode': 400,
            'Msg': 'Error Model : ' + error.message
        })
    }
}

const inputInvoice = async(verifikasi_id) => {
    let params = {
        verifikasi_id: verifikasi_id
    }
    let data = db.knex('invoice').insert(params)
    return await data
}

module.exports = { getInvoice, inputInvoice, getAllInvoice }