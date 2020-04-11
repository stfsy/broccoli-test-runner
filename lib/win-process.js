'use strict'

const spawn = require('child_process').spawn

const Process = require('./process')

class WinProcess extends Process {

    constructor(cwd) {
        super(cwd)

        this._cmd = 'broccoli.cmd'
    }

    stop() {
        return new Promise((resolve, reject) => {
            if (!this._process.killed) {
                const kill = spawn("taskkill", ["/pid", this._process.pid, '/f', '/t']);
                kill.on('exit', resolve)
            }
        })
    }
}


module.exports = WinProcess