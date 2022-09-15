"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

  var _useReducer = (0, _react.useReducer)(function (state) {
    var currentTime = Date.now();

    if (currentTime > state.prevTime + 1000) {
      var nextFPS = [].concat(_toConsumableArray(new Array(Math.floor((currentTime - state.prevTime - 1000) / 1000)).fill(0)), [Math.max(1, Math.round(state.frames * 1000 / (currentTime - state.prevTime)))]);
      return {
        max: Math.max.apply(Math, [state.max].concat(_toConsumableArray(nextFPS))),
        len: Math.min(state.len + nextFPS.length, graphWidth),
        fps: [].concat(_toConsumableArray(state.fps), _toConsumableArray(nextFPS)).slice(-graphWidth),
        frames: 1,
        prevTime: currentTime
      };
    } else {
      return _objectSpread(_objectSpread({}, state), {}, {
        frames: state.frames + 1
      });
    }
  }, {
    len: 0,
    max: 0,
    frames: 0,
    prevTime: Date.now(),
    fps: []
  }),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var requestRef = (0, _react.useRef)();

  var tick = function tick() {
    dispatch();
    requestRef.current = requestAnimationFrame(tick);
  };

  (0, _react.useEffect)(function () {
    requestRef.current = requestAnimationFrame(tick);
    return function () {
      return cancelAnimationFrame(requestRef.current);
    };
  }, []);
  var fps = state.fps,
      max = state.max,
      len = state.len;
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      zIndex: 999999,
      position: 'fixed',
      height: 46,
      width: graphWidth + 6,
      padding: 3,
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
  }, /*#__PURE__*/_react["default"].createElement("span", null, fps[len - 1], " FPS"), /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      position: 'absolute',
      left: 3,
      right: 3,
      bottom: 3,
      height: graphHeight,
      background: '#282844',
      boxSizing: 'border-box'
    }
  }, fps.map(function (frame, i) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: "fps-".concat(i),
      style: {
        position: 'absolute',
        bottom: 0,
        right: "".concat(len - 1 - i, "px"),
        height: "".concat(graphHeight * frame / max, "px"),
        width: 1,
        background: '#00ffff',
        boxSizing: 'border-box'
      }
    });
  })));
}

FPSStats.propTypes = {
  top: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  right: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  bottom: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  left: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  graphHeight: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  graphWidth: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number])
};
var _default = FPSStats;
exports["default"] = _default;