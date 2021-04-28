const controller = require('require-all')(
	{
		dirname: __dirname + '/controller',
	},
)


module.exports = {
	"/": controller.test.test,
	"/post": controller.test.test,
}
