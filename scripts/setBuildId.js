const fs = require('fs')

const buildId = new Date()

const buildConfig = { buildId }

fs.writeFileSync('.build.config.json', JSON.stringify(buildConfig))

const a = fs.readFileSync('.build.config.json').toString('utf-8')
console.log('Build config', JSON.parse(a))
