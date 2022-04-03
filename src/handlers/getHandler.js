const {createUser, users_register, users_checkName} = require('../models/users')
const {projects_getList} = require('../models/projects')
const { tasks_getPlaning, tasks_getDoing, tasks_getFinished } = require('../models/tasks')


function getHandler(req, res) {

    if (req.url === '/api/users/get') {
        res.writeHead(200)
        res.end('结束')
    }

    /* API: 用户名查重 */
    if (req.url === '/api/users/register/checkName'){
        users_checkName(req.receivedData.uname).then(
            // resolve
            function () {
                console.log('users resolve')
                res.writeHead(200)
                res.end('Good')
            },
            // reject
            function () {
                console.log('users reject')
                res.writeHead(200)
                res.end(JSON.stringify({ code: -1, message: '用户名已存在'}))
            })
    }

    /* API: 获取该账户下项目列表 */
    if (req.url === '/api/projects/getList') {
        projects_getList(req.receivedData.id).then(
            function (list) {
                console.log('projects resolve')
                res.end(JSON.stringify({code: 1, data: list}))
            },
            function (reason) {
                console.log('reason: ' + reason)
                res.end(JSON.stringify({code: -1, message: reason}))
            }
        )
    }

    /* API: 获取目标项目下的所有任务*/
    if (req.url === '/api/tasks/getPlaning') {
        tasks_getPlaning(req.receivedData.pid).then(
            function (list) {
                console.log('tasks resolve')
                res.end(JSON.stringify({code: 1, data: list}))
            },
            function (reason) {
                console.log('reason: ' + reason)
                res.end(JSON.stringify({code: -1, message: reason}))
            }
        )
    }

    /* API: 获取目标项目下的所有正进行任务 */
    if (req.url === '/api/tasks/getDoing') {
        tasks_getDoing(req.receivedData.pid).then(
            function (list) {
                console.log('get doing')
                res.end(JSON.stringify({code: 1, data: list}))
            },
            function (reason) {
                console.log('reason: ' + reason)
                res.end(JSON.stringify({code: -1, message: reason}))
            }
        )
    }

    /* API: 获取目标项目下的所有已完成任务 */
    if (req.url === '/api/tasks/getFinished') {
        tasks_getFinished(req.receivedData.pid).then(
            function (list) {
                console.log('get finished')
                res.end(JSON.stringify({code: 1, data: list}))
            },
            function (reason) {
                console.log('reason: ' + reason)
                res.end(JSON.stringify({code: -1, message: reason}))
            }
        )
    }
}

module.exports = getHandler