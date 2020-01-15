const { src, dest } = require("gulp");
const fs = require("fs");
const babel = require("gulp-babel");
const sass = require("gulp-sass");
const gulpif = require("gulp-if");
const autoprefixer = require("gulp-autoprefixer");
const uglify = require("gulp-uglify");
const through2 = require("through2");

const ws = fs.createWriteStream("./test.md");

function isJavaScript(file) {
  console.log(file.relative);
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
    "src/components/**/utils/*.jsx",
    "src/components/index.jsx",
    "src/components/**/demo/style/*"
  ])
    .pipe(gulpif(isJavaScript, babel()))
    .pipe(gulpif(isJavaScript, uglify()))
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
    .pipe(
      gulpif(
        isCss,
        sass.sync({ outputStyle: "expanded" }).on("error", sass.logError)
      )
    )
    .pipe(gulpif(isCss, autoprefixer()))
    .pipe(dest("lib/"));
};

// exports.default = function() {
//   return src(["src/components/time_switch/demo/style/index.jsx"])
//     .pipe(
//       through2.obj(function(chunk, enc, callback) {
//         let { contents } = chunk;
//         console.warn(contents.toString());
//         var bf = new Buffer('import "./index.css";');
//         // fs.writeFile(contents, "aa", "utf8", err => {
//         //   if (err) throw err;
//         // });
//         // for (var i = 0; i < contents.length; i++) {
//         //   if (contents[i] === 97) {
//         //     contents[i] = 122;
//         //   }
//         // }
//         contents = bf;
//         chunk.contents = contents;
//         this.push(chunk);

//         callback();
//       })
//     )
//     .pipe(dest("lib/"));
// };
