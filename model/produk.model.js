let db = require('../config/db')

const getAllProduk = async(res) => {
    try {
        let data = db.knex('produk')
        return await data
    } catch (error) {
        return res.status(400).json({
            'responCode': 400,
            'Msg': 'Error Model : ' + error.message
        })
    }
}

const getProduk = async(res, id) => {
    try {
        let data = db.knex('produk').where({ id: id })
        return await data
    } catch (error) {
        return res.status(400).json({
            'responCode': 400,
            'Msg': 'Error Model : ' + error.message
        })
    }
}

const inputProduk = async(produk, harga) => {
    try {
        let params = {
            produk: produk,
            harga: harga
        }
        let data = db.knex('produk').insert(params)
        return await data
    } catch (error) {
        return res.status(400).json({
            'responCode': 400,
            'Msg': 'Error Model : ' + error.message
        })
    }
}

const updateProduk = async(produk, harga, id) => {
    try {
        let params = {
            produk: produk,
            harga: harga
        }
        let data = db.knex('produk').where({ id: id }).update(params)
        return await data
    } catch (error) {
        return res.status(400).json({
            'responCode': 400,
            'Msg': 'Error Model : ' + error.message
        })
    }
}

module.exports = { getAllProduk, getProduk, inputProduk, updateProduk }