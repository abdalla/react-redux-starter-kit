const _less = './src/styles/styles.less';
const _js = './src/**/*.js';
export const paths = {
        js: [_js],
        toWatch: [_js, _less],
        source: 'src',
        destination: './app',
        destinationServer: './server.js',
        temp: './.tmp',
        less: _less
      };
