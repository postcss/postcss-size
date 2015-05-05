var list = require('postcss/lib/list');

module.exports = function (css) {
    css.eachDecl('size', function (decl) {
        var sizes = list.space(decl.value);
        if ( sizes.length === 1 ) sizes[1] = sizes[0];

        decl.cloneBefore({ prop: 'width',  value: sizes[0] });
        decl.cloneBefore({ prop: 'height', value: sizes[1] });

        decl.removeSelf();
    });
};
