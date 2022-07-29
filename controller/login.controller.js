//*jsonwebtoken
const jwt = require('jsonwebtoken')
require('dotenv').config()

const axios = require('axios');
const https = require('https');
var Buffer = require('buffer/').Buffer;
let m_user = require('../model/user.model')

//?login
function newlogin(req, res) {
    try {
        // At request level
        const agent = new https.Agent({
            rejectUnauthorized: false
        });

        var config = {
            method: 'post',
            url: 'https://psis.posindonesia.co.id/POS-SSO/token',
            headers: {
                'Authorization': 'Basic ZGV2LXN1cHBvcnRAcG9zaW5kb25lc2lhLmNvLmlkOmRldlN1cHAwcnQh'
            },
            httpsAgent: agent
        };
        axios(config)
            .then(function(response) {
                let nippos = req.headers.nippos
                let password = req.headers.password
                let nippass = nippos + ":" + password;
                // create a buffer
                let buff = Buffer.from(nippass, 'utf-8');
                // decode buffer as Base64
                let base64 = buff.toString('base64');
                let configLogin = {
                    method: 'post',
                    url: 'https://psis.posindonesia.co.id/POS-SSO/1.1.0/auth/login',
                    headers: {
                        'X-POS-Key': 'c3VwcG9ydA==c2l1eVNuWm45Tg==',
                        'X-POS-Auth': base64,
                        'Authorization': 'Bearer ' + response.data.access_token
                    },
                    httpsAgent: agent
                };

                axios(configLogin)
                    .then((respons) => {
                        if (respons.data.success == true) {
                            let data = m_user.getUser(nippos)
                            data.then((result) => {
                                const user = { nippos: result[0].NIPPOS }
                                const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '120m' })
                                res.status(200).json({
                                    'responCode': 200,
                                    'Msg': "Berhasil",
                                    'accessToken': accessToken,
                                    'data': result[0]
                                })
                            }).catch((err) => {
                                res.status(400).json({
                                    'responCode': 400,
                                    'Msg': err.message
                                })
                            });
                        } else if (respons.data.fault) {
                            res.status(400).json({
                                'responCode': 400,
                                'Msg': respons.data.fault.message
                            })
                        }
                    })
                    .catch((error) => {
                        res.status(400).json({
                            'responCode': 400,
                            'Msg': error.message
                        })
                        console.log(error.response.data);
                    });
            })
            .catch(function(error) {
                res.status(400).json({
                    'responCode': 400,
                    'Msg': error.message
                })
            });
    } catch (error) {
        res.status(400).json({
            'responCode': 400,
            'Msg': error.message
        })

    }
}

function login(req, res) {
    try {
        let nohp = req.headers.nohp
        let pin = req.headers.pin
        let data = m_user.getUser(res, nohp)
        data.then((result) => {
            if (result[0] == undefined) {
                res.status(400).json({
                    'responCode': 400,
                    'Msg': 'No Hp Tidak Terdaftar'
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
                        no_hp: result[0].no_hp
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
        }).catch((err) => {

        });
    } catch (error) {
        res.status(400).json({
            'responCode': 400,
            'Msg': error.message
        })
    }
}

module.exports = {
    newlogin,
    login
}