#! /usr/bin/env node
const prog = require('caporal');

const devCommand = require('./dev');
const buildCommand = require('./build');

const pkg = require('../package.json');

prog
    .version(pkg.version)
    .description(pkg.description);

prog
    .command('build', 'Build static files')
    .argument('<config>', 'JSON config file path')
    .argument('[output]', 'Output directory', prog.STRING, 'public')
    .action(buildCommand);

prog
    .command('dev', 'Start dev server')
    .argument('<config>', 'JSON config file path', prog.STRING)
    .option('-p, --port <num>', 'Dev server port', prog.INT, 3000)
    .option('-h, --host <host>', 'Dev server host', prog.STRING, 'localhost')
    .action(devCommand);

prog.parse(process.argv);
