const {execute} = require('../utils/dbtools')

function projects_getList(id) {
    return new Promise(function (resolve, reject) {
        const SQL = `SELECT * FROM PROJECTS WHERE manager='${id}'`
        execute(SQL).then(function (rows) {
            if (rows.length === 0) {
                reject('该用户名下无项目')
            } else {
                resolve(rows)
            }
        }).catch(err => console.log(err))
    })
}

function projects_create(o) {
    return new Promise(function (resolve, reject) {
        const SQL = `INSERT INTO PROJECTS VALUES('${o.pid}', '${o.name}', '${o.manager}', '${o.content}', ${o.due}, '${o.status}')`
        execute(SQL).then(
            function (rows) {
                resolve(rows)
            },
            function (fail) {
                reject(fail)
            }
        ).catch(err => {
            console.log(err)
        })
    })
}

module.exports = { projects_getList, projects_create }