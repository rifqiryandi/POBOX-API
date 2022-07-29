// * util
let u_respon = require('../utils/respon.util')
let u_date = require('../utils/date.util')

// ? model
let m_user = require('../model/user.model')

const axios = require('axios');
var Buffer = require('buffer/').Buffer;
const fs = require('fs');
let path = require('path');

const qrcode = require('qrcode-terminal');
const {
    Client,
    LocalAuth
} = require('whatsapp-web.js');
const SESSION_FILE_PATH = './otp-session.json';
const client = new Client({
    puppeteer: {
        headless: true
    },
    authStrategy: new LocalAuth({
        clientId: "client-one"
    })
});




function getUser(req, res) {
    try {
        let no_hp = req.body.no_hp
        let data = m_user.getUser(res, no_hp)
        u_respon.responCheck(data, res)
    } catch (error) {
        return res.status(400).json({
            'responCode': 400,
            'Msg': 'Error Controller:' + error.message
        })
    }
}

function getAllUser(req, res) {
    try {
        let data = m_user.getAllUser(res)
        u_respon.responCheck(data, res)
    } catch (error) {
        return res.status(400).json({
            'responCode': 400,
            'Msg': 'Error Controller:' + error.message
        })
    }
}

function inputUser(req, res) {
    try {
        let no_hp = req.body.no_hp
        let nama = req.body.nama
        let pin = req.body.pin
        let buff = Buffer.from(pin, 'utf-8');
        // decode buffer as Base64
        let base64 = buff.toString('base64');

        let data = m_user.inputUser(no_hp, nama, base64)
        u_respon.responCheck(data, res, 2)
    } catch (error) {
        return res.status(400).json({
            'responCode': 400,
            'Msg': 'Error Controller:' + error.message
        })
    }
}

function checkUser(req, res) {
    try {
        let no_hp = req.body.no_hp
        m_user.getUser(res, no_hp).then((result) => {
            if (result.length != 0) {
                return res.status(200).json({
                    'responCode': 200,
                    'Msg': true,
                    'Data': 'User Ada'
                })
            } else {
                return res.status(200).json({
                    'responCode': 200,
                    'Msg': false,
                    'Data': null,
                    'WaStatus': 'Client is ready!!'
                })

            }
        }).catch((err) => {

        });

    } catch (error) {
        return res.status(400).json({
            'responCode': 400,
            'Msg': 'Error Controller:' + err.message
        })
    }
}

function OTPcheck(req, res) {
    try {
        fs.readFile('otp-session.json', (err, data) => {
            if (err) throw err;
            let sessionData = JSON.parse(data);
            if (sessionData == req.body.otp) {
                return res.status(200).json({
                    'responCode': 200,
                    'Msg': 'Kode OTP BENAR'
                })
            } else {
                return res.status(400).json({
                    'responCode': 400,
                    'Msg': 'Kode OTP SALAH'
                })
            }
        });


    } catch (error) {
        return res.status(400).json({
            'responCode': 400,
            'Msg': 'Error Controller:' + error.message
        })
    }
}

function updateUser(req, res) {
    try {
        let id = req.body.id
        let nama = req.body.nama
        let no_hp = req.body.no_hp
        let email = req.body.email
        let pin = req.body.pin
        let buff = Buffer.from(pin, 'utf-8');
        // decode buffer as Base64
        let base64 = buff.toString('base64');
        let data = m_user.updateUser(id, nama, no_hp, email, base64)
        u_respon.responCheck(data, res, 2)
    } catch (error) {
        return res.status(400).json({
            'responCode': 400,
            'Msg': 'Error Controller:' + error.message
        })
    }
}

module.exports = {
    getUser,
    getAllUser,
    inputUser,
    checkUser,
    OTPcheck,
    updateUser
}