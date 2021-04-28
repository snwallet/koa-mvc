const controller = require('require-all')(
	{
		dirname: __dirname + '/controller',
	},
)

module.exports = {
	"/":  controller.test.test,
	"/get": controller.test.test,
}
