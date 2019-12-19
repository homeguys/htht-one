"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _antd = require("antd");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HorizontalTimeChoice = function (_React$Component) {
  _inherits(HorizontalTimeChoice, _React$Component);

  function HorizontalTimeChoice() {
    _classCallCheck(this, HorizontalTimeChoice);

    return _possibleConstructorReturn(this, (HorizontalTimeChoice.__proto__ || Object.getPrototypeOf(HorizontalTimeChoice)).apply(this, arguments));
  }

  _createClass(HorizontalTimeChoice, [{
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "render",
    value: function render() {
      var form = this.props.form;
      var getFieldDecorator = form.getFieldDecorator;


      return _react2.default.createElement(
        "div",
        { className: "htht-time-choice htht-time-choice-horizontal" },
        _react2.default.createElement(
          "div",
          { className: "item" },
          _react2.default.createElement(
            "span",
            { className: "title" },
            "\u65F6\u95F4\u9009\u62E9\uFF1A"
          ),
          _react2.default.createElement(
            _antd.Form.Item,
            null,
            getFieldDecorator("startTime", {
              rules: [{ required: true, message: "请输入开始时间！" }]
            })(_react2.default.createElement(_antd.DatePicker, {
              showToday: false,
              format: "YYYY-MM-DD",
              allowClear: false,
              style: { width: "1.4rem" }
            }))
          ),
          _react2.default.createElement(
            "span",
            { className: "gap" },
            "-"
          ),
          _react2.default.createElement(
            _antd.Form.Item,
            null,
            getFieldDecorator("endTime", {
              rules: [{ required: true, message: "请输入结束时间！" }]
            })(_react2.default.createElement(_antd.DatePicker, {
              showToday: false,
              format: "YYYY-MM-DD",
              allowClear: false,
              style: { width: "1.4rem" }
            }))
          )
        )
      );
    }
  }]);

  return HorizontalTimeChoice;
}(_react2.default.Component);

exports.default = _antd.Form.create({ name: "time_choice_horizontal" })(HorizontalTimeChoice);