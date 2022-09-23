let db = require('../config/db')
var fs = require('fs');
let u_date = require('../utils/date.util');
let u_respon = require('../utils/respon.util');
const { verify } = require('crypto');

const getUser = async(res, no_hp) => {
    try {
        let data = db.knex('customer').where({ no_hp: no_hp })
        return await data
    } catch (error) {
        return res.status(400).json({
            'responCode': 400,
            'Msg': 'Error Model : ' + error.message
        })
    }
}

const getAllUser = async(res) => {
    try {
        let data = db.knex('customer').orderBy('id', 'desc')
        return await data
    } catch (error) {
        return res.status(400).json({
            'responCode': 400,
            'Msg': 'Error Model : ' + error.message
        })
    }
}

const inputUser = async(no_hp, nama, pin) => {
    let params = {
        no_hp: no_hp,
        nama: nama,
        email: null,
        pin: pin,
        verify: 0
    }
    let data = db.knex('customer').insert(params)
    return await data
}

const updateUser = async(id, nama, no_hp, email, pin) => {
    let params = {
        nama: nama,
        no_hp: no_hp,
        email: email,
        pin: pin
    }
    let data = db.knex('customer').where({ id: id }).update(params)
    return await data
}

const verifUser = async(id, verif) => {
    let params = {
        verify: verif
    }
    let data = db.knex('customer').where({
        id: id
    }).update(params)
    return await data
}

const updateKTP = async(id, foto_ktp) => {
    let params = { foto_ktp }
    let data = db.knex('customer').where({ id: id }).update(params)
    return await data
}

const deleteKtp = async(id) => {
    let params = {
        foto_ktp: null
    }
    let data = db.knex('customer').where({ id: id }).update(params)
    return await data
}
module.exports = {
    getUser,
    getAllUser,
    inputUser,
    updateUser,
    updateKTP,
    verifUser,
    deleteKtp
}