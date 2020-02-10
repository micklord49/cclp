const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react('resources/js/app.js', 'public/js')
   .react('resources/js/admin.js', 'public/js')
   .react('resources/js/profile.js', 'public/js')
   .react('resources/js/people.js', 'public/js')
   .react('resources/js/councillor.js', 'public/js')
   .react('resources/js/branch.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css');
