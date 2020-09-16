'use strict'

const spawn = require('child_process').spawn
const resolvePath = require('path').resolve

class Process {

    constructor(cwd) {
        this._cwd = cwd
        this._cmd = 'broccoli'
    }

    build() {
        return this.start('build')
    }

    b() {
        return this.start('b')
    }

    serve() {
        return this.start('serve')
    }
    
    s() {
        return this.start('s')
    }

    start(task) {
        return new Promise((resolve, reject) => {
            this._process = spawn(resolvePath('node_modules', '.bin', this._cmd),
                [task, '--brocfile-path', this._cwd + '/Brocfile.js', '--cwd', this._cwd],
                { windowsHide: true })

            this._waitForOutputAndCallBack(this._process.stdout, 'Built', resolve)

            this._process.stdout.on('data', (data) => {
                console.log(data.toString())
            });

            this._process.stderr.on('data', (data) => {
                console.log(data.toString())
                reject()
            });

            process.on('SIGHUP', () => {
                this.stop()
            })
        })
    }

    _waitForOutputAndCallBack(stream, message, callback) {
        stream.on('data', function fn(data) {
            if (data.indexOf(message) >= 0) {
                stream.removeListener('data', fn)
                callback()
            }
        })
    }

    stop() {
        return new Promise((resolve) => {
            if (!this._process.killed) {
                const kill = spawn('kill', [this._process.pid]);
                kill.on('exit', resolve)
            }
        })
    }
}

module.exports = Process