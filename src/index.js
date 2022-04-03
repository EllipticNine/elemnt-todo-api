const querystring = require('querystring')
const getHandler = require('./handlers/getHandler')
const postHandler = require('./handlers/postHandler')

const {getToken, jwtDecode} = require('./utils/auth')
const util = require('util')
const {decode} = require("jsonwebtoken");

const mainHandler = (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS')
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With," +
        "Content-Type, Accept, client_id, uuid, Authorization");
    res.setHeader('Access-Control-Allow-Credentials', true)
    console.log('request method: ' + req.method)
    console.log('request url: ' + req.url)
    // req.token = getToken(req.headers.cookie)
    // req.decode = jwtDecode(req.token)
    // console.log('decode: ' + util.inspect(req.decode))

    if (req.method === 'OPTIONS') {
        res.writeHead(200)
        res.end('')
    }

    if (req.method === 'GET') {
        req.receivedData = querystring.parse(req.url.split('?')[1])
        req.url = req.url.split('?')[0]
        getHandler(req,res)
    }

    if (req.method === 'POST') {
        if (req.headers['content-type'] === 'application/json') {
            let postData = ''
            req.on('data', chunk => {
                postData += chunk
                console.log('Post Data received')
            })
            req.on('end', () => {
                req.receivedData = JSON.parse(postData)
                postHandler(req,res)
            })
        } else {
            res.writeHead(400)
            res.end('数据类型不正确')
        }

    }
}

module.exports = mainHandler