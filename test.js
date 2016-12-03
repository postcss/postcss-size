import postcss from 'postcss';
import test    from 'ava';

import plugin from './';

function run(t, input, output) {
    return postcss([ plugin ]).process(input)
        .then( result => {
            t.same(result.css, output);
            t.same(result.warnings().length, 0);
        });
}

test('sets width and height', t => {
    return run(t, 'a{ size: 1px 2px; }', 'a{ width: 1px; height: 2px; }');
});

test('sets width and height by one value', t => {
    return run(t, 'a{ size: 1px; }', 'a{ width: 1px; height: 1px; }');
});

test('splits values by brackets', t => {
    return run(t, 'a{ size: calc(4 * 2px)  2px; }',
                  'a{ width: calc(4 * 2px); height: 2px; }');
});

test('prefix value', t => {
    return run(t, 'a{ size: -webkit-fit-content  auto; }',
                  'a{ width: -webkit-fit-content; height: auto; }');
});

test('supports auto value', t => {
    return run(t, 'a{ size: .98%  auto; }', 'a{ width: .98%; height: auto; }');
});

test('supports !important', t => {
    return run(t, 'a{ size: 1px !important; }',
                  'a{ width: 1px !important; height: 1px !important; }');
});

test('not conflicts with @page size descriptor', t => {
    return run(t, '@page{ size: 4cm 6cm landscape; }',
                  '@page{ size: 4cm 6cm landscape; }');
});
