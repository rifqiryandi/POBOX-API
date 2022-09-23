// * util
let u_respon = require('../utils/respon.util')
let u_date = require('../utils/date.util')

// ? model
let m_pemesanan = require('../model/pemesanan.model')
let m_produkfinal = require('../model/produkfinal.model')

function inputPemesanan(req, res) {
    try {
        let satuan_durasi_sewa = req.body.satuan_durasi_sewa
        let customer_id = req.body.customer_id
        let tanggal_pemesanan = u_date.dateNow()
        let alamat_pemesanan = req.body.alamat_pemesanan
        let durasi_sewa = req.body.durasi_sewa
        let lokasi_id = req.body.lokasi_id
        let kustomisasi_nama = req.body.kustomisasi_nama

        // Produk Final
        let add_on_id = ((req.body.add_on_id != 0) ? req.body.add_on_id : 1)
        let produk_id = req.body.produk_id
        let harga_add_on = ((req.body.harga_add_on != 0) ? req.body.harga_add_on : 0)
        let nama_produk = req.body.nama_produk
        let harga, total_harga, harga_produk;
        if (nama_produk == 'Enterprise') {
            if (satuan_durasi_sewa == 'Month') {
                harga_produk = 250000
            } else if (satuan_durasi_sewa == 'year') {
                harga_produk = 2000000
            }
        } else if (nama_produk == 'Reguler') {
            if (satuan_durasi_sewa == 'Month') {
                harga_produk = 20000
            } else if (satuan_durasi_sewa == 'year') {
                harga_produk = 120000
            }
        }
        // kalkulasi
        if (add_on_id != 1) {
            let total = parseInt(harga_produk) + parseInt(harga_add_on)
            m_produkfinal.inputProdukFinal(produk_id, add_on_id, total).then((result) => {
                harga = parseInt(harga_produk) * parseInt(durasi_sewa)
                total_harga = parseInt(harga) + parseInt(harga_add_on)
                let data = m_pemesanan.inputPemesanan(customer_id, tanggal_pemesanan, alamat_pemesanan, durasi_sewa, satuan_durasi_sewa, lokasi_id, produk_id, kustomisasi_nama, total_harga)
                u_respon.responCheck(data, res, 2)
            })
        } else {
            total_harga = parseInt(harga_produk) * parseInt(durasi_sewa)
            m_produkfinal.inputProdukFinal(produk_id, 1, harga_produk).then((result) => {
                let data = m_pemesanan.inputPemesanan(customer_id, tanggal_pemesanan, alamat_pemesanan, durasi_sewa, satuan_durasi_sewa, lokasi_id, produk_id, kustomisasi_nama, total_harga)
                u_respon.responCheck(data, res, 2)
            })
        }

    } catch (error) {
        res.status(400).json({
            'responCode': 400,
            'Msg': 'Controller Error :' + error.message
        })
    }
}

function getPemesananByCustomer(req, res) {
    try {
        let customer_id = req.params['customer_id']
        let data = m_pemesanan.getPemesananByCustomer(res, customer_id)
        u_respon.responCheck(data, res)
    } catch (error) {
        res.status(400).json({
            'responCode': 400,
            'Msg': 'Controller Error :' + error.message
        })
    }
}

function getAllPemesanan(req, res) {
    try {
        let data = m_pemesanan.getAllPemesanan(res)
        u_respon.responCheck(data, res, 1)
    } catch (error) {
        res.status(400).json({
            'responCode': 400,
            'Msg': 'Controller Error :' + error.message
        })
    }
}

function putPemesananBox(req, res) {
    try {
        let id = req.body.id
        let numBox = req.body.numBox

        let data = m_pemesanan.putPemesananBox(id, numBox)
        u_respon.responCheck(data, res, 2)
    } catch (error) {
        res.status(400).json({
            'responCode': 400,
            'Msg': 'Controller Error :' + error.message
        })
    }
}

module.exports = {
    inputPemesanan,
    getPemesananByCustomer,
    getAllPemesanan,
    putPemesananBox
}