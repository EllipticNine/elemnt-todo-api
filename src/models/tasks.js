const {execute} = require('../utils/dbtools')

/*
* 获取项目下的所有任务
* @params pid {String}
*/
function tasks_getPlaning(pid) {
    return new Promise(function (resolve, reject) {
        const SQL = `SELECT * FROM tasks WHERE pid = '${pid}' AND status = 'planing'`
        execute(SQL).then(function (rows) {
            if (rows.length === 0) {
                reject('此项目下无任务')
            } else {
                resolve(rows)
            }
        }).catch(err => {
            console.log('err: ' + err)
        })
    })
}

/**
 * 向目标项目添加新任务
 * @param tid
 * @param tname
 * @param content
 * @param finishedtime
 * @param status
 * @param pid
 * @returns {Promise}
 */
function tasks_add(tid, tname,  content, finishedtime, status, pid) {
    return new Promise(function (resolve,reject) {
        const SQL = `INSERT INTO tasks VALUES ('${tid}','${tname}','${content}','${finishedtime}','${status}','${pid}')`
        execute(SQL).then(
            function (rows) {
                resolve(rows)
            },
            function (result) {
                console.log(result)
                reject(result)
            }
        ).catch(err => {
            console.log('err: ' + err)
        })
    })
}

/**
 * 改变目标任务状态为doing
 * @param tid
 * @returns {Promise<unknown>}
 */
function tasks_do(tid) {
    return new Promise(function (resolve, reject) {
        const SQL = `UPDATE tasks SET status= 'doing' WHERE tid='${tid}' `
        execute(SQL).then(
            function (rows) {
                resolve(rows)
            },
            function (result) {
                reject(result)
            }
        ).catch(err => {
            console.log('err: ' + err)
        })
    })
}

/**
 * 获取项目下正进行的任务
 * @param pid
 * @returns {Promise}
 */
function tasks_getDoing(pid) {
    return new Promise(function (resolve, reject) {
        const SQL = `SELECT * FROM tasks WHERE pid = '${pid}' AND status = 'doing'`
        execute(SQL).then(
            function (rows) {
                if (rows.length === 0)
                    reject('No tasks on going')
                else
                    resolve(rows)
            }
        ).catch(err => {
            console.log('err:' + err)
        })
    })
}

/**
 * 改变目标任务状态为finished
 * @param tid
 * @param finishedtime
 * @returns {Promise<unknown>}
 */
function tasks_finish(tid, finishedtime) {
    return new Promise(function (resolve, reject) {
        const SQL = `UPDATE tasks SET status= 'finished',finishedtime='${finishedtime}'  WHERE tid='${tid}' `
        execute(SQL).then(
            function (rows) {
                resolve(rows)
            },
            function (result) {
                reject(result)
            }
        ).catch(err => {
            console.log('err: ' + err)
        })
    })
}

/**
 * 获取项目下已完成的任务
 * @param pid
 * @returns {Promise}
 */
function tasks_getFinished(pid) {
    return new Promise(function (resolve, reject) {
        const SQL = `SELECT * FROM tasks WHERE pid = '${pid}' AND status = 'finished'`
        execute(SQL).then(
            function (rows) {
                if (rows.length === 0)
                    reject('No tasks finished')
                else
                    resolve(rows)
            }
        ).catch(err => {
            console.log('err:' + err)
        })
    })
}
module.exports = { tasks_getPlaning ,tasks_add, tasks_getDoing, tasks_getFinished, tasks_do, tasks_finish}