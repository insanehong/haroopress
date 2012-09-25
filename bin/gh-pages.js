var exec = require('child_process').exec,
    fs = require('fs'),
    step = require('step'),
    colors = require('colors'),
    mkdirp = require('mkdirp'),
    readline = require('readline'),
    conf = require('../config');

var rl;
rl = readline.createInterface(process.stdin, process.stdout, null);

process.chdir(conf.deployDir);

if(fs.existsSync(conf.deployDir +'/.git')) {
    exec('rm -rf '+ conf.deployDir +'/.git', function(code, stdout, stderr) {
        // console.log('haroo> remove .git');  
    })
}

console.log('haroo> %s', 'Enter the read/write repository for your haroopress site '.yellow);
console.log('"'+'git@github.com:[github-id]/[github-id].github.com.git'.red +'"');

function start(cb) {
    rl.question(' > ', function(repo) {

        var user, regx, branch, project;

        if(repo.indexOf('https') >= 0) {
            regx = /github.com\/([^\/]+)/;
        } else {
            regx = /:([^\/]+)/;
        }
        user = repo.match(regx)[1];
        branch = (repo.match(/\/[\w-]+.github.com/) == null) ? 'gh-pages' : 'master';
        project = (branch == 'gh-pages') ? repo.match(/\/([^\.]+)/)[1] : '';

        console.log('haroo> git remote -v¶'.yellow);
        exec('git remote -v', function(code, stdout, stderr) {
            console.log(stdout);
            if (stdout.match(/origin.+?haroopress.git/) != null) {
                step(
                    function gitInit() {
                        console.log('haroo> Start setting github pages branch ¶'.yellow);
                        exec('git init', this);
                    },
                    function gitRename(code, stdout, stderr) {
                        console.log(stdout);
                        console.log('haroo> Completed git repository initialize ¶'.yellow);
                        exec('git remote rename origin haroopress', this);
                    },
                    function isMaster(code, stdout, stderr) {
                        console.log(stdout);
                        console.log('haroo> Repository remote\'s name origin -> haroopress ¶'.yellow);
                        if (branch == 'master') {
                            console.log('haroo> Git remote add to origin ¶'.red);
                            exec('git remote add origin '+ repo, this);
                        }
                    },
                    function setGitConfig(code, stdout, stderr) {
                        console.log(stdout);
                        console.log('haroo> Added remote %s as origin ¶'.yellow, repo);
                        exec('git config branch.master.remote origin', this);
                    },
                    function setBranch(code, stdout, stderr) {
                        console.log(stdout);
                        console.log('haroo> Set origin as default remote ¶'.yellow);
                        exec('git branch -m master source', this);
                    },
                    function initHaroog(code, stdout, stderr) {
                        console.log(stdout);
                        console.log('haroo> Created inex.html ¶'.yellow);
                        exec('echo "<!-- haroopress init -->" > index.html', this);
                    },
                    function gitAdd(code, stdout, stderr) {
                        console.log(stdout);
                        console.log('haroo> git add . ¶'.yellow);
                        exec('git add .', this);
                    },
                    function createCommitter(code, stdout, stderr) {
                        console.log(stdout);
                        console.log('haroo> Copy temp commiter ¶'.yellow);
                        exec('cp ../bin/git-commit .git-commit', this);
                    },
                    function gitCommit(code, stdout, stderr) {
                        console.log(stdout);
                        console.log('haroo> git commit ¶'.yellow);
                        exec('./.git-commit', this);
                    },
                    function removeCommiter(code, stdout, stderr) {
                        console.log(stdout);
                        console.log('haroo> Remove temp commiter ¶'.yellow);
                        exec('rm -rf .git-commit', this);
                    },
                    /*function gitBranch(err, stdout, stderr) {
                        console.log('> git branch -m gh-pages')
                        exec('git branch -m gh-pages', this);
                    },*/
                    function gitRemoteAdd(code, stdout, stderr) {
                        console.log(stdout);
                        console.log('haroo> git remote add origin ¶'.yellow);
                        if (branch != 'master') {
                            console.log('haroo> Git remote add to origin ¶'.red);
                            exec('git remote add origin '+ repo, this)
                        }
                    },
                    function end(code, stdout, stderr) {
                        console.log(stdout);
                        console.log('haroo> completed'.cyan);
                    } 
                );
            }
        });

        rl.close();
        cb();
        // process.stdin.destroy();
    });
}

module.exports = {
    start: start
}
