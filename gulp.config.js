const _less = './src/styles/styles.less';
const _js = './src/**/*.js';
export const paths = {
        js: [_js],
        toWatch: [_js, _less],
        source: 'src/',
        destination: './app/',
        css: './app/styles/',
        less: _less,
        nodeServer: './server.js',
        server: './src/server/',
        publicFolder: './public/'
};

export const config = {
    isDev: true,
    defaultPort: 1407
};
