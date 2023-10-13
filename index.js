module.exports = () => {
  function processSize (propPrefix, decl, list) {
    let sizes = list.space(decl.value)
    if (sizes.length === 1) sizes[1] = sizes[0]

    decl.cloneBefore({ prop: propPrefix + 'width', value: sizes[0] })
    decl.cloneBefore({ prop: propPrefix + 'height', value: sizes[1] })

    decl.remove()
  }

  return {
    postcssPlugin: 'postcss-size',
    Declaration: {
      'size': (decl, { list }) => {
        if (decl.parent.name !== 'page') {
          processSize('', decl, list)
        }
      },

      'min-size': (decl, { list }) => {
        processSize('min-', decl, list)
      },

      'max-size': (decl, { list }) => {
        processSize('max-', decl, list)
      }
    }
  }
}
module.exports.postcss = true
