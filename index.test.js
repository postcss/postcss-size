let { equal } = require('node:assert')
let { test } = require('node:test')
let postcss = require('postcss').default

let plugin = require('./')

function run(input, output, opts) {
  let result = postcss([plugin(opts)]).process(input, { from: '/test.css' })
  equal(result.css, output)
  equal(result.warnings().length, 0)
}

test('sets width, height, min-width, min-height, max-width, max-height', () => {
  run('a{ size: 1px 2px; }', 'a{ width: 1px; height: 2px; }')
  run('a{ min-size: 1px 2px; }', 'a{ min-width: 1px; min-height: 2px; }')
  run('a{ max-size: 1px 2px; }', 'a{ max-width: 1px; max-height: 2px; }')
})

test('sets width and height by one value', () => {
  run('a{ size: 1px; }', 'a{ width: 1px; height: 1px; }')
  run('a{ min-size: 1px; }', 'a{ min-width: 1px; min-height: 1px; }')
  run('a{ max-size: 1px; }', 'a{ max-width: 1px; max-height: 1px; }')
})

test('splits values by brackets', () => {
  run(
    'a{ size: calc(4 * 2px)  2px; }',
    'a{ width: calc(4 * 2px); height: 2px; }'
  )
  run(
    'a{ min-size: calc(4 * 2px)  2px; }',
    'a{ min-width: calc(4 * 2px); min-height: 2px; }'
  )
  run(
    'a{ max-size: calc(4 * 2px)  2px; }',
    'a{ max-width: calc(4 * 2px); max-height: 2px; }'
  )
})

test('prefix value', () => {
  run(
    'a{ size: -webkit-fit-content  auto; }',
    'a{ width: -webkit-fit-content; height: auto; }'
  )
  run(
    'a{ min-size: -webkit-fit-content  auto; }',
    'a{ min-width: -webkit-fit-content; min-height: auto; }'
  )
  run(
    'a{ max-size: -webkit-fit-content  auto; }',
    'a{ max-width: -webkit-fit-content; max-height: auto; }'
  )
})

test('supports auto value', () => {
  run('a{ size: .98%  auto; }', 'a{ width: .98%; height: auto; }')
  run('a{ min-size: .98%  auto; }', 'a{ min-width: .98%; min-height: auto; }')
  run('a{ max-size: .98%  auto; }', 'a{ max-width: .98%; max-height: auto; }')
})

test('supports !important', () => {
  run(
    'a{ size: 1px !important; }',
    'a{ width: 1px !important; height: 1px !important; }'
  )
  run(
    'a{ min-size: 1px !important; }',
    'a{ min-width: 1px !important; min-height: 1px !important; }'
  )
  run(
    'a{ max-size: 1px !important; }',
    'a{ max-width: 1px !important; max-height: 1px !important; }'
  )
})

test('not conflicts with @page size descriptor', () => {
  run('@page{ size: 4cm 6cm landscape; }', '@page{ size: 4cm 6cm landscape; }')
})
