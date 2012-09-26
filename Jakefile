desc('Haroopress Run Tasks');
task('default', [ /* */'update', 'clear', 'setup', 'gh-pages', 'initialize', 'guide' ], function() {
}, { async: true });

desc('Update submodule');
task('update', function() {
	var cmd = [ 'git submodule update --init' ];
	jake.exec(cmd, function() {
		complete();
	}, { printStdout: true });
}, { async: true });

desc('Configurate haroopress');
task('setup', function() {
	require('./bin/setup').start(complete);
}, { async: true });

desc('Setup repository for publishing');
task('gh-pages', function() {
	require('./bin/gh-pages').start(complete);
}, { async: true });

desc('Initialize haroopress data');
task('initialize', function() {
	require('./bin/init').start(complete);
}, { async: true });

desc('Clear public & Publishing directories');
task('clear', function() {
	var cmd = [ 'node ./bin/clear.js' ];
	jake.exec(cmd, function() {
		complete();
	}, { printStdout: true });
}, { async: true });

desc('Display Quick Guide');
task('guide', function () {
	var cmd = [ 'clear', 'cat ./lib/haroopress/QUICK.markdown' ];
	process.chdir(__dirname);
	jake.exec(cmd, function() {
		complete();
	}, { printStdout: true });
}, { async: true });

desc('Generate to static page');
task('gen', function() {
	var cmd = [ 
		'node ./bin/gen.js',
		'cp -R ./lib/shower _public/slides/@asserts',
		'rm -rf ./_public/slides/@asserts/.git*'
	 ];
	jake.exec(cmd, function() {
		complete();
	}, { printStdout: true });
});

desc('Preview static page');
task('preview', function() {
	var cmd = [ 'node ./bin/preview.js' ];
	jake.exec(cmd, function() {
		complete();
	}, { printStdout: true });
});

desc('Deploy to github');
task('deploy', function(msg) {
	var cmd = [ 'cd ./bin;./deploy.js "'+ msg +'"' ];
	jake.exec(cmd, function() {
		complete();
	}, { printStdout: true });
});

desc('New Post');
task('new-post', function() {
	var cmd = [ 'cd ./bin;./new-post.js' ];
	jake.exec(cmd, function() {
		complete();
	}, { printStdout: true });
});

desc('New Page');
task('new-page', function() {
	var cmd = [ 'cd ./bin;./new-page.js' ];
	jake.exec(cmd, function() {
		complete();
	}, { printStdout: true });
});

desc('New Slide');
task('new-slide', function() {
	var cmd = [ 'cd ./bin;./new-slide.js' ];
	jake.exec(cmd, function() {
		complete();
	}, { printStdout: true });
});