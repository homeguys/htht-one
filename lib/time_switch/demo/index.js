"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/form/style/css");

var _form = _interopRequireDefault(require("antd/lib/form"));

require("antd/lib/date-picker/style/css");

var _datePicker = _interopRequireDefault(require("antd/lib/date-picker"));

require("antd/lib/message/style/css");

var _message2 = _interopRequireDefault(require("antd/lib/message"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("antd/lib/select/style/css");

var _select = _interopRequireDefault(require("antd/lib/select"));

var _react = _interopRequireDefault(require("react"));

var _moment = _interopRequireDefault(require("moment"));

var _toast = _interopRequireDefault(require("../../utils/toast"));

var _warn_box = _interopRequireDefault(require("../../utils/warn_box"));

const {
  Option
} = _select.default;

class TimeSwitch extends _react.default.Component {
  constructor(props) {
    super(props);
    (0, _defineProperty2.default)(this, "handleChangeDate", e => {
      const {
        form
      } = this.props;
      const {
        setFieldsValue
      } = form;
      setFieldsValue({
        date: e
      });
    });
    (0, _defineProperty2.default)(this, "switchTime", e => {
      let {
        className
      } = e.target;
      const {
        form,
        times
      } = this.props;
      const {
        setFieldsValue,
        getFieldValue
      } = form;
      const currentDay = getFieldValue('switch_date').valueOf();
      const currentTime = getFieldValue('switch_time');
      let timeIndex = times.indexOf(currentTime);
      className = className.replace(/iconfont /, '');

      switch (className) {
        case 'icon_pre_day':
          {
            const newTime = currentDay - 24 * 60 * 60 * 1000;
            const newDate = new Date(newTime);
            setFieldsValue({
              switch_date: (0, _moment.default)(newDate, 'YYYY-MM-DD')
            });
            break;
          }

        case 'icon_pre_time':
          {
            timeIndex -= 1;

            if (timeIndex < 0) {
              (0, _toast.default)(_message2.default, '已经是最小时次', 'info');
              return;
            }

            setFieldsValue({
              switch_time: times[timeIndex]
            });
            break;
          }

        case 'icon_recover':
          setFieldsValue({
            switch_date: (0, _moment.default)(this.date, 'YYYY-MM-DD'),
            switch_time: times[0]
          });
          break;

        case 'icon_next_time':
          {
            timeIndex += 1;

            if (timeIndex >= times.length) {
              (0, _toast.default)(_message2.default, '已经是最大时次', 'info');
              return;
            }

            setFieldsValue({
              switch_time: times[timeIndex]
            });
            break;
          }

        case 'icon_next_day':
          {
            const newTime = currentDay + 24 * 60 * 60 * 1000;

            if (newTime > new Date().getTime()) {
              (0, _toast.default)(_message2.default, '日期不能超过今天', 'info');
              return;
            }

            const newDate = new Date(newTime);
            setFieldsValue({
              switch_date: (0, _moment.default)(newDate, 'YYYY-MM-DD')
            });
            break;
          }

        default:
          break;
      }
    });
    this.date = new Date();
  }

  componentDidMount() {
    const switchBox = document.querySelector('.htht-time-switch-vertical .switch-box');

    if (switchBox) {
      switchBox.addEventListener('click', this.switchTime, false);
    }
  }

  componentWillUnmount() {
    const switchBox = document.querySelector('.htht-time-switch-vertical .switch-box');

    if (switchBox) {
      switchBox.removeEventListener('click', this.switchTime, false);
    }
  } // 手动选择时间


  render() {
    const {
      form,
      times = []
    } = this.props; // 没传form的话警告，form必传

    if (!form) {
      return _react.default.createElement(_warn_box.default, {
        title: "\u8BF7\u4F20\u5165form"
      });
    }

    const {
      getFieldDecorator
    } = form;
    return _react.default.createElement("div", {
      className: "htht-time-switch htht-time-switch-vertical"
    }, _react.default.createElement("div", {
      className: "date-box"
    }, _react.default.createElement("div", {
      className: "item"
    }, _react.default.createElement("span", {
      className: "title"
    }, "\u65F6\u95F4\u9009\u62E9\uFF1A"), _react.default.createElement(_form.default.Item, null, getFieldDecorator('switch_date', {
      rules: [{
        required: true,
        message: '请输入开始时间！'
      }],
      initialValue: (0, _moment.default)(this.date, 'YYYY-MM-DD')
    })(_react.default.createElement(_datePicker.default, {
      showToday: false,
      format: "YYYY-MM-DD",
      allowClear: false,
      style: {
        width: '1.4rem'
      },
      onChange: this.handleChangeDate
    })))), _react.default.createElement("div", {
      className: "item"
    }, _react.default.createElement(_form.default.Item, null, getFieldDecorator('switch_time', {
      rules: [{
        required: true,
        message: '请输入时次！'
      }],
      initialValue: times[0] // 默认选中时次数组第一个

    })(_react.default.createElement(_select.default, {
      placeholder: "\u8BF7\u9009\u62E9\u4E0B\u62C9",
      style: {
        width: '100%'
      }
    }, times.map(item => _react.default.createElement(Option, {
      key: item
    }, item))))))), _react.default.createElement("div", {
      className: "switch-box"
    }, _react.default.createElement("span", {
      className: "iconfont icon_pre_day",
      title: "\u524D\u4E00\u5929"
    }), _react.default.createElement("span", {
      className: "iconfont icon_pre_time",
      title: "\u524D\u4E00\u65F6\u6B21"
    }), _react.default.createElement("span", {
      className: "iconfont icon_recover",
      title: "\u6062\u590D"
    }), _react.default.createElement("span", {
      className: "iconfont icon_next_time",
      title: "\u540E\u4E00\u65F6\u6B21"
    }), _react.default.createElement("span", {
      className: "iconfont icon_next_day",
      title: "\u540E\u4E00\u5929"
    })));
  }

}

var _default = TimeSwitch;
exports.default = _default;