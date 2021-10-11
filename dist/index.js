"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GRAPH_HEIGHT = 29;
var GRAPH_WIDTH = 70;

var FPSStats =
/*#__PURE__*/
function (_Component) {
  _inherits(FPSStats, _Component);

  function FPSStats(props) {
    var _this;

    _classCallCheck(this, FPSStats);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FPSStats).call(this, props));
    var currentTime = +new Date();
    _this.state = {
      frames: 0,
      startTime: currentTime,
      prevTime: currentTime,
      fps: []
    };
    return _this;
  }

  _createClass(FPSStats, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return this.state.fps !== nextState.fps || this.props !== nextProps;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var onRequestAnimationFrame = function onRequestAnimationFrame() {
        _this2.calcFPS();

        _this2.afRequest = window.requestAnimationFrame(onRequestAnimationFrame);
      };

      this.afRequest = window.requestAnimationFrame(onRequestAnimationFrame);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.cancelAnimationFrame(this.afRequest);
    }
  }, {
    key: "calcFPS",
    value: function calcFPS() {
      var currentTime = Date.now();
      this.setState(function (state) {
        return {
          frames: state.frames + 1
        };
      });

      if (currentTime > this.state.prevTime + 1000) {
        var lastFps = Math.round(this.state.frames * 1000 / (currentTime - this.state.prevTime));
        var fps = this.state.fps;
        fps.push(lastFps);
        this.setState({
          fps: fps.slice(-GRAPH_WIDTH),
          frames: 0,
          prevTime: currentTime
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          top = _this$props.top,
          right = _this$props.right,
          bottom = _this$props.bottom,
          left = _this$props.left;
      var fps = this.state.fps;
      var wrapperStyle = {
        zIndex: 999999,
        position: 'fixed',
        height: '46px',
        width: GRAPH_WIDTH + 6 + 'px',
        padding: '3px',
        backgroundColor: '#000',
        color: '#00ffff',
        fontSize: '9px',
        lineHeight: '10px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 'bold',
        MozBoxSizing: 'border-box',
        boxSizing: 'border-box',
        pointerEvents: 'none',
        top: top,
        right: right,
        bottom: bottom,
        left: left
      };
      var graphStyle = {
        position: 'absolute',
        left: '3px',
        right: '3px',
        bottom: '3px',
        height: GRAPH_HEIGHT + 'px',
        backgroundColor: '#282844',
        MozBoxSizing: 'border-box',
        boxSizing: 'border-box'
      };

      var barStyle = function barStyle(height, i) {
        return {
          position: 'absolute',
          bottom: '0',
          right: fps.length - 1 - i + 'px',
          height: height + 'px',
          width: '1px',
          backgroundColor: '#00ffff',
          MozBoxSizing: 'border-box',
          boxSizing: 'border-box'
        };
      };

      var maxFps = Math.max.apply(Math.max, fps);
      return _react.default.createElement("div", {
        style: wrapperStyle
      }, _react.default.createElement("span", null, fps[fps.length - 1], " FPS"), _react.default.createElement("div", {
        style: graphStyle
      }, fps.map(function (fps, i) {
        var height = GRAPH_HEIGHT * fps / maxFps;
        return _react.default.createElement("div", {
          key: "fps-".concat(i),
          style: barStyle(height, i)
        });
      })));
    }
  }]);

  return FPSStats;
}(_react.Component);

_defineProperty(FPSStats, "propTypes", {
  top: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  bottom: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  right: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  left: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])
});

_defineProperty(FPSStats, "defaultProps", {
  top: 0,
  left: 0,
  bottom: 'auto',
  right: 'auto'
});

var _default = FPSStats;
exports.default = _default;