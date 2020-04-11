'use strict'

const BroccoliRunner = require('../../lib/index')
const runner = new BroccoliRunner('test/fixtures')

const fs = require('fs')
const expect = require('chai').expect
const puppeteer = require('puppeteer')
const rimRaf = require('rimraf')

describe('BroccoliTestRunner', () => {
    let browser = null
    let page = null

    after(() => {
        return new Promise((resolve) => {
            rimRaf('test/fixtures/dist', resolve)
        }).then(() => {
            browser.close()
        })
    })

    describe('.serve', () => {
        before(() => {
            return runner.serve()
        })
        before(() => {
            return puppeteer.launch({ headless: true }).then((b) => {
                browser = b
                return browser.newPage()
            }).then((p) => {
                page = p
            })
        })
        after(() => {
            return runner.stop()
        })

        it('serves content', () => {
            return page.goto('http://localhost:4200/test.html')
                .then(() => {
                    return page.evaluate(() => {
                        return document.querySelector("h1").textContent;
                    })
                }).then((text) => {
                    expect(text).to.contain("Hello!")
                })
        })
    })

    describe('.build', () => {
        before(() => {
            return runner.build()
        })
        after(() => {
            return runner.stop()
        })
        it('does not serve content', () => {

            return page.goto('http://localhost:4200/test.html')
                .then((text) => {
                    throw ('Should not arrive here. Broccoli should not serve')
                })
                .catch((error) => {
                    expect(error.message).to.contain('net::ERR_CONNECTION_REFUSED')
                })
        })
        it('builds content', () => {
            const copiedContent = fs.readFileSync('test/fixtures/dist/test.html', 'utf-8')
            expect(copiedContent).to.contain('Hello!')
        })
    })
})