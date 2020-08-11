module.exports = () => {
  return {
    postcssPlugin: 'postcss-size',
    Declaration: {
      size: (decl, { list }) => {
        if (decl.parent.name !== 'page') {
          let sizes = list.space(decl.value)
          if (sizes.length === 1) sizes[1] = sizes[0]

          decl.cloneBefore({ prop: 'width', value: sizes[0] })
          decl.cloneBefore({ prop: 'height', value: sizes[1] })

          decl.remove()
        }
      }
    }
  }
}
module.exports.postcss = true
