const mainHandler = require('../index')

const http = require('http')

const PORT = 3000

const server = http.createServer(mainHandler)

server.listen(PORT, () => {
    console.log('Server running at PORT: ' + PORT)
})

