/// <binding AfterBuild='build--dev' Clean='clean' ProjectOpened='watch' />
'use strict';

let gulp = require('gulp-help')(require('gulp'), { hideDepsMessage: true, afterPrintCallback: cliNotes });
let gutil = require('gulp-util');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');
let rename = require('gulp-rename');
let sourcemaps = require('gulp-sourcemaps');
let del = require('del');
let sass = require('gulp-sass');
let sassLint = require('gulp-sass-lint');
let tsc = require('gulp-typescript');
let tslint = require('gulp-tslint');
let imagemin = require('gulp-imagemin');
let minifyHTML = require('gulp-minify-html');
let browserSync = require('browser-sync').create();
let replace = require('gulp-replace');
let inject = require('gulp-inject');
let runSequence = require('run-sequence');
let KarmaServer = require('karma').server;

const CONFIG = {
    jsLibSrc: [
    // Polyfills
        './assets/javascript/notification/notification.js',
        
    // Libs
        './assets/javascript/firebase/firebase-client.js',
        
    // Angular 2 Deps
        './node_modules/systemjs/dist/system.src.js',
        './node_modules/angular2/bundles/angular2.dev.js',
        './node_modules/angular2/bundles/router.dev.js',
        './node_modules/angular2/bundles/http.dev.js'
    ],
    typeScriptSrc: [
        './app/**/*.ts',
        './app/**/*.spec.ts',
        './typings/**/*.d.ts'
    ],
    imageSrc: [
        'assets/images/**/*'
    ],
    htmlSrc: [
        './app/**/*.html'
    ],
    fontSrc: [
        './assets/fonts/**/*.*'
    ],
    scssSrc: [
        './styles/app.scss'
    ],
    sassSrcAll: [
        './styles/**/*.scss'
    ],
    sassSrcLint:
    [
        'styles/**/*',
        '!styles/libraries/**/*',
        '!styles/_grid.scss',
        '!styles/_normalize.scss'
    ],
    buildLocations: {
        html: './build/app/',
        js: './build/app/',
        css: './build/styles/',
        img: './build/assets/images/',
        jsLib: './build/assets/javascript/',
        fonts: './build/assets/fonts/'
    }
}

const DOCS = {
    tsLint: 'Lint TypeScript to check for style and syntax errors',
    sassLint: 'Lint Sass to check for style errors',
    buildTypescript: 'Build TypeScript and compile out ES5 JavaScript',
    buildJavaScript: 'Build JavaScript and move to distribute',
    buildSass: 'Build Sass and compile out CSS',
    buildImages: 'Compress and distribute images',
    buildHtml: 'Minify and distribute HTML templates',
    buildFonts: 'Move fonts to build',
    buildInjectables: 'Build Injectables CSS, JS & HTML then inject into html',
    browserSync: 'Start up browser sync localhost',
    buildStatic: 'Build only static files where msbuild is not needed',
    clean: 'Clean the solution by removing any compiled files',
    test: 'Run unit tests',
    watch: 'Watch source files for changes and build on update',
    build: 'Production ready build. Runs client side static build.',
    buildDev: 'Development ready build. Does not minify, compress, ect',
    setProd: 'Set gulp to production ready environment',
    setDev: 'Set gulp to development ready environment'
}

gulp.task('default', false, ['help']);

gulp.task('build', DOCS.build, () => {
    runSequence(
        'clean',
        '_set.prod',
        ['_build.typescript', '_build.images', '_build.fonts', '_build.html', '_build.javascript', '_build.sass'],
        '_update.template-version',
        '_update.version'
        );
});

gulp.task('build--dev', DOCS.buildDev, () => {
    runSequence(
        'clean',
        '_set.dev',
        ['_build.typescript', '_build.images', '_build.fonts', '_build.html', '_build.javascript', '_build.sass'],
        '_update.template-version',
        '_update.version'
        );
});

gulp.task('watch', DOCS.watch, ['_browser-sync'], () => {
    gulp.watch('./styles/**/*.scss', () => runSequence('_build.sass', '_update.version'));
    gulp.watch('./app/**/*.html', () => runSequence('_build.html', '_update.template-version', '_update.version', '_browser-sync-reload'));
    gulp.watch('./app/**/*.ts', () => runSequence('_build.typescript', '_update.version', '_browser-sync-reload'));
    gulp.watch('./index.html', ['_update.version']);
});

gulp.task('tdd', DOCS.test, (done) => {
    KarmaServer.start({ port: 9876, configFile: __dirname + '/karma.conf.js' }, function (exitCode) {
        console.log('Karma has exited with ' + exitCode);
        process.exit(exitCode);
    });
});

gulp.task('clean', DOCS.clean, (done) => {
    del([
        './build/**/*',
        './app/**/*.js',
        './app/**/*.js.map'
    ], done);
});

