var postcss = require('postcss');
var expect  = require('chai').expect;

var size = require('../');

var test = function (input, output) {
    expect(postcss(size).process(input).css).to.eql(output);
};

describe('postcss-size', function () {

});
