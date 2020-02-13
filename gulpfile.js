const { src, dest } = require("gulp");
const fs = require("fs");
const babel = require("gulp-babel");
const sass = require("gulp-sass");
const gulpif = require("gulp-if");
const autoprefixer = require("gulp-autoprefixer");
const uglify = require("gulp-uglify");
const through2 = require("through2");

function isJavaScript(file) {
  return file.extname === ".jsx";
}

function isCss(file) {
  const cssRegex = /\.(scss|sass|css)$/;
  return cssRegex.test(file.extname);
}

function isStyleIndexJs(file) {
  return isJavaScript(file) && file.path.match(/(\/|\\)style(\/|\\)index\.jsx/);
}

// eslint-disable-next-line func-names
exports.default = function() {
  return src([
    "src/components/**/demo/index.jsx",
    "src/components/**/common/*.jsx",
    "src/components/index.jsx",
    "src/components/**/demo/style/*"
  ])
    .pipe(
      gulpif(
        isStyleIndexJs,
        through2.obj(function(chunk, enc, callback) {
          let { contents } = chunk;
          var bf = new Buffer('import "./index.css";');
          contents = bf;
          chunk.contents = contents;
          this.push(chunk);
          callback();
        })
      )
    )
    .pipe(gulpif(isJavaScript, babel()))
    .pipe(gulpif(isJavaScript, uglify()))
    .pipe(
      gulpif(
        isCss,
        sass.sync({ outputStyle: "expanded" }).on("error", sass.logError)
      )
    )
    .pipe(gulpif(isCss, autoprefixer()))
    .pipe(dest("lib/"));
};
