const withSass = require('@zeit/next-sass')
const withImage = require('next-images')

module.exports = withSass(withImage({
  devIndicators: {
    autoPrerender: false,
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.glsl$/,
      use: [
        "raw-loader"
      ]
    })
    return config
  }
}))