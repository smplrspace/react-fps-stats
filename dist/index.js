"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function FPSStats(_ref) {
  var _ref$top = _ref.top,
      top = _ref$top === void 0 ? 0 : _ref$top,
      _ref$right = _ref.right,
      right = _ref$right === void 0 ? 'auto' : _ref$right,
      _ref$bottom = _ref.bottom,
      bottom = _ref$bottom === void 0 ? 'auto' : _ref$bottom,
      _ref$left = _ref.left,
      left = _ref$left === void 0 ? 0 : _ref$left,
      _ref$graphHeight = _ref.graphHeight,
      graphHeight = _ref$graphHeight === void 0 ? 29 : _ref$graphHeight,
      _ref$graphWidth = _ref.graphWidth,
      graphWidth = _ref$graphWidth === void 0 ? 70 : _ref$graphWidth;

  var _useState = (0, _react.useState)({
    frames: 0,
    prevTime: Date.now(),
    fps: []
  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var requestRef = (0, _react.useRef)();

  var calcFPS = function calcFPS() {
    setState(function (_ref2) {
      var frames = _ref2.frames,
          fps = _ref2.fps,
          prevTime = _ref2.prevTime;
      var currentTime = Date.now();

      if (currentTime > prevTime + 1000) {
        var lastFPS = Math.round(frames * 1000 / (currentTime - prevTime));
        return {
          fps: [].concat(_toConsumableArray(fps), [lastFPS]).slice(-graphWidth),
          frames: 0,
          prevTime: currentTime
        };
      } else {
        return {
          prevTime: prevTime,
          fps: fps,
          frames: frames + 1
        };
      }
    });
    requestRef.current = requestAnimationFrame(calcFPS);
  };

  (0, _react.useEffect)(function () {
    requestRef.current = requestAnimationFrame(calcFPS);
    return function () {
      return cancelAnimationFrame(requestRef.current);
    };
  }, []);
  var fps = state.fps;
  var MaxFPS = Math.max.apply(Math, _toConsumableArray(fps));
  var FPSlen = fps.length;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      zIndex: 999999,
      position: 'fixed',
      height: '46px',
      width: "".concat(graphWidth + 6, "px"),
      padding: '3px',
      backgroundColor: '#000',
      color: '#00ffff',
      fontSize: '9px',
      lineHeight: '10px',
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontWeight: 'bold',
      boxSizing: 'border-box',
      pointerEvents: 'none',
      top: top,
      right: right,
      bottom: bottom,
      left: left
    }
  }, /*#__PURE__*/React.createElement("span", null, fps[FPSlen - 1], " FPS"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '3px',
      right: '3px',
      bottom: '3px',
      height: "".concat(graphHeight, "px"),
      backgroundColor: '#282844',
      MozBoxSizing: 'border-box',
      boxSizing: 'border-box'
    }
  }, fps.map(function (frame, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: "fps-".concat(i),
      style: {
        position: 'absolute',
        bottom: '0',
        right: "".concat(FPSlen - 1 - i, "px"),
        height: "".concat(graphHeight * frame / MaxFPS, "px"),
        width: '1px',
        backgroundColor: '#00ffff',
        MozBoxSizing: 'border-box',
        boxSizing: 'border-box'
      }
    });
  })));
}

var _default = FPSStats;
exports["default"] = _default;