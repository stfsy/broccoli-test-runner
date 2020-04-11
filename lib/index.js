'use strict'

const platform = require('os').platform()

if (platform == 'win32') {
    module.exports = require('./win-process')
} else {
    module.exports = require('./nix-process')
}