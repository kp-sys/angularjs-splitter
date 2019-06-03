(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@kpsys/angularjs-register"));
	else if(typeof define === 'function' && define.amd)
		define(["@kpsys/angularjs-register"], factory);
	else if(typeof exports === 'object')
		exports["angularjs-splitter"] = factory(require("@kpsys/angularjs-register"));
	else
		root["angularjs-splitter"] = factory(root["@kpsys/angularjs-register"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var bind_decorator_1 = __webpack_require__(6);

var LOCAL_STORAGE_PREFIX = "kpSplitter-";

var SplitterComponentController =
/*#__PURE__*/
function () {
  SplitterComponentController.$inject = ["$document", "$element", "$scope", "$transclude", "$compile"];

  /*@ngInject*/
  function SplitterComponentController($document, $element, $scope, $transclude, $compile) {
    _classCallCheck(this, SplitterComponentController);

    this.$document = $document;
    this.$element = $element;
    this.$scope = $scope;
    this.$compile = $compile;
    this.panes = [];
    this.enabled = false;
    this.dragged = false;
    this.showSplitHandler = true;
    $transclude(function (clone) {
      $element.append(clone);
    });
  }

  _createClass(SplitterComponentController, [{
    key: "$postLink",
    value: function $postLink() {
      if (this.panes.length > 1) {
        this.initComponent();
      }
    }
  }, {
    key: "$onDestroy",
    value: function $onDestroy() {
      this.$element.off('mousemove', this.drag);
      this.handler.off('mousedown', this.dragstart);
      this.$document.off('mouseup', this.dragend);
    }
  }, {
    key: "togglePane",
    value: function togglePane(isVisible) {
      this.panes.forEach(function (pane) {
        pane.$element.toggleClass("split-pane".concat(pane.index), isVisible);
      });
      this.setPosition(isVisible ? this.lastPosition : null, false);
      this.showSplitHandler = isVisible;
    }
  }, {
    key: "addPane",
    value: function addPane(pane) {
      if (this.panes.length > 1) {
        throw new Error('splitters can only have two panes');
      }

      this.panes.push(pane);
      return this.panes.length;
    }
  }, {
    key: "initComponent",
    value: function initComponent() {
      this.handler = this.$compile('<div class="split-handler" ng-show="$ctrl.showSplitHandler"></div>')(this.$scope);
      this.vertical = this.orientation === 'vertical';
      this.$element.addClass('split-panes');
      var pane1 = this.panes[0];
      pane1.$element.after(this.handler);
      var initPane1 = !isNaN(pane1.initSize);
      var initPane2 = !isNaN(this.panes[1].initSize);

      if (this.vertical) {
        this.topOrLeft = 'top';
        this.widthOrHeight = 'height';
      } else {
        this.topOrLeft = 'left';
        this.widthOrHeight = 'width';
      }

      if (initPane2) {
        throw new Error('Second pane cannot have init-size attribute');
      }

      var preservedInitSize = parseInt(localStorage.getItem("".concat(LOCAL_STORAGE_PREFIX).concat(this.preserveSizeId)), 10);
      var pane1InitSize = preservedInitSize || pane1.initSize;

      if (initPane1 || preservedInitSize) {
        this.setPosition(pane1InitSize);
      }

      this.togglePane(this.panes.reduce(function (acc, pane) {
        return acc && pane.show;
      }, true));
      this.$element.on('mousemove', this.drag);
      this.handler.on('mousedown', this.dragstart);
      this.$document.on('mouseup', this.dragend);
    } // If null, CSS rule will be removed

  }, {
    key: "setPosition",
    value: function setPosition(position) {
      var setLastPosition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var value = position ? "".concat(position, "px") : '';
      this.lastPosition = setLastPosition ? position : this.lastPosition;
      this.handler.css(this.topOrLeft, value);
      this.panes[0].$element.css(this.widthOrHeight, value);
      this.panes[1].$element.css(this.topOrLeft, value);
    }
  }, {
    key: "drag",
    value: function drag(event) {
      if (!this.dragged) {
        return;
      }

      var bounds = this.$element[0].getBoundingClientRect();
      var position = 0;
      var pane1Min = this.panes[0].minSize || 0;
      var pane2Min = this.panes[1].minSize || 0;

      if (this.vertical) {
        var height = bounds.bottom - bounds.top;
        position = event.clientY - bounds.top;

        if (position < pane1Min) {
          return;
        }

        if (height - position < pane2Min) {
          return;
        }

        this.setPosition(position);
      } else {
        var width = bounds.right - bounds.left;
        position = event.clientX - bounds.left;

        if (position < pane1Min) {
          return;
        }

        if (width - position < pane2Min) {
          return;
        }

        this.setPosition(position);
      }

      if (this.preserveSizeId) {
        localStorage.setItem("".concat(LOCAL_STORAGE_PREFIX).concat(this.preserveSizeId), "".concat(position));
      }

      this.$scope.$apply();
    }
  }, {
    key: "dragstart",
    value: function dragstart(event) {
      event.preventDefault();
      this.dragged = true;
    }
  }, {
    key: "dragend",
    value: function dragend() {
      this.dragged = false;
    }
  }]);

  return SplitterComponentController;
}();

__decorate([bind_decorator_1.default], SplitterComponentController.prototype, "drag", null);

__decorate([bind_decorator_1.default], SplitterComponentController.prototype, "dragstart", null);

__decorate([bind_decorator_1.default], SplitterComponentController.prototype, "dragend", null);

exports.SplitterComponentController = SplitterComponentController;
/**
 * @ngdoc component
 * @name kpSplitter
 * @module angularjs-splitter
 *
 * @param {TSplitterOrientation} orientation Orientation of inner {@link component:kpSplitterPane panes}. `'vertical'` is panes above one another. `'horizontal'` is panes side by side.
 * @param {string} preserveSizeId Unique ID of element under which size of element is stored in localStorage.
 *
 * @description
 * Component for split areas with dynamic border. See example.
 * If `preserve-size-id` is given, component stores actual size value in localStorage and after reload, size is restored.
 *
 * @example
 * <example name="kpSplitterExample" module="kpSplitterExample" frame-no-resize="true">
 *     <file name="index.html">
 *      <main style="width: 100%; height: 500px;">
 *          <kp-splitter orientation="horizontal">
 *              <kp-splitter-pane min-size="100" init-size="200">
 *                  <div class="pane-container">Pane 1</div>
 *              </kp-splitter-pane>
 *              <kp-splitter-pane min-size="100">
 *                  <kp-splitter orientation="vertical" preserve-size-id="vertical-splitter">
 *                      <kp-splitter-pane min-size="100" init-size="300">
 *                          <div class="pane-container">Pane 2</div>
 *                      </kp-splitter-pane>
 *                      <kp-splitter-pane min-size="100">
 *                          <div class="pane-containe">Pane 3</div>
 *                      </kp-splitter-pane>
 *                  </kp-splitter>
 *              </kp-splitter-pane>
 *          </kp-splitter>
 *      </main>
 *     </file>
 *     <file name="script.js">
 *          angular.module('kpSplitterExample', ['angularjs-splitter']);
 *     </file>
 * </example>
 */

var SplitterComponent = function SplitterComponent() {
  _classCallCheck(this, SplitterComponent);

  this.bindings = {
    orientation: '@',
    preserveSizeId: '@?'
  };
  this.transclude = true;
  this.require = {
    splitterScrollController: '^?kpSplitterScroll'
  };
  this.controller = SplitterComponentController;
};

SplitterComponent.componentName = 'kpSplitter';
exports.default = SplitterComponent;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Inspired by: https://github.com/blackgate/bg-splitter
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(3);

var angularjs_register_1 = __webpack_require__(4);

var pane_component_1 = __webpack_require__(5);

var splitter_component_1 = __webpack_require__(0);
/**
 * @ngdoc module
 * @name angularjs-splitter
 * @module angularjs-splitter
 */


exports.default = angularjs_register_1.default('angularjs-splitter').component(pane_component_1.default.componentName, pane_component_1.default).component(splitter_component_1.default.componentName, splitter_component_1.default).name();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__4__;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var splitter_component_1 = __webpack_require__(0);

var PaneComponentController =
/*#__PURE__*/
function () {
  PaneComponentController.$inject = ["$element", "$transclude"];

  /*@ngInject*/
  function PaneComponentController($element, $transclude) {
    _classCallCheck(this, PaneComponentController);

    this.$element = $element;
    $transclude(function (clone) {
      $element.append(clone);
    });
  }

  _createClass(PaneComponentController, [{
    key: "$onInit",
    value: function $onInit() {
      this.show = true;
    }
  }, {
    key: "$postLink",
    value: function $postLink() {
      this.index = this.splitterController.addPane(this);
      this.$element.addClass("split-pane".concat(this.index));
    }
  }, {
    key: "$onChanges",
    value: function $onChanges(onChangesObj) {
      if (onChangesObj.show && onChangesObj.show.currentValue !== undefined) {
        if (!onChangesObj.show.isFirstChange()) {
          this.splitterController.togglePane(onChangesObj.show.currentValue);
        }

        this.$element.toggleClass('ng-hide', !onChangesObj.show.currentValue);
      }
    }
  }]);

  return PaneComponentController;
}();

exports.PaneComponentController = PaneComponentController;
/**
 * @ngdoc component
 * @name kpSplitterPane
 * @module angularjs-splitter
 *
 * @requires ^kpSplitter
 *
 * @param {number=} minSize Minimum size of pane in pixels.
 * @param {number=} initSize Initial size of pane in pixels. If not specified, panes will have `width: 50%`.
 * @param {boolean=} show If `false`, pane will hide. Default is `true`.
 *
 *
 */

var PaneComponent = function PaneComponent() {
  _classCallCheck(this, PaneComponent);

  this.transclude = true;
  this.bindings = {
    minSize: '<',
    initSize: '<',
    show: '<'
  };
  this.require = {
    splitterController: "^".concat(splitter_component_1.default.componentName)
  };
  this.controller = PaneComponentController;
};

PaneComponent.componentName = 'kpSplitterPane';
exports.default = PaneComponent;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var constants;
(function (constants) {
    constants.typeOfFunction = 'function';
    constants.boolTrue = true;
})(constants || (constants = {}));
function bind(target, propertyKey, descriptor) {
    if (!descriptor || (typeof descriptor.value !== constants.typeOfFunction)) {
        throw new TypeError("Only methods can be decorated with @bind. <" + propertyKey + "> is not a method!");
    }
    return {
        configurable: constants.boolTrue,
        get: function () {
            var bound = descriptor.value.bind(this);
            // Credits to https://github.com/andreypopp/autobind-decorator for memoizing the result of bind against a symbol on the instance.
            Object.defineProperty(this, propertyKey, {
                value: bound,
                configurable: constants.boolTrue,
                writable: constants.boolTrue
            });
            return bound;
        }
    };
}
exports.bind = bind;
exports.default = bind;


/***/ })
/******/ ]);
});