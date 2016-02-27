const src = './src';
const less = `${src}/styles/styles.less`;
const javascripts = `${src}/**/*.js`;
const destination = './build'
const concatScriptName = 'concat_script.js';
const bundleMinName = 'bundle.min.js';
export const paths = {
        javascripts: javascripts,
        toWatch: [javascripts, less],
        source: src,
        destination: destination,
        js: `${src}/js/`,
        css: `${destination}/styles/`,
        bundle: `${destination}/js/`,
        concatScript: `${destination}/js/${concatScriptName}`,
        public: `${destination}/public/`,
        less: less,
        nodeServer: `./server.js`,
        server: `${src}/server/`
};

export const config = {
    isDev: true,
    defaultPort: 1407,
    concatScriptName: concatScriptName,
    bundleMinName: bundleMinName
};
