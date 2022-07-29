let db = require('../config/db')

function autoincrements(tb_name, slc_name) {
    let maxNumber = db.knex(tb_name).select(slc_name).orderBy(slc_name, 'desc')
    return maxNumber
}

module.exports = { autoincrements }