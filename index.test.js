let postcss = require('postcss')

let plugin = require('./')

async function run (input, output) {
  let result = await postcss([plugin]).process(input, { from: undefined })
  expect(result.css).toEqual(output)
  expect(result.warnings()).toHaveLength(0)
}

it('sets width, height, min-width, min-height, max-width, max-height', async () => {
  await run('a{ size: 1px 2px; }', 'a{ width: 1px; height: 2px; }')
  await run('a{ min-size: 1px 2px; }', 'a{ min-width: 1px; min-height: 2px; }')
  await run('a{ max-size: 1px 2px; }', 'a{ max-width: 1px; max-height: 2px; }')
})

it('sets width and height by one value', async () => {
  await run('a{ size: 1px; }', 'a{ width: 1px; height: 1px; }')
  await run('a{ min-size: 1px; }', 'a{ min-width: 1px; min-height: 1px; }')
  await run('a{ max-size: 1px; }', 'a{ max-width: 1px; max-height: 1px; }')
})

it('splits values by brackets', async () => {
  await run(
    'a{ size: calc(4 * 2px)  2px; }',
    'a{ width: calc(4 * 2px); height: 2px; }'
  )
  await run(
    'a{ min-size: calc(4 * 2px)  2px; }',
    'a{ min-width: calc(4 * 2px); min-height: 2px; }'
  )
  await run(
    'a{ max-size: calc(4 * 2px)  2px; }',
    'a{ max-width: calc(4 * 2px); max-height: 2px; }'
  )
})

it('prefix value', async () => {
  await run(
    'a{ size: -webkit-fit-content  auto; }',
    'a{ width: -webkit-fit-content; height: auto; }'
  )
  await run(
    'a{ min-size: -webkit-fit-content  auto; }',
    'a{ min-width: -webkit-fit-content; min-height: auto; }'
  )
  await run(
    'a{ max-size: -webkit-fit-content  auto; }',
    'a{ max-width: -webkit-fit-content; max-height: auto; }'
  )
})

it('supports auto value', async () => {
  await run('a{ size: .98%  auto; }', 'a{ width: .98%; height: auto; }')
  await run(
    'a{ min-size: .98%  auto; }',
    'a{ min-width: .98%; min-height: auto; }'
  )
  await run(
    'a{ max-size: .98%  auto; }',
    'a{ max-width: .98%; max-height: auto; }'
  )
})

it('supports !important', async () => {
  await run(
    'a{ size: 1px !important; }',
    'a{ width: 1px !important; height: 1px !important; }'
  )
  await run(
    'a{ min-size: 1px !important; }',
    'a{ min-width: 1px !important; min-height: 1px !important; }'
  )
  await run(
    'a{ max-size: 1px !important; }',
    'a{ max-width: 1px !important; max-height: 1px !important; }'
  )
})

it('not conflicts with @page size descriptor', async () => {
  await run(
    '@page{ size: 4cm 6cm landscape; }',
    '@page{ size: 4cm 6cm landscape; }'
  )
})
