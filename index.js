function processSize (propPrefix, decl, list) {
  let sizes = list.space(decl.value)
  if (sizes.length === 1) sizes[1] = sizes[0]

  decl.cloneBefore({ prop: propPrefix + 'width', value: sizes[0] })
  decl.cloneBefore({ prop: propPrefix + 'height', value: sizes[1] })

  decl.remove()
}

module.exports = () => {
  return {
    Declaration: {
      'max-size': (decl, { list }) => {
        processSize('max-', decl, list)
      },

      'min-size': (decl, { list }) => {
        processSize('min-', decl, list)
      },

      'size': (decl, { list }) => {
        if (decl.parent.name !== 'page') {
          processSize('', decl, list)
        }
      }
    },
    postcssPlugin: 'postcss-size'
  }
}
module.exports.postcss = true
