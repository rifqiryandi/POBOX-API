let db = require('../config/db')

const getAllProdukFinal = async(res) => {
    try {
        let data = db.knex('produkfinal')
        return await data
    } catch (error) {
        return res.status(400).json({
            'responCode': 400,
            'Msg': 'Error Model : ' + error.message
        })
    }
}

const getProdukFinal = async(res, id) => {
    try {
        let data = db.knex('produkfinal').where({
            id: id
        })
        return await data
    } catch (error) {
        return res.status(400).json({
            'responCode': 400,
            'Msg': 'Error Model : ' + error.message
        })
    }
}

const getNewProdukFinal = async(res) => {
    try {
        let data = db.knex.raw('SELECT pf.* FROM produkfinal pf ORDER BY pf.id DESC')
        return await data
    } catch (error) {
        return res.status(400).json({
            'responCode': 400,
            'Msg': 'Error Model : ' + error.message
        })
    }
}

const inputProdukFinal = async(produk_id, add_on_id, total) => {
    let params = {
        produk_id: produk_id,
        add_on_id: add_on_id,
        total: total
    }
    let data = db.knex('produkfinal').insert(params)
    return await data

}

module.exports = { getAllProdukFinal, getProdukFinal, inputProdukFinal, getNewProdukFinal }