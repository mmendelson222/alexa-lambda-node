var fs = require('fs')
var path = require('path')
var gulp = require('gulp')
var $ = require('gulp-load-plugins')()

gulp.task('upload', function ( cb ) {

  var config = JSON.parse(fs.readFileSync('config.json','utf8'));

  var opts = {
    profile: config.awsProfileName
  }

  //ADD ANY ADDITIONAL LIBRARIES HERE.
  var sources = [
    './src/**/*.{js,json}',
    './node_modules/alexa-sdk/**/*.js'
  ]

  return gulp.src(sources, { base: "." })
    .pipe(
      $.rename( function ( path ) {
		path.dirname = path.dirname.replace('src', '' ); //for mac
        //path.dirname = path.dirname.replace('src\\skill', '' ); //for windows
      })
    )
    .pipe( $.zip('dist.zip') )
    .pipe( $.awslambda( config.lambdaName, opts ) )
    .pipe( gulp.dest('./src') )
})
