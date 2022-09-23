// * express 
const express = require('express');
require('express-group-routes');
const app = express()
const port = 4000
const host = 'localhost'

// ? body-parser
let bodyParser = require('body-parser')

//!controller and middleware
let mid = require('./middleware/authtoken.middleware')
let c_login = require('./controller/login.controller')
let c_user = require('./controller/user.controller')
let c_lokasi = require('./controller/lokasi.controller')
let c_produk = require('./controller/produk.controller')
let c_addon = require('./controller/addon.controller')
let c_produkfinal = require('./controller/produkfinal.controller')
let c_pemesanan = require('./controller/pemesanan.controller')
let c_pembayaran = require('./controller/pembayaran.controller')
let c_verifikasi = require('./controller/verifikasi.controller')
let c_invoice = require('./controller/invoice.controller')
let c_admin = require('./controller/admin.controller')

//!controller and middleware
// ? WA
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

// ? WA

// ? UTIL
const u_date = require('./utils/date.util')

const fs = require('fs');
let path = require('path');
let upload = require('express-fileupload')
    // const multer = require('multer');
const SESSION_FILE_PATH = './otp-session.json';

// const fileStorageKtp = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/')
//     },
//     filename: (req, file, cb) => {
//         cb(null, u_date.dateNowCustom() + '-' + file.originalname)
//     }
// })

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// }

const client = new Client({
    puppeteer: { headless: true },
    authStrategy: new LocalAuth({
        clientId: "client-one"
    })
});

app.use([
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json(),
    upload({
        createParentPath: true,
    })
])
app.use('/ktpImg', express.static(path.join(__dirname, 'upload/KTP/')))
app.use('/pymntImg', express.static(path.join(__dirname, 'upload/PYMNT')))

// app.use(multer({ storage: fileStorageKtp, fileFilter: fileFilter }).single('image'))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// * upload ktp and pembayaran
app.post('/upload/:id', (req, res) => {
    let filepath = __dirname + "/upload/KTP/ktp-"
    c_user.updateKTP(req, res, filepath, req.params['id'])
})

// ? POST AND PUT PEMBAYARAN 
app.post('/inputPembayaran/:id', (req, res) => {
    let filepath = __dirname + "/upload/PYMNT/PYMNT-"
    c_pembayaran.inputPembayaran(req, res, filepath, req.params['id'])
})

// * upload ktp and pembayaran


// ? OTP
app.post('/OTPcheck', (req, res) => { c_user.OTPcheck(req, res) }).on('error', function(e) { console.log('error:' + e.message); })

// ? Check USER
app.get('/checkUser', (req, res) => {
    if (fs.existsSync(SESSION_FILE_PATH)) {
        fs.unlink(path.join(__dirname, 'otp-session.json'), (err) => {
            if (err) throw err;
        });
    }
    c_user.checkUser(req, res)
})

// ? WA
app.get('/linkACCwhatsapp', (req, res) => {

    client.on('qr', qr => {
        qrcode.generate(qr, { small: true });
    });

    client.on('authenticated', (session) => {
        console.log('WHATSAPP WEB => Authenticated');
    });

    client.on('ready', () => {
        return res.status(200).json({
            'responCode': 200,
            'WaStatus': 'Client is ready!!'
        })
    });
    client.on('message', message => {
        // CUSTOM NUMBER
        let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        let shuff = arr.sort(() => Math.random() - 0.5)
        let val = shuff.splice(1, 6);
        let str = val.toString();
        let otp = str.replace(/[^\w\s]/gi, '')

        // session
        fs.writeFile(SESSION_FILE_PATH, JSON.stringify(otp), (err) => {
            if (err) {
                console.error(err);
            }
        });
        if (message.body === 'Req OTP POBOX') {
            message.reply('POBOX OTP :' + otp);
        }
    });
    client.initialize();
})

// ? WA

app.post('/regis', (req, res) => { c_user.regisUser(req, res) })
app.get('/getUser', (req, res) => { c_user.getUser(req, res) })
app.post('/inputUser', (req, res) => { c_user.inputUser(req, res) })
app.get('/login', (req, res) => { c_login.login(req, res) })

app.group("/api_pobox/", (router) => {

    //!middleware
    router.use(mid.authToken);

    //*user
    router.get('/getAllUser', (req, res) => { c_user.getAllUser(req, res) })
    router.put('/updateUser', (req, res) => { c_user.updateUser(req, res) })
    router.put('/updateKTP', (req, res) => { c_user.updateKTP(req, res) })

    // * Lokasi
    router.get('/getAllLokasi', (req, res) => { c_lokasi.getAllLokasi(req, res) })
    router.get('/getLokasiByKota', (req, res) => { c_lokasi.getLokasiByKota(req, res) })
    router.post('/inputLokasi', (req, res) => { c_lokasi.inputLokasi(req, res) })

    // * Lokasi

    // * produk
    router.get('/getAllProduk', (req, res) => { c_produk.getAllProduk(req, res) })
    router.get('/getProduk', (req, res) => { c_produk.getProduk(req, res) })

    // * produk

    // * Add On
    router.get('/getAllAddon', (req, res) => { c_addon.getAllAddon(req, res) })
    router.get('/getAddon', (req, res) => { c_addon.getAddon(req, res) })

    // * Add On

    // * Produk Final
    router.get('/getAllProdukFinal', (req, res) => { c_produkfinal.getAllProdukFinal(req, res) })
    router.get('/getProdukFinal', (req, res) => { c_produkfinal.getProdukFinal(req, res) })

    // * Produk Final

    // * Pemesanan
    router.post('/inputPemesanan', (req, res) => { c_pemesanan.inputPemesanan(req, res) })
    router.get('/getPemesananByCustomer/:customer_id', (req, res) => { c_pemesanan.getPemesananByCustomer(req, res) })

    // * Pemesanan

    // * Pembayaran
    router.get('/getAllPembayaran', (req, res) => { c_pembayaran.getAllPembayaran(req, res) })
    router.get('/getPembayaranById', (req, res) => { c_pembayaran.getPembayaranById(req, res) })

    // * Pembayaran

    // * Verifikasi dan Invoice
    router.get('/getVerifikasiById', (req, res) => { c_verifikasi.getVerifikasiById(req, res) })

    // * Verifikasi

    // * Invoice
    router.get('/getInvoice', (req, res) => { c_invoice.getInvoice(req, res) })
    router.get('/getProdukAndAddon', (req, res) => { c_invoice.getProdukAndAddon(req, res) })

    // * Invoice

});

