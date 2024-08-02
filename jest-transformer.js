const babelPreset = require(`babel-preset-ninja-package`)()
module.exports = require(`babel-jest`).createTransformer({
  ...babelPreset,
})
