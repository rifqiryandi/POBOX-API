// ? CekRespon note spesifik : 0 = get, 1 = input, 3 = update delete
function responCheck(data, res, spesifik = 0) {
    switch (spesifik) {
        case 1:
            try {
                data.then((reqData) => {
                    if (reqData == undefined) {
                        return res.status(400).json({
                            'responCode': 400,
                            'Msg': "Fail"
                        })
                    } else if (reqData.length == 0) {
                        code(400, reqData, res, 1)

                    } else {
                        code(200, reqData, res, 1)
                    }
                })
            } catch (error) {
                console.log(error);
            }
            break;
            //////////////////////////////////////////
        case 2:
            data.then(() => {
                return res.status(200).json({
                    'responCode': 200,
                    'Msg': 'Berhasil'
                })
            }).catch((err) => {
                return res.status(400).json({
                    'responCode': 400,
                    'Msg': 'Error Query : ' + err.message
                })
            });
            break;
            ////////////////////////////////////////////
        case 3:
            data.then((reqData) => {
                if (reqData == undefined) {
                    return res.status(400).json({
                        'responCode': 400,
                        'Msg': "Fail"
                    })
                } else if (reqData == 0) {
                    code(404, reqData, res, 1)
                } else {
                    code(200, reqData, res, 1)
                }
            })
            break;

        case 0:
            data.then((reqData) => {
                if (reqData == undefined) {
                    return res.status(400).json({
                        'responCode': 400,
                        'Msg': "Data Not Found"
                    })
                } else if (reqData.length == 0) {
                    code(400, reqData, res)
                } else {
                    code(200, reqData, res)
                }
            })
            break;
    }

}


//! output respon
const code = (responCode, data, res, spesifikRespon = 0) => {
    switch (spesifikRespon) {
        case 1:
            switch (responCode) {
                case 200:
                    return res.status(200).json({
                        'responCode': 200,
                        'Msg': "Berhasil",
                        'Data': data['rows']
                    })
                    break;

                case 404:
                    return res.status(404).json({
                        'responCode': 404,
                        'Msg': "Fail",
                        'Data': data
                    })
                    break;
            }
            break;

        case 0:
            switch (responCode) {
                case 200:
                    return res.status(200).json({
                        'responCode': 200,
                        'Msg': "Berhasil",
                        'Data': data
                    })
                    break;

                case 400:
                    return res.status(400).json({
                        'responCode': 400,
                        'Msg': "Data Not Found"
                    })
                    break;
            }
            break;
    }
}

module.exports = { responCheck }