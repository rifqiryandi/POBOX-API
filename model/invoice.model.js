let db = require('../config/db')

const getInvoice = async(res, id, idPemesanan) => {
    try {
        let params = {
            id: id,
            idPemesanan: idPemesanan
        }
        let data = db.knex.raw('SELECT DISTINCT pe.*,l.nama_kantor, v.status, p.tanggal_pembayaran FROM invoice i JOIN verifikasi v ON v.id = i.verifikasi_id JOIN pembayaran p ON p.id = v.pembayaran_id JOIN admin a ON a.id = v.admin_id JOIN pemesanan pe ON pe.id = p.pemesanan_id JOIN lokasi l ON l.id = pe.lokasi_id JOIN customer c ON c.id = pe.customer_id JOIN produk pr ON pr.id = pe.produk_id JOIN produkfinal pf ON pr.id = pf.produk_id JOIN add_on ad ON ad.id = pf.add_on_id WHERE c.id = :id AND pe.id = :idPemesanan ', params)
        return await data
    } catch (error) {
        return res.status(400).json({
            'responCode': 400,
            'Msg': 'Error Model : ' + error.message
        })
    }
}

const getProdukAndAddon = async(res, id, idPemesanan) => {
    try {
        let params = {
            id: id,
            idPemesanan: idPemesanan
        }
        let data = db.knex.raw('SELECT DISTINCT pr.produk,pr.harga as harga_produk , ad.nama,ad.harga as harga_addon FROM invoice i JOIN verifikasi v ON v.id = i.verifikasi_id JOIN pembayaran p ON p.id = v.pembayaran_id JOIN admin a ON a.id = v.admin_id JOIN pemesanan pe ON pe.id = p.pemesanan_id JOIN lokasi l ON l.id = pe.lokasi_id JOIN customer c ON c.id = pe.customer_id JOIN produk pr ON pr.id = pe.produk_id JOIN produkfinal pf ON pr.id = pf.produk_id JOIN add_on ad ON ad.id = pf.add_on_id WHERE c.id = :id AND pe.id = :idPemesanan ', params)
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

module.exports = {
    getInvoice,
    inputInvoice,
    getAllInvoice,
    getProdukAndAddon
}