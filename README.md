# PostCSS Size

<img align="right" width="135" height="95"
     title="Philosopher’s stone, logo of PostCSS"
     src="https://postcss.org/logo-leftp.svg">

[PostCSS] plugin for `size` shortcut to set `width` and `height` properties.

It also handles `min-size` to set `min-width` and `min-height`, and `max-size` to set `max-width` and `max-height`.

[PostCSS]: https://github.com/postcss/postcss

```css
.two {
  size: 20px 10px;
}
.one {
  size: 10px;
}
.minmax {
  min-size: 10px;
  max-size: 200px auto;
}
```

```css
.two {
  width: 20px;
  height: 10px;
}
.one {
  width: 10px;
  height: 10px;
}
.minmax {
  min-width: 10px;
  min-height: 10px;
  max-width: 200px;
  max-height: auto;
}
```

<a href="https://evilmartians.com/?utm_source=postcss-size">
  <img src="https://evilmartians.com/badges/sponsored-by-evil-martians.svg"
       alt="Sponsored by Evil Martians" width="236" height="54">
</a>


## Usage

**Step 1:** Install plugin:

```sh
npm install --save-dev postcss postcss-size
```

**Step 2:** Check you project for existed PostCSS config: `postcss.config.js`
in the project root, `"postcss"` section in `package.json`
or `postcss` in bundle config.

If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings.

**Step 3:** Add the plugin to plugins list:

```diff
module.exports = {
  plugins: [
+   require('postcss-size'),
    require('autoprefixer')
  ]
}
```

[official docs]: https://github.com/postcss/postcss#usage
