let db = require('../config/db')

const inputPemesanan = async(customer_id, tanggal_pemesanan, alamat_pemesanan, durasi_sewa, satuan_durasi_sewa, lokasi_id, produk_id, kustomisasi_nama, total_harga) => {
    let params = {
        customer_id: customer_id,
        tanggal_pemesanan: tanggal_pemesanan,
        alamat_pemesanan: alamat_pemesanan,
        durasi_sewa: durasi_sewa,
        satuan_durasi_sewa: satuan_durasi_sewa,
        lokasi_id: lokasi_id,
        produk_id: produk_id,
        kustomisasi_nama: kustomisasi_nama,
        totalharga: total_harga
    }
    let data = db.knex('pemesanan').insert(params)
    return await data
}

// const transPemesanan = async() => {
//     let paramsProdukFinal = {
//         produk_id: produk_id,
//         add_on_id: add_on_id,
//         total: total
//     }
//     const trx = await db.knex.transaction();
//     trx('produkfinal').insert(paramsProdukFinal)
// }

module.exports = { inputPemesanan }