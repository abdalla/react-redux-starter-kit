const src = './src';
const less = `${src}/styles/styles.less`;
const javascripts = `${src}/**/*.js`;
const destination = './build'
const concatScriptName = 'concat_script.js';
const bundleMinName = 'bundle.min.js';
const temp = '.temp';
export const paths = {
        javascripts: javascripts,
        toWatch: [javascripts, less],
        source: src,
        destination: destination,
        public: `${destination}/public/`,
        allPublicFile: `${src}/public/**/*.*`,
        js: `${src}/js/`,
        css: `${destination}/styles/`,
        cssTemp: `${temp}/styles/`,
        bundle: `${destination}/js/`,
        bundleTemp: `${temp}/js/`,
        bundleMin: `${destination}/js/${bundleMinName}`,
        concatScript: `${temp}/js/${concatScriptName}`,
        public: `${destination}/public/`,
        srcPublicHtml: `${src}/public/index.html`,
        manifest: `${destination}/rev-manifest.json`,
        less: less,
        nodeServer: `./server.js`,
        server: `${src}/server/`,
        temp: `${temp}`
};

export const config = {
    isDev: true,
    defaultPort: 1407,
    concatScriptName: concatScriptName,
    bundleMinName: bundleMinName
};
