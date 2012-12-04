#!/usr/bin/env node

var fs = require('fs'),
    config = require('../config'),
    conf = require('../_config'),
    path = require('path'),
    colors = require('colors');


function printConfig() {
    var res = JSON.stringify(config, null, 4);
    return 'module.exports = '+ res;
}

function overrideVersion() {
    var str = printConfig(),
        pattern = new RegExp('"'+ path.resolve(__dirname, '..'), 'g');

    fs.writeFileSync('./config.js', str, 'utf8');
}


function updateCheck() {
    var version  = config.meta.version,
        lastest = conf.meta.version;
    
    if(version === lastest) {
       console.log('==================================================================================');
       console.log('haroo> Make sure your enggine is running the lastest version of Haroopress.'.yellow);
       console.log('haroo> Harropress '+version.yellow);
    } else {
       config.meta.version = lastest;
      
       overrideVersion();
       
       console.log('==================================================================================');
       console.log('haroo> The Haroopress was completed successfully.'.yellow);
       console.log('haroo> Update : '+version.red+' => '+ lastest.yellow);
    }
}

updateCheck();
