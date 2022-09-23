// * util
let u_respon = require('../utils/respon.util')
let u_date = require('../utils/date.util')

// ? model
let m_admin = require('../model/admin.model')

var Buffer = require('buffer/').Buffer;
const jwt = require('jsonwebtoken')
require('dotenv').config()

function loginAdmin(req, res) {
    try {
        let nippos = req.body.nippos
        let pin = req.body.pin
        let data = m_admin.getAdminByNippos(res, nippos)
        data.then((result) => {
            if (result[0] == undefined) {
                res.status(400).json({
                    'responCode': 400,
                    'Msg': 'NIPPOS ATAU PASSWORD SALAH'
                })
            } else {
                let buff = Buffer.from(pin, 'utf-8');
                // decode buffer as Base64
                let base64 = buff.toString('base64');
                if (base64 != result[0].pin) {
                    res.status(400).json({
                        'responCode': 400,
                        'Msg': 'PIN Salah'
                    })
                } else {
                    const user = {
                        nama: result[0].nama
                    }
                    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn: '120m'
                    })
                    res.status(200).json({
                        'responCode': 200,
                        'Msg': "Berhasil",
                        'accessToken': accessToken,
                        'data': result[0]
                    })
                }
            }
        })
    } catch (error) {
        res.status(400).json({
            'responCode': 400,
            'Msg': 'Controller Error :' + error.message
        })
    }
}

function getAdmin(req, res) {
    try {
        let id = req.body.nippos
        let data = m_admin.getAdmin(res, id)
        u_respon.responCheck(data, res)
    } catch (error) {
        res.status(400).json({
            'responCode': 400,
            'Msg': 'Controller Error :' + error.message
        })
    }

}

function inputAdmin(req, res) {
    try {
        let {
            nippos,
            nama,
            pin
        } = req.body
        let buff = Buffer.from(pin, 'utf-8');
        // decode buffer as Base64
        let base64 = buff.toString('base64');
        let data = m_admin.inputAdmin(nippos, nama, base64)
        u_respon.responCheck(data, res, 2)
    } catch (error) {
        res.status(400).json({
            'responCode': 400,
            'Msg': 'Controller Error :' + error.message
        })
    }
}

module.exports = {
    getAdmin,
    inputAdmin,
    loginAdmin
}