let db = require('../config/db')

const getAdmin = async(res, id) => {
    try {
        let data = db.knex('admin').where({ id: id })
        return await data
    } catch (error) {
        return res.status(400).json({
            'responCode': 400,
            'Msg': 'Error Model : ' + error.message
        })
    }
}

const getAdminByNippos = async(res, nippos) => {
    try {
        let data = db.knex('admin').where({
            nippos: nippos
        })
        return await data
    } catch (error) {
        return res.status(400).json({
            'responCode': 400,
            'Msg': 'Error Model : ' + error.message
        })
    }
}

const inputAdmin = async(nippos, nama, pin) => {
    let params = {
        id: nippos,
        nama: nama,
        pin: pin
    }
    let data = db.knex('admin').insert(params)
    return await data
}

module.exports = {
    getAdmin,
    inputAdmin,
    getAdminByNippos
}