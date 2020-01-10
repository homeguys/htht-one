"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("antd/lib/form/style/css");

var _form = _interopRequireDefault(require("antd/lib/form"));

require("antd/lib/select/style/css");

var _select = _interopRequireDefault(require("antd/lib/select"));

var _react = _interopRequireDefault(require("react"));

var _warn_box = _interopRequireDefault(require("../../utils/warn_box"));

/* eslint-disable react/no-unused-state */
const {
  Option
} = _select.default;
const FormItem = _form.default.Item;

class LinkageSelect extends _react.default.Component {
  constructor(props) {
    super(props);
    (0, _defineProperty2.default)(this, "handlelevelChange", (type, value) => {
      const {
        form,
        dataSource
      } = this.props;
      const {
        setFieldsValue
      } = form;

      if (type === 'province') {
        dataSource.forEach(item => {
          if (item.value === value) {
            setFieldsValue({
              province: item.value,
              city: item.children[0].value,
              county: item.children[0].children[0].value
            });
            this.setState({
              levelTwoArr: item.children,
              levelThreeArr: item.children[0].children
            });
          }
        });
      } else if (type === 'city') {
        const {
          levelTwoArr
        } = this.state;
        levelTwoArr.forEach(item => {
          if (item.value === value) {
            setFieldsValue({
              city: item.value,
              county: item.children[0].value
            });
            this.setState({
              levelThreeArr: item.children
            });
          }
        });
      } else {
        setFieldsValue({
          county: value
        });
      }
    });
    this.state = {
      levelOne: '',
      levelTwo: '',
      levelThree: '',
      levelOneArr: [],
      levelTwoArr: [],
      levelThreeArr: [],
      dataSource: []
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      dataSource
    } = nextProps;

    if ('dataSource' in nextProps && nextProps.dataSource !== prevState.dataSource) {
      if (!Array.isArray(dataSource)) {
        return {
          dataSource
        };
      }

      return {
        dataSource,
        levelOne: dataSource[0].value,
        levelTwo: dataSource[0].children[0].value,
        levelThree: dataSource[0].children[0].children[0].value,
        levelOneArr: dataSource,
        levelTwoArr: dataSource[0].children,
        levelThreeArr: dataSource[0].children[0].children
      };
    }

    return prevState;
  } // 三级联动切换


  render() {
    const {
      form
    } = this.props;
    const {
      dataSource
    } = this.state; // 没传form的话警告，form必传

    if (!form) {
      return _react.default.createElement(_warn_box.default, {
        title: "\u8BF7\u4F20\u5165form"
      });
    } // 如果dataSource传入的不是数组，返回警告


    if (!Array.isArray(dataSource)) {
      return _react.default.createElement(_warn_box.default, {
        title: "dataSource\u4E0D\u662F\u4E00\u4E2A\u6570\u7EC4"
      });
    }

    const {
      getFieldDecorator
    } = form;
    const {
      levelOne,
      levelTwo,
      levelThree,
      levelOneArr,
      levelTwoArr,
      levelThreeArr
    } = this.state;
    return _react.default.createElement("div", {
      className: "htht-linkage-select"
    }, _react.default.createElement("div", {
      className: "item"
    }, _react.default.createElement("span", {
      className: "title"
    }, "\u7701\uFF1A"), _react.default.createElement(FormItem, null, getFieldDecorator('province', {
      rules: [{
        required: true,
        message: '请输入省！'
      }],
      initialValue: levelOne
    })(_react.default.createElement(_select.default, {
      style: {
        width: 120
      },
      onChange: value => {
        this.handlelevelChange('province', value);
      }
    }, levelOneArr.map(item => _react.default.createElement(Option, {
      key: item.value
    }, item.name)))))), _react.default.createElement("div", {
      className: "item"
    }, _react.default.createElement("span", {
      className: "title"
    }, "\u5E02\uFF1A"), _react.default.createElement(FormItem, null, getFieldDecorator('city', {
      rules: [{
        required: true,
        message: '请输入市！'
      }],
      initialValue: levelTwo
    })(_react.default.createElement(_select.default, {
      style: {
        width: 120
      },
      onChange: value => {
        this.handlelevelChange('city', value);
      }
    }, levelTwoArr.map(item => _react.default.createElement(Option, {
      key: item.value
    }, item.name)))))), _react.default.createElement("div", {
      className: "item"
    }, _react.default.createElement("span", {
      className: "title"
    }, "\u53BF\uFF1A"), _react.default.createElement(FormItem, null, getFieldDecorator('county', {
      rules: [{
        required: true,
        message: '请输入县！'
      }],
      initialValue: levelThree
    })(_react.default.createElement(_select.default, {
      style: {
        width: 120
      },
      onChange: value => {
        this.handlelevelChange('county', value);
      }
    }, levelThreeArr.map(item => _react.default.createElement(Option, {
      key: item.value
    }, item.name)))))));
  }

}

var _default = LinkageSelect;
exports.default = _default;