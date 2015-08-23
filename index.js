var postcss = require('postcss');

module.exports = postcss.plugin('postcss-size', function () {
    return function (css) {
        css.walkDecls('size', function (decl) {
            var sizes = postcss.list.space(decl.value);
            if ( sizes.length === 1 ) sizes[1] = sizes[0];

            decl.cloneBefore({ prop: 'width',  value: sizes[0] });
            decl.cloneBefore({ prop: 'height', value: sizes[1] });

            decl.remove();
        });
    };
});
