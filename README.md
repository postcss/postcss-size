# PostCSS Size [![Build Status][ci-img]][ci]

<img align="right" width="135" height="95"
     title="Philosopher’s stone, logo of PostCSS"
     src="http://postcss.github.io/postcss/logo-leftp.png">

[PostCSS] plugin for `size` shortcut to set `width` and `height` properties.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/postcss/postcss-size.svg
[ci]:      https://travis-ci.org/postcss/postcss-size

```css
.two {
    size: 20px 10px;
}
.one {
    size: 10px;
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
```

## Usage

```js
postcss([ require('postcss-size') ])
```

See [PostCSS] docs for examples for your environment.
