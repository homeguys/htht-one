"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _echarts = _interopRequireDefault(require("echarts/lib/echarts"));

require("echarts/lib/chart/line");

require("echarts/lib/component/tooltip");

require("echarts/lib/component/title");

var _utils = require("../../common/utils");

class ChartLine extends _react.default.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.hash = (0, _utils.createHash)(6);
    this.myChart = null;
    this.option = {
      backgroundColor: '#2c343c',
      xAxis: {
        type: 'category',
        boundaryGap: false
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        type: 'line',
        areaStyle: {
          color: '#00cccd'
        },
        lineStyle: {
          color: '#00cccd'
        }
      }]
    };
  }

  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate() {
    this.renderChart();
  }
  /** echants响应屏幕改变 */


  screenChange() {
    window.addEventListener('resize', () => {
      this.myChart.resize();
    });
  } // 渲染折线图


  renderChart() {
    const {
      dataSource,
      option
    } = this.props;
    this.myChart = _echarts.default.init(document.getElementById(`htht-chart-line-${this.hash}`));
    const newOption = (0, _utils.deepObjectMerge)(this.option, option);
    this.myChart.clear();
    newOption.xAxis.data = dataSource.xAxisData;
    newOption.series[0].data = dataSource.seriesData; // 绘制图表

    this.myChart.setOption(newOption);
    this.screenChange();
  }

  render() {
    return _react.default.createElement("div", {
      className: "htht-chart-line",
      id: `htht-chart-line-${this.hash}`
    });
  }

}

var _default = ChartLine;
exports.default = _default;