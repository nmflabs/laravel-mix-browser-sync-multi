# Laravel Mix BrowserSync Multi

This extension gives a capability to run multiple BrowserSync instance in your Mix.

## Usage

First, install the extension.

```
yarn add laravel-mix-browser-sync-multi --dev
```

Then, require it within your `webpack.mix.js` file, like so:

```js
let mix = require('laravel-mix');

require('laravel-mix-browser-sync-multi');

mix
    .js('resources/js/app.js', 'public/js')
    .less('resources/less/app.less', 'public/css')
    .browserSyncMulti([
        'first-site.test',
        'second-site.test'
    ])
```

And you're done! Compile everything down with `yarn run watch`.
