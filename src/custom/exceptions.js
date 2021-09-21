process.on('uncaughtException', (err) => {
	console.log(`-----------------uncaughtException-----------------:${err} - ${err.stack}`)
});

process.on('unhandledRejection', (err) => {
	console.log(`-----------------unhandledRejection-----------------:${err} - ${err.stack}`)
});