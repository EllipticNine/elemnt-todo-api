const {execute} = require('../utils/dbtools')
const {users_checkName} = require('../models/users')
const util = require('util')
const SQL = "INSERT INTO TEST (id, t1, t2) VALUES (4,'dd','dd')"


//
// execute(SQL).then((success) => {
//     console.log('Success: ' + util.inspect(success))
// },(failure) => {
//     console.log('Fail: ' + util.inspect(failure))
// }).catch(err => {
//     console.log(err)
// })
users_checkName('111')