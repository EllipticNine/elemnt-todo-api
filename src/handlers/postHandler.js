const {users_register, users_login} = require('../models/users')
const {projects_create} = require('../models/projects')
const util = require('util')

/* jwt认证 */
const {jwtGenerate} = require('../utils/auth')
const {tasks_add, tasks_do, tasks_finish } = require("../models/tasks");


function postHandler(req, res) {

    /* API: 用户注册 */
    if (req.url === '/api/users/register') {
        console.log(util.inspect(req.receivedData))
        let uid = req.receivedData.uid
        let uname = req.receivedData.uname
        let password = req.receivedData.password
        users_register(uid, uname, password, null,'NORMAL')
            .then(
                function (rows) {
                    res.end(JSON.stringify({code: 1, message: '注册成功'}))
                    console.log("rows: " + rows)
                },
                function (fail) {
                    res.end(JSON.stringify({code: -1, message: fail}))
                    console.log("fail: " + fail)
                }
            )
    }

    /* API: 用户登录 */
    if (req.url === '/api/users/login') {
        let username = req.receivedData.username
        let password = req.receivedData.password
        users_login(username, password)
            .then(
                function (userinfo) {
                    let token = jwtGenerate(userinfo)
                    console.log('token: ' + token)
                    res.end(JSON.stringify({
                        code: 1,
                        message: '验证成功',
                        info: userinfo,
                        token: token
                    }))
                },
                function (fail) {
                    console.log('查询失败' + util.inspect(fail))
                    res.end(JSON.stringify({code: -1, message: fail}))
                }
            ).catch(err => console.log(err))
    }

    /* API: 创建项目 */
    if (req.url === '/api/projects/create') {
        console.log(req.receivedData)
        projects_create(req.receivedData)
            .then(
                function (rows) {
                    res.end(JSON.stringify({code: 1, message: '创建成功'}))
                },
                function (result) {
                    res.end(JSON.stringify({code: -1, message: result}))
                })
            .catch(err => console.log(err))
    }

    /* API: 新增任务 */
    if (req.url === '/api/tasks/add') {
        console.log(req.receivedData)
        tasks_add(req.receivedData.tid, req.receivedData.tname, req.receivedData.content,'not yet', 'planing',  req.receivedData.pid)
            .then(
                function (rows) {
                    console.log(rows)
                    res.end(JSON.stringify({code: 1, message: '添加成功'}))
                },
                function (reason) {
                    res.end(JSON.stringify({code: -1, message: reason}))
                })
    }
    /* API: 更改任务状态为进行中 */
    if (req.url === '/api/tasks/do') {
        tasks_do(req.receivedData.tid).then(
            function (rows) {
                res.end(JSON.stringify({code: 1, message: '状态更改为正在进行'}))
            },
            function (reason) {
                res.end(JSON.stringify({code: -1, message: reason}))
            }
        )
    }

    /* API: 更改任务状态为已完成，并修改完成时间 */
    if (req.url === '/api/tasks/finish') {
        tasks_finish(req.receivedData.tid, req.receivedData.finishedtime).then(
            function (rows) {
                res.end(JSON.stringify({code: 1, message: '状态更改为已完成'}))
            },
            function (reason) {
                res.end(JSON.stringify({code: -1, message: reason}))
            }
        )
    }
}

module.exports = postHandler