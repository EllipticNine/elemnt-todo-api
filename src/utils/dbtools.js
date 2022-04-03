const util = require('util')

const mysql =  require('mysql')

const USERNAME = 'root'
const PASSWORD = '123'
const HOST = 'localhost'

let pool = mysql.createPool({
    host: HOST,
    user: USERNAME,
    password: PASSWORD
})

/**
 * SQL执行函数,成功：resolve(rows) 失败：reject(result)
 * @param SQL {String} 规范的SQL语句
 * @returns {Promise<object>}
 */
function execute(SQL) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            connection.query('USE TEST;', function (err) {
                if (err) {
                    reject(err)
                }
            })
            connection.query(SQL, function (err,rows){
                if (err) {
                    let result = {
                        code: err.code,
                        errno: err.errno,
                        sqlMessage: err.sqlMessage
                    }
                    reject(result)
                } else {
                    resolve(rows)
                }
                connection.release()
            })
        })
    })
}
module.exports = { execute }
