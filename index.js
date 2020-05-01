const mix = require('laravel-mix');
const Component = require('laravel-mix/src/components/Browsersync');

class BrowsersyncMulti extends Component {
  register(userConfig) {
    if (!Array.isArray(userConfig)) {
      throw new Error('Config should be an array.');
    }

    this.userConfig = {};

    let port = 3000;
    let uiPort = 3100;
    this.userConfigMulti = userConfig.map((config) => {
      config = typeof config == 'string' ? { proxy: config } : config;

      if (!config.hasOwnProperty('port')) {
        config.port = port++;
      }

      if (!(config.hasOwnProperty('ui') && config.ui.hasOwnProperty('port'))) {
        config = Object.assign(config, {
          ui: {
            port: uiPort++
          }
        })
      }

      return config;
    });
  }

  webpackPlugins() {
    let BrowserSyncPlugin = require('browser-sync-webpack-plugin');

    return this.userConfigMulti.map((config) => {
      return new BrowserSyncPlugin(Object.assign(this.config(), config), { reload: false });
    });
  }
}

mix.extend('browserSyncMulti', new BrowsersyncMulti());
