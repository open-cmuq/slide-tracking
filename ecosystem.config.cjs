module.exports = {
	apps: [{
		name: 'slide-tracking',
		script: './build/index.js',
		node_args: '-r dotenv/config',
	}],
};
