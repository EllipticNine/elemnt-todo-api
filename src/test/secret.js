const bcrypt = require('bcrypt')




// function encrypt(key) {
//     return new Promise(function (resolve, reject) {
//         const saltRounds = 10
//
//         const password = key
//
//         bcrypt.hash(password, saltRounds).then(
//             function (result) {
//                 resolve(result)
//             }
//         ).catch(err => {
//             reject(err)
//         })
//     })
// }

// function decrypt(key,hash) {
//     return new Promise(function (resolve, reject) {
//         bcrypt.compare(key, hash).then(function (result){
//             console.log(result)
//         },
//             function (result) {
//                 console.log(result)
//             })
//     })
// }

let hash = ''
bcrypt.hash('gu',10,function (err,hash) {
    this.hash = hash
    console.log('Hash: ' + hash)
    bcrypt.compare('gu', hash, function (err, result) {
        console.log('Result: ' + result)
    })
})
