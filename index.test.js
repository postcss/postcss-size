let postcss = require('postcss')

let plugin = require('./')

async function run (input, output) {
  let result = await postcss([plugin]).process(input, { from: undefined })
  expect(result.css).toEqual(output)
  expect(result.warnings()).toHaveLength(0)
}

it('sets width and height', async () => {
  await run('a{ size: 1px 2px; }', 'a{ width: 1px; height: 2px; }')
})

it('sets width and height by one value', async () => {
  await run('a{ size: 1px; }', 'a{ width: 1px; height: 1px; }')
})

it('splits values by brackets', async () => {
  await run(
    'a{ size: calc(4 * 2px)  2px; }',
    'a{ width: calc(4 * 2px); height: 2px; }'
  )
})

it('prefix value', async () => {
  await run(
    'a{ size: -webkit-fit-content  auto; }',
    'a{ width: -webkit-fit-content; height: auto; }'
  )
})

it('supports auto value', async () => {
  await run('a{ size: .98%  auto; }', 'a{ width: .98%; height: auto; }')
})

it('supports !important', async () => {
  await run(
    'a{ size: 1px !important; }',
    'a{ width: 1px !important; height: 1px !important; }'
  )
})

it('not conflicts with @page size descriptor', async () => {
  await run(
    '@page{ size: 4cm 6cm landscape; }',
    '@page{ size: 4cm 6cm landscape; }'
  )
})
