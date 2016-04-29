module.exports = {
    app: { baseName: 'app' },
    server: {
        baseDir: './',
        proxy: ''
    },
    sass: {
        src: ['./styles/**/*.scss'],
        lintSrc: [
            'styles/**/*',
            '!styles/libraries/**/*',
            '!styles/_grid.scss',
            '!styles/_normalize.scss'
        ]
    },
    typescript: {
        src: ['./app/**/*.ts', './app/**/*.spec.ts'],
        typings: [
            'typings/**',
            '!node_modules',
            '!typings/browser.d.ts',
            '!typings/browser/**'
        ]
    },
    images: {
        src: ['assets/images/**/*']
    },
    html: {
        src: ['./app/**/*.html', '!app/index.html'],
        rootSrc: './app/index.html',
        templateUrlReferences: ['dist/app/**/*.js']
    },
    font: {
        src: ['./assets/fonts/**/*.*']
    },
    javascript: {
        src: [
            // Libs
            './assets/javascript/firebase/firebase-client.js',
            './assets/javascript/notification/notification.js',
            './node_modules/chart.js/Chart.min.js',
            
            // Angular 2 Deps
            './node_modules/es6-shim/es6-shim.js',
            './node_modules/angular2/bundles/angular2-polyfills.js',
            './node_modules/systemjs/dist/system.src.js',
            './node_modules/rxjs/bundles/Rx.js',
            './node_modules/angular2/bundles/angular2.dev.js',
            './node_modules/angular2/bundles/router.dev.js',
            './node_modules/angular2/bundles/http.dev.js'
        ]
    },
    buildLocations: {
        html: './dist/base/app/',
        index: './',
        typescript: './dist/base/app/',
        css: './dist/base/styles/',
        img: './dist/base/assets/images/',
        js: './dist/base/assets/javascript/',
        fonts: './dist/base/assets/fonts/',
        clean: './dist/base/**/*'
    }
}