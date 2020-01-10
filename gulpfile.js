const { src, dest } = require("gulp");
const babel = require("gulp-babel");
const sass = require("gulp-sass");
const gulpif = require("gulp-if");
const autoprefixer = require("gulp-autoprefixer");
// const uglify = require("gulp-uglify");
// const cleanCSS = require("gulp-clean-css");

function isJavaScript(file) {
  // 判断文件的扩展名是否是 '.jsx'
  return file.extname === ".jsx";
}

function isCss(file) {
  // 判断文件的扩展名是否是css文件
  const cssRegex = /\.(scss|sass|css)$/;
  return cssRegex.test(file.extname);
}

// eslint-disable-next-line func-names
exports.default = function() {
  return (
    src([
      "src/components/**/demo/index.jsx",
      "src/components/**/utils/*.jsx",
      "src/components/*.jsx",
      "src/components/**/style/*"
    ])
      .pipe(gulpif(isJavaScript, babel()))
      // .pipe(gulpif(isJavaScript, uglify()))
      .pipe(
        gulpif(
          isCss,
          sass.sync({ outputStyle: "expanded" }).on("error", sass.logError)
        )
      )
      .pipe(gulpif(isCss, autoprefixer()))
      // .pipe(gulpif(isCss, cleanCSS({ compatibility: "ie8" })))
      .pipe(dest("lib/"))
  );
};
