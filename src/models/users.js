const {execute} = require('../utils/dbtools')
const {log} = require("nodemon/lib/utils");

const util = require('util')

/***
 * 用户名查重函数
 * @param uname 待查用户名
 * @returns {Promise} 立即执行Promise
 */
function users_checkName(uname) {
    return new Promise(function (resolve, reject) {
        const SQL = `SELECT username FROM USERS WHERE username = '${uname}'`
        execute(SQL).then(function (rows){
            console.log("Rows: " + util.inspect(rows))
            console.log('Rows length : ' + rows.length)
            if (rows.length !== 0) {
                reject('该用户名已存在')
            } else {
                resolve('用户名可以使用')
            }
        })
    })
}

/**
 *
 * @param uid 用户id，由前端生成
 * @param uname 用户名
 * @param pswd 密码
 * @param lastlogin 上次登录时间，默认为null
 * @param role 权限，默认为NORMAL
 * @returns {Promise<object>}
 */
function users_register(uid, uname, pswd, lastlogin, role) {
    return new Promise(function (resolve, reject) {
        const SQL = `INSERT INTO USERS VALUES ('${uid}','${uname}','${pswd}','${lastlogin}','${role}');`
        execute(SQL).then(
            function (rows) {
                resolve(rows)
            },
            function (result) {
                reject(result)
            }
        ).catch((err) => console.log(err))
    })
}

/**
 * 用户登录函数
 * @param username 用户名
 * @param password 密码
 * @returns {Promise<object>}
 */
function users_login(username, password) {
    return new Promise(function (resolve, reject) {
        const SQL = `SELECT * FROM USERS WHERE username='${username}'`
        execute(SQL).then(
            // 执行查询成功
            function (rows) {
                // 查询的用户不存在
                if (rows.length === 0) {
                    reject('该用户不存在')
                } else {
                    // 用户存在
                    // 密码正确
                    if (rows[0].userpswd === password) {
                        let userInfo = rows[0]
                        delete userInfo.userpswd
                        resolve(JSON.parse(JSON.stringify(userInfo)))
                    }
                    else
                        reject('密码错误')
                }
            },
            // 执行查询失败，可能是查询字段不存在，或其它原因
            function (result) {
                reject(result)
            }
        ).catch((err) => console.log(err))
    })
}
module.exports = { users_register, users_login, users_checkName }