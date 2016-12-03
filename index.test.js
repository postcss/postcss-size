const postcss = require('postcss');

const plugin = require('./');

function run(input, output, opts = { }) {
    return postcss([ plugin(opts) ]).process(input)
        .then( result => {
            expect(result.css).toEqual(output);
            expect(result.warnings().length).toBe(0);
        });
}

it('sets width and height', () => {
    return run('a{ size: 1px 2px; }', 'a{ width: 1px; height: 2px; }');
});

it('sets width and height by one value', () => {
    return run('a{ size: 1px; }', 'a{ width: 1px; height: 1px; }');
});

it('splits values by brackets', () => {
    return run('a{ size: calc(4 * 2px)  2px; }',
                  'a{ width: calc(4 * 2px); height: 2px; }');
});

it('prefix value', () => {
    return run('a{ size: -webkit-fit-content  auto; }',
                  'a{ width: -webkit-fit-content; height: auto; }');
});

it('supports auto value', () => {
    return run('a{ size: .98%  auto; }', 'a{ width: .98%; height: auto; }');
});

it('supports !important', () => {
    return run('a{ size: 1px !important; }',
                  'a{ width: 1px !important; height: 1px !important; }');
});

it('not conflicts with @page size descriptor', () => {
    return run('@page{ size: 4cm 6cm landscape; }',
                  '@page{ size: 4cm 6cm landscape; }');
});
