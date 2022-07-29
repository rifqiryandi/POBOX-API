let db = require('../config/db')

const getAllAddon = async(res) => {
    try {
        let data = db.knex('add_on')
        return await data
    } catch (error) {
        return res.status(400).json({
            'responCode': 400,
            'Msg': 'Error Model : ' + error.message
        })
    }
}

const getAddon = async(res, id) => {
    try {
        let data = db.knex('add_on').where({ id: id })
        return await data
    } catch (error) {
        return res.status(400).json({
            'responCode': 400,
            'Msg': 'Error Model : ' + error.message
        })
    }
}

const inputAddon = async(nama, harga) => {
    try {
        let params = {
            nama: nama,
            harga: harga
        }
        let data = db.knex('add_on').insert(params)
        return await data
    } catch (error) {
        return res.status(400).json({
            'responCode': 400,
            'Msg': 'Error Model : ' + error.message
        })
    }
}

const updateAddon = async(nama, harga, id) => {
    try {
        let params = {
            nama: nama,
            harga: harga
        }
        let data = db.knex('add_on').where({ id: id }).update(params)
        return await data
    } catch (error) {
        return res.status(400).json({
            'responCode': 400,
            'Msg': 'Error Model : ' + error.message
        })
    }
}

module.exports = {
    getAllAddon,
    getAddon,
    inputAddon,
    updateAddon
}