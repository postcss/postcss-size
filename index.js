let postcss = require('postcss')

module.exports = postcss.plugin('postcss-size', () => {
  return css => {
    css.walkDecls('size', decl => {
      if (decl.parent.name !== 'page') {
        let sizes = postcss.list.space(decl.value)
        if (sizes.length === 1) sizes[1] = sizes[0]

        decl.cloneBefore({ prop: 'width', value: sizes[0] })
        decl.cloneBefore({ prop: 'height', value: sizes[1] })

        decl.remove()
      }
    })
  }
})