gulp.task('_test', DOCS.test, (done) => {
    KarmaServer.start({ port: 9876, configFile: __dirname + '/karma.conf.js', singleRun: true }, function (exitCode) {
        console.log('Karma has exited with ' + exitCode);
        process.exit(exitCode);
    });
});

gulp.task('_set.prod', DOCS.setProd, () => {
    gutil.env.type = 'production';
});

gulp.task('_set.dev', DOCS.setDev, () => {
    gutil.env.type = 'development';
});

gulp.task('_ts-lint', DOCS.tsLint, () => {
    return gulp.src('./app/**/*.ts*/').pipe(tslint()).pipe(tslint.report('prose'));
});

gulp.task('_build.typescript', DOCS.buildTypescript, [], () => { // '_ts-lint'
    return gulp.src(CONFIG.typeScriptSrc)
        .pipe(tsc({
            typescript: require('typescript'),
            target: 'ES5',
            declarationFiles: false,
            experimentalDecorators: true,
            emitDecoratorMetadata: true,
            module: 'commonjs'
        }))
        .pipe(isProd() ? uglify() : gutil.noop())
        .pipe(gulp.dest(CONFIG.buildLocations.js));
});

gulp.task('_build.javascript', DOCS.buildJavaScript, () => {
    return gulp.src(CONFIG.jsLibSrc)
        .pipe(isProd() ? uglify() : gutil.noop())
        .pipe(gulp.dest(CONFIG.buildLocations.jsLib))
});

gulp.task('_sass-lint', DOCS.lintSass, () => {
    // Work in progress https://github.com/sasstools/sass-lint has a few bugs still
    gulp.src(CONFIG.sassSrcLint)
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError())
        .on('error', swallowError);
});

gulp.task('_build.sass', DOCS.buildSass, [], () => {
    return gulp.src(CONFIG.scssSrc)
        .pipe(sourcemaps.init())
        .pipe(isProd() ? sass({ outputStyle: 'compressed' }) : sass())
        .on('error', swallowError)
        .pipe(sourcemaps.write('./'))
        .pipe(rename('app.min.css'))
        .pipe(gulp.dest(CONFIG.buildLocations.css))
        .pipe(browserSync.stream());
});

gulp.task('_build.images', DOCS.buildImages, () => {
    return gulp.src(CONFIG.imageSrc)
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest(CONFIG.buildLocations.img));
});

gulp.task('_build.html', DOCS.buildHtml, () => {
    // index.html must be generated with injectibles
    return gulp.src([].concat(CONFIG.htmlSrc, '!./index.html'))
        .pipe(isProd() ? minifyHTML() : gutil.noop())
        .pipe(gulp.dest(CONFIG.buildLocations.html));
});

gulp.task('_build.fonts', DOCS.buildFonts, () => {
    return gulp.src(CONFIG.fontSrc)
        .pipe(gulp.dest(CONFIG.buildLocations.fonts));
});

gulp.task('_browser-sync', DOCS.browserSync, () => {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        logFileChanges: false
    });
});

gulp.task('_browser-sync-reload', DOCS.browserSync, () => {
    browserSync.reload();
});

gulp.task('_update.version', DOCS.buildInjectables, () => {
    let version = getVersion();
    let target = gulp.src('./app/index.html');
    let sources = gulp.src([
    // Source order matters
        './build/assets/javascript/notification.js',
        './build/assets/javascript/firebase-client.js',
        './build/assets/javascript/system.src.js',
        './build/assets/javascript/angular2.dev.js',
        './build/assets/javascript/router.dev.js',
        './build/assets/javascript/http.dev.js',

        CONFIG.buildLocations.css + '*.css'], { read: false });

    return target
        .pipe(inject(sources, {relative: true}))
        // Inject version number for ng2 app
        .pipe(replace(/\.css/g, '.css?v=' + version))
        .pipe(replace(/\.js/g, '.js?v=' + version))
        //.pipe(replace(/src="\//g, 'src="'))
        .pipe(gulp.dest('./'));
});

gulp.task('_update.template-version', DOCS.buildInjectables, () => {
    return gulp.src('build/app/**/*.js')
    // Update referenced static template versions
        .pipe(replace(/templateUrl: 'app/, "templateUrl: 'build/app"))
        .pipe(replace(/\.html/g, '.html?v=' + getVersion()))
        .pipe(gulp.dest(CONFIG.buildLocations.js));
});

function swallowError(error) {
    console.log(error.toString());

    this.emit('end');
}

function isProd() {
    return gutil.env.type === 'production'; // used to only minify if gulp is in a prod env
}

function getVersion() {
    return new Date().getTime();
}

function cliNotes() {
    console.log('  * _tasks are private sub tasks. Only use if necessary. *\n\n\n');
}