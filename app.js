const browserSync = require('browser-sync').create();

browserSync.init({
    server: {
        baseDir: './src',
    },
    files: './src/*.(js|html)'
});