const src = './src';
const less = `${src}/styles/styles.less`;
const js = `${src}/**/*.js`;
const destination = './build'
export const paths = {
        js: [js],
        toWatch: [js, less],
        source: src,
        destination: destination,
        css: `${destination}/styles/`,
        bundle: `${destination}/js/`,
        public: `${destination}/public/`,
        less: less,
        nodeServer: `${destination}/server.js`,
        server: `${src}/server/`
};

export const config = {
    isDev: true,
    defaultPort: 1407
};
