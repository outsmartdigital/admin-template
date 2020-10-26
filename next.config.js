const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const path = require('path')
const fs = require('fs')

require('dotenv').config({ path: path.resolve(__dirname, `./.env.${process.env.STAGE}`) })

const env = process.env.NODE_ENV || 'development'
const isLocal = process.env.IS_LOCAL === 'true'
const stage = process.env.STAGE

const buildConfig = fs.readFileSync('.build.config.json').toString('utf-8')
const buildId = buildConfig && JSON.parse(buildConfig).buildId

if (!buildId && !isLocal) {
  throw (new Error('InvalidBuildId').message = `Invalid build id: ${buildId}. Was the script setBuildId.js not called?`)
}

const config = {
  target: 'serverless',
  useFileSystemPublicRoutes: false,
  trailingSlash: true,
  assetPrefix: isLocal ? '' : `${process.env.CDN_STATIC_BASE_URL}/javascript/${buildId}`,
  basePath: (!isLocal && stage && `/${stage}`) || '', // TODO delete this if not using API gateway URL
  webpack(config, options) {
    // Disable type checking
    // config.plugins = config.plugins.filter((plugin) => {
    //   if (plugin.constructor.name === 'ForkTsCheckerWebpackPlugin') return false
    //   return true
    // })
    if (env === 'development' && !options.isServer) {
      config.plugins.push(new ForkTsCheckerWebpackPlugin())
    }
    if (!options.isServer) {
      config.plugins.push(
        new Dotenv({
          path: path.join(__dirname, `.env.${process.env.STAGE || 'dev'}`),
          systemvars: true,
        })
      )
    }
    return config
  },
}

module.exports = config
