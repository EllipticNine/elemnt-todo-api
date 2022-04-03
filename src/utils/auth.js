/* 引入jsonwebtoken库 */
const jwt = require('jsonwebtoken')
/* jwt生成 */
function jwtGenerate(content) {
    const privateKey = 'gu lei'
    return jwt.sign(content, privateKey,{
        expiresIn: 60 * 60 * 24
    })
}

/* jwt校验 */
async function jwtDecode(token) {
    const privateKey = 'gu lei'
    let result = {}
    await jwt.verify(token, privateKey,  (err, decode) => {
        if (err) {
            this.result = {}
        } else {
            this.result = decode
        }
    })
    return result
}

/* 处理cookie，返回MyToken */
function getToken(cookies) {
    let cookiesArray = cookies.split(';')
    let token = ''
    for (let i of cookiesArray) {
        let tmp = i.trim().split('=')
        if (tmp[0] === 'MyToken') {
            token = tmp[1]
        }
    }
    return token
}

module.exports = { jwtGenerate , jwtDecode, getToken }