const Hapi = require('@hapi/hapi')

const DB = require("./db.js")

const init = async () => {

    const server = Hapi.server({
        port: process.env["PORT"] || 80,
        host: '0.0.0.0'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            const ip = request.info.remoteAddress
            console.log(`Server Time: ${new Date()} - Requested: / - From: ${ip}`)
            return {classOne: DB.classOne, classTwo: DB.classTwo}
        }
    })

    await server.start();
    console.log('Server running on %s', server.info.uri)
};

process.on('unhandledRejection', (err) => {
    console.log(err)
    process.exit(1)
});

init()