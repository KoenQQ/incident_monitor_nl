/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatefrontend"]("main",{

/***/ "./components/Elements/FilterSelector.js":
/*!***********************************************!*\
  !*** ./components/Elements/FilterSelector.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var rsuite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rsuite */ \"./node_modules/rsuite/es/Slider/index.js\");\n/* harmony import */ var rsuite__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rsuite */ \"./node_modules/rsuite/es/Input/index.js\");\n/* harmony import */ var rsuite__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rsuite */ \"./node_modules/rsuite/es/Checkbox/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var rsuite_dist_styles_rsuite_default_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rsuite/dist/styles/rsuite-default.css */ \"./node_modules/rsuite/dist/styles/rsuite-default.css\");\n/* provided dependency */ var console = __webpack_require__(/*! console-browserify */ \"./node_modules/console-browserify/index.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n// https://rsuitejs.com/components/slider/\n// dit component voorzien variabelen voor de search query\n\n\n\n\nvar FilterSelector = /*#__PURE__*/function (_React$Component) {\n  _inherits(FilterSelector, _React$Component);\n\n  var _super = _createSuper(FilterSelector);\n\n  function FilterSelector(props) {\n    var _this;\n\n    _classCallCheck(this, FilterSelector);\n\n    _this = _super.call(this, props); // console.log(this.props)\n\n    _defineProperty(_assertThisInitialized(_this), \"sendSearchRangeChange\", function (e) {\n      _this.props.searchRangeChange(e);\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"sendDateRangeChange\", function (e) {\n      _this.props.dateRangeChange(e);\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"sendWordSearchChange\", function (e) {\n      _this.props.wordSearchChange(e);\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"sendIncludePoliceChange\", function (e) {\n      _this.props.includePoliceChange(e);\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"sendIncludeFireChange\", function (e) {\n      _this.props.includeFireChange(e); // console.log(e)\n\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"sendIncludeAmbuChange\", function (e) {\n      _this.props.includeAmbuChange(e);\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"handleFireChange\", function (event) {\n      _this.setState(function (prevState) {\n        return _objectSpread(_objectSpread({}, prevState), {}, {\n          checkboxFire: !prevState.checkboxFire\n        });\n      }); // console.log('handle fire change ' + this.state.checkboxFire)\n\n\n      _this.sendIncludeFireChange(_this.state.checkboxFire);\n    });\n\n    _this.state = {\n      checkboxFire: true\n    };\n    return _this;\n  }\n\n  _createClass(FilterSelector, [{\n    key: \"render\",\n    value: function render() {\n      var _this2 = this;\n\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", null, \"How big is the search area in km?\", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(rsuite__WEBPACK_IMPORTED_MODULE_2__.default, {\n        progress: true,\n        min: 0.5,\n        step: 0.5,\n        max: 20,\n        defaultValue: 1,\n        onChange: function onChange(value) {\n          console.log(\"radius \" + value);\n\n          _this2.sendSearchRangeChange(value);\n\n          console.log(_this2.props.searchRanged);\n        }\n      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"br\", null), \"Look back how many days?\", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(rsuite__WEBPACK_IMPORTED_MODULE_2__.default, {\n        progress: true,\n        defaultValue: 30,\n        min: 0,\n        max: 50,\n        onChange: function onChange(value) {\n          console.log(\"date range \" + value);\n\n          _this2.sendDateRangeChange(value);\n\n          console.log(_this2.props.dateRanged);\n        }\n      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"br\", null), \"Filter on other words/values\", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(rsuite__WEBPACK_IMPORTED_MODULE_3__.default, {\n        placeholder: \"ex. 'Brand'\",\n        onChange: function onChange(value) {\n          _this2.sendWordSearchChange(value);\n        }\n      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"br\", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(rsuite__WEBPACK_IMPORTED_MODULE_4__.default, {\n        defaultChecked: true,\n        value: !this.state.checkboxFire // onChange={this.handleFireChange}\n        ,\n        onclick: this.setState({})\n      }, \"Brandweer\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(rsuite__WEBPACK_IMPORTED_MODULE_4__.default, {\n        defaultChecked: true // onChange={(value) => {\n        // this.sendIncludePoliceChange(value)\n        // console.log(\"politie: \" + value)\n        // }}\n\n      }, \" Politie\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(rsuite__WEBPACK_IMPORTED_MODULE_4__.default, {\n        defaultChecked: true,\n        onChange: function onChange(value) {\n          _this2.sendIncludeAmbuChange(value);\n\n          console.log(\"ambu: \" + value);\n        }\n      }, \" Ambulance\"));\n    }\n  }]);\n\n  return FilterSelector;\n}(react__WEBPACK_IMPORTED_MODULE_0__.Component);\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FilterSelector);\n\n//# sourceURL=webpack://frontend/./components/Elements/FilterSelector.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("2b94b80142ee9f56c8a3")
/******/ 	})();
/******/ 	
/******/ }
);