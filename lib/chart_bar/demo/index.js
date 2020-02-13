"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _echarts = _interopRequireDefault(require("echarts/lib/echarts"));

require("echarts/lib/chart/bar");

require("echarts/lib/component/tooltip");

require("echarts/lib/component/title");

require("echarts/lib/component/legend");

var _utils = require("../../common/utils");

class ChartBar extends _react.default.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.hash = (0, _utils.createHash)(8);
    this.myChart = null;
    this.option = {
      backgroundColor: '#2c343c',
      tooltip: {
        trigger: 'item'
      },
      grid: {
        left: '7%',
        bottom: '0%',
        top: '8%',
        right: '5%',
        containLabel: true
      },
      xAxis: {
        axisLabel: {
          textStyle: {
            color: '#FFF'
          },
          rotate: 30
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#454A5C'
          }
        }
      },
      yAxis: {
        axisLine: {
          show: true,
          lineStyle: {
            color: '#454A5C'
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: '#FFF'
          }
        }
      },
      series: [{
        type: 'bar',
        barWidth: 30,
        itemStyle: {
          normal: {
            color: new _echarts.default.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#83bff6'
            }, {
              offset: 0.5,
              color: '#188df0'
            }, {
              offset: 1,
              color: '#188df0'
            }])
          },
          emphasis: {
            color: new _echarts.default.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#2378f7'
            }, {
              offset: 0.7,
              color: '#2378f7'
            }, {
              offset: 1,
              color: '#83bff6'
            }])
          }
        }
      } // {
      //   // For shadow
      //   type: 'bar',
      //   itemStyle: {
      //     normal: { color: '#595A62' }
      //   },
      //   barGap: '-100%',
      //   barCategoryGap: '50%',
      //   data: dataShadow
      // }
      ]
    };
  }

  componentDidMount() {
    this.renderCharts();
  }

  componentDidUpdate() {
    this.renderCharts();
  }
  /** echants响应屏幕改变 */


  screenChange() {
    window.addEventListener('resize', () => {
      this.myChart.resize();
    });
  } // 渲染柱状图


  renderCharts() {
    const {
      dataSource,
      option
    } = this.props;
    this.myChart = _echarts.default.init(document.getElementById(`htht-chart-bar-${this.hash}`));
    const newOption = (0, _utils.deepObjectMerge)(this.option, option);
    newOption.xAxis.data = dataSource.xAxisData;
    newOption.series[0].data = dataSource.seriesData;
    this.myChart.clear(); // 绘制图表

    this.myChart.setOption(newOption);
    this.screenChange();
  }

  render() {
    return _react.default.createElement("div", {
      className: "htht-chart-bar",
      id: `htht-chart-bar-${this.hash}`
    });
  }

}

var _default = ChartBar;
exports.default = _default;