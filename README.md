# Broccoli Plugin Adapter

[![Build Status](https://travis-ci.org/stfsy/broccoli-test-runner.svg?branch=master)](https://travis-ci.org/stfsy/broccoli-test-runner) [![Dependency Status](https://img.shields.io/david/stfsy/broccoli-test-runner.svg)](https://github.com/stfsy/broccoli-test-runner/blob/master/package.json) [![DevDependency Status](https://img.shields.io/david/dev/stfsy/broccoli-test-runner.svg)](https://github.com/stfsy/broccoli-test-runner/blob/master/package.json) [![Npm downloads](https://img.shields.io/npm/dm/broccoli-test-runner.svg)](https://www.npmjs.com/package/broccoli-test-runner) [![Npm Version](https://img.shields.io/npm/v/broccoli-test-runner.svg)](https://www.npmjs.com/package/broccoli-test-runner) [![Git tag](https://img.shields.io/github/tag/stfsy/broccoli-test-runner.svg)](https://github.com/stfsy/broccoli-test-runner/releases) [![Github issues](https://img.shields.io/github/issues/stfsy/broccoli-test-runner.svg)](https://github.com/stfsy/broccoli-test-runner/issues) [![License](https://img.shields.io/npm/l/broccoli-test-runner.svg)](https://github.com/stfsy/broccoli-test-runner/blob/master/LICENSE)

Test you plugins with an actual instance of Broccoli building or serving content. Broccoli will be run non-blocking in a separate Process.

## Example

```javascript
'use strict'

const BroccoliTestRunner = require('broccoli-test-runner')
const broccoliRunner = new BroccoliTestRunner('test/fixtures') // path to build directory with brocfile

describe('Serves', () => {
    before(() => {
       return  broccoliRunner.build()
    })
    after(() => {
        return broccoliRunner.stop()
    })
    it('..', ..) // test your plugin serves content as expected
})

describe('Builds', () = {
    before(() => {
       return  broccoliRunner.build()
    })
    after(() => {
        return broccoliRunner.stop()
    })
    it('..', ..) // test your plugin builds content as expected
})
```

## Installation

```javascript
npm install broccoli-test-runner --save-dev
```

## License

This project is distributed under the MIT license.
