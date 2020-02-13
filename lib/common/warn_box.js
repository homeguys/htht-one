"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = WarnBox;

var _react = _interopRequireDefault(require("react"));

function WarnBox(props) {
  const {
    title
  } = props;
  return _react.default.createElement("div", {
    style: {
      color: 'red'
    }
  }, title);
}