// ? POST AND PUT PRODUK
app.post('/inputProduk', (req, res) => { c_produk.inputProduk(req, res) })
app.put('/updateProduk', (req, res) => { c_produk.updateProduk(req, res) })


// ? POST AND PUT ADD ON
app.post('/inputAddon', (req, res) => { c_addon.inputAddon(req, res) })
app.put('/updateAddon', (req, res) => { c_addon.updateAddon(req, res) })

// ? POST AND PUT VERIFIKASI 
app.post('/inputVerifikasi', (req, res) => { c_verifikasi.inputVerifikasi(req, res) })
app.put('/updateVerifikasi', (req, res) => { c_verifikasi.updateVerifikasi(req, res) })

// ? POST AND PUT INVOICE 
app.post('/inputInvoice', (req, res) => { c_invoice.inputInvoice(req, res) })

///////////////////////////////////////////////////////////////////////////////
// !!LOGIN ADMIN!!
app.post('/loginAdmin', (req, res) => { c_admin.loginAdmin(req, res) })

// ? Admin
app.post('/inputAdmin', (req, res) => { c_admin.inputAdmin(req, res) })

// ? Admin
app.group("/api_admin/", (router) => {

    //!middleware
    router.use(mid.authToken);

    // * Pemesanan
    router.get('/getPemesananByCustomer', (req, res) => { c_pemesanan.getPemesananByCustomer(req, res) })
    router.get('/getAllPemesanan', (req, res) => { c_pemesanan.getAllPemesanan(req, res) })
    router.put('/putPemesananBox', (req, res) => { c_pemesanan.putPemesananBox(req, res) })
    router.get('/checkProduk', (req, res) => { c_produk.checkProduk(req, res) })

    // * Pemesanan

    // * Pembayaran
    router.get('/getAllPembayaran', (req, res) => { c_pembayaran.getAllPembayaran(req, res) })
    router.get('/getPembayaranById', (req, res) => { c_pembayaran.getPembayaranById(req, res) })
    router.get('/getPembayaranByPemesanan/:id', (req, res) => { c_pembayaran.getPembayaranByPemesanan(req, res) })

    // * Pembayaran

    // * Verifikasi
    router.get('/getVerifikasiByPemesanan/:id', (req, res) => { c_verifikasi.getVerifikasiByPemesanan(req, res) })
    router.post('/inputVerifikasi', (req, res) => { c_verifikasi.inputVerifikasi(req, res) })
    router.put('/updateVerifikasi', (req, res) => { c_verifikasi.updateVerifikasi(req, res) })

    // * Verifikasi


    // * Customer
    router.get('/getAllUser', (req, res) => { c_user.getAllUser(req, res) })
    router.put('/verifUser', (req, res) => { c_user.verifUser(req, res) })
    router.put('/deleteKtp', (req, res) => {
        let fileKTP = req.body.file
        if (fs.existsSync('./upload/KTP/' + fileKTP)) {
            fs.unlink(path.join(__dirname, 'upload/KTP/' + fileKTP), (err) => {
                if (err) throw err;
            });
        }
        c_user.deleteKtp(req, res)
    })

    // * Customer

});
////////////////////////////////////


//! user
app.put('/userDelete', (req, res) => { c_user.deleteUser(req, res) })

//! user

//Port Listen
app.listen(port, () => {
    client.on('qr', qr => {
        qrcode.generate(qr, { small: true });
    });

    client.on('authenticated', (session) => {
        console.log('WHATSAPP WEB => Authenticated');
    });

    client.on('ready', () => {
        console.log('Client is ready!!');
    });
    client.on('message', message => {
        // CUSTOM NUMBER
        let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        let shuff = arr.sort(() => Math.random() - 0.5)
        let val = shuff.splice(1, 6);
        let str = val.toString();
        let otp = str.replace(/[^\w\s]/gi, '')

        // session
        fs.writeFile(SESSION_FILE_PATH, JSON.stringify(otp), (err) => {
            if (err) {
                console.error(err);
            }
        });
        if (message.body === 'Req OTP POBOX') {
            message.reply('POBOX OTP :' + otp);
        }
    });
    client.initialize();
    console.log(`Server berjalan pada http://${host}:${port}`)
})