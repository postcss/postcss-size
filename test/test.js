var postcss = require('postcss');
var expect  = require('chai').expect;

var size = require('../');

var test = function (input, output) {
    expect(postcss(size).process(input).css).to.eql(output);
};

describe('postcss-size', function () {

    it('sets width and height', function () {
        test('a{ size: 1px 2px; }', 'a{ width: 1px; height: 2px; }');
    });

    it('sets width and height by one value', function () {
        test('a{ size: 1px; }', 'a{ width: 1px; height: 1px; }');
    });

    it('splits values by brackets', function () {
        test('a{ size: calc(4 * 2px)  2px; }',
             'a{ width: calc(4 * 2px); height: 2px; }');
    });

    it('prefix value', function () {
        test('a{ size: -webkit-fit-content  auto; }',
             'a{ width: -webkit-fit-content; height: auto; }');
    });

    it('auto value', function () {
        test('a{ size: .98%  auto; }',
             'a{ width: .98%; height: auto; }');
    });

});
