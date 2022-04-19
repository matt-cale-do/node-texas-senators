const Hapi = require('@hapi/hapi')
const DB = require('./db.js')

process.env.PHRASE = "Hello Fergie"
let PHRASE = process.env.PHRASE || 'Hello World'

process.env.REPHRASE = "Club Sandwiches Are The Best!"

const logReq = (request) => {
    const ip = request.info.remoteAddress
    const p = request.path
    console.log(`Server Time: ${new Date()} - Requested: ${p} - From: ${ip}`)
}

const init = async () => {

    const server = Hapi.server({
        port: process.env['PORT'] || 8080,
        host: '0.0.0.0'
    })

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            logReq(request)
            return {classOne: DB.classOne, classTwo: DB.classTwo}
        }
    })

    server.route({
        method: 'GET',
        path: '/c1',
        handler: (request, h) => {
            logReq(request)
            return DB.classOne
        }
    })

    server.route({
        method: 'GET',
        path: '/c2',
        handler: (request, h) => {
            logReq(request)
            return DB.classTwo
        }
    })

    server.route({
        method: 'GET',
        path: '/phrase',
        handler: (request, h) => {
            logReq(request)
            return PHRASE
        }
    })

    server.route({
        method: 'GET',
        path: '/rephrase',
        handler: (request, h) => {
            logReq(request)
            return process.env.REPHRASE
        }
    })

    await server.start()
    console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
    console.log(err)
    process.exit(1)
})

init()