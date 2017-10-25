(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Library", [], factory);
	else if(typeof exports === 'object')
		exports["Library"] = factory();
	else
		root["Library"] = factory();
})(this, function() {
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyObject = {};

if (process.env.NODE_ENV !== 'production') {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyFunction = __webpack_require__(2);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _PowerbiEmbedded = __webpack_require__(7);

var _PowerbiEmbedded2 = _interopRequireDefault(_PowerbiEmbedded);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _PowerbiEmbedded2.default;
module.exports = exports['default'];

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PowerbiEmbed = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(8);

var _powerbiClient = __webpack_require__(13);

var powerbi = _interopRequireWildcard(_powerbiClient);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// export interface IProps {
//   id: string;
//   accessToken: string;
//   embedUrl: string;
//   pageName?: string;
//   filters?: pbi.models.IFilter[];
//   filterPaneEnabled?: boolean;
//   navContentPaneEnabled?: boolean;
//   onEmbedded?: (embed: pbi.Embed) => any;
//   width?: 600;
//   height?: 900;
// }

var PowerbiEmbed = exports.PowerbiEmbed = function (_Component) {
  _inherits(PowerbiEmbed, _Component);

  function PowerbiEmbed(props) {
    _classCallCheck(this, PowerbiEmbed);

    var _this = _possibleConstructorReturn(this, (PowerbiEmbed.__proto__ || Object.getPrototypeOf(PowerbiEmbed)).call(this, props));

    _this.component = null;
    _this.rootElement = null;
    _this.state = {
      type: 'report'
    };
    return _this;
  }

  _createClass(PowerbiEmbed, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateState(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.updateState(nextProps);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.validateConfig(this.state)) {
        this.embed(this.state);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.reset();
    }
  }, {
    key: 'embed',
    value: function embed(config) {
      this.component = powerbi.embed(this.rootElement, config);
      if (this.props.onEmbedded) {
        this.props.onEmbedded(this.component);
      }
      return this.component;
    }
  }, {
    key: 'reset',
    value: function reset() {
      powerbi.reset(this.rootElement);
      this.component = null;
    }
  }, {
    key: 'updateState',
    value: function updateState(props) {
      var nextState = Object.assign({}, this.state, props, {
        settings: {
          filterPaneEnabled: this.props.filterPaneEnabled,
          navContentPaneEnabled: this.props.navContentPaneEnabled
        }
      });
      /**
       * This property must be removed from the state object so that it doesn't get used in the embedConfig.
       * This would be passed to `powerbi.embed(element, embedConfig)` and attempted to be sent over postMessage;
       * however, functions cannot be cloned and it will fail.
       */

      delete nextState.onEmbedded;
      this.setState(nextState);
    }
  }, {
    key: 'validateConfig',
    value: function validateConfig(config) {
      console.log(config);
      var errors = powerbi.models.validateReportLoad(config);

      console.log('error', errors);
      return errors === undefined;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var dimensions = {
        width: this.props.width,
        height: this.props.height
      };

      return React.createElement('div', { className: 'powerbi-frame', ref: function ref(el) {
          _this2.rootElement = el;
        }, style: dimensions });
    }
  }]);

  return PowerbiEmbed;
}(_react.Component);

// Report.propTypes = {
//   accessToken: React.PropTypes.string,
//   embedUrl: React.PropTypes.string
// }


exports.default = PowerbiEmbed;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

if (process.env.NODE_ENV === 'production') {
  module.exports = __webpack_require__(9);
} else {
  module.exports = __webpack_require__(10);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 React v16.0.0
 react.production.min.js

 Copyright (c) 2013-present, Facebook, Inc.

 This source code is licensed under the MIT license found in the
 LICENSE file in the root directory of this source tree.
*/
var f=__webpack_require__(3),p=__webpack_require__(4);__webpack_require__(1);var r=__webpack_require__(2);
function t(a){for(var b=arguments.length-1,d="Minified React error #"+a+"; visit http://facebook.github.io/react/docs/error-decoder.html?invariant\x3d"+a,e=0;e<b;e++)d+="\x26args[]\x3d"+encodeURIComponent(arguments[e+1]);b=Error(d+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings.");b.name="Invariant Violation";b.framesToPop=1;throw b;}
var u={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}};function v(a,b,d){this.props=a;this.context=b;this.refs=p;this.updater=d||u}v.prototype.isReactComponent={};v.prototype.setState=function(a,b){"object"!==typeof a&&"function"!==typeof a&&null!=a?t("85"):void 0;this.updater.enqueueSetState(this,a,b,"setState")};v.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate")};
function w(a,b,d){this.props=a;this.context=b;this.refs=p;this.updater=d||u}function x(){}x.prototype=v.prototype;var y=w.prototype=new x;y.constructor=w;f(y,v.prototype);y.isPureReactComponent=!0;function z(a,b,d){this.props=a;this.context=b;this.refs=p;this.updater=d||u}var A=z.prototype=new x;A.constructor=z;f(A,v.prototype);A.unstable_isAsyncReactComponent=!0;A.render=function(){return this.props.children};
var B={Component:v,PureComponent:w,AsyncComponent:z},C={current:null},D=Object.prototype.hasOwnProperty,E="function"===typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103,F={key:!0,ref:!0,__self:!0,__source:!0};function G(a,b,d,e,c,g,k){return{$$typeof:E,type:a,key:b,ref:d,props:k,_owner:g}}
G.createElement=function(a,b,d){var e,c={},g=null,k=null,m=null,q=null;if(null!=b)for(e in void 0!==b.ref&&(k=b.ref),void 0!==b.key&&(g=""+b.key),m=void 0===b.__self?null:b.__self,q=void 0===b.__source?null:b.__source,b)D.call(b,e)&&!F.hasOwnProperty(e)&&(c[e]=b[e]);var l=arguments.length-2;if(1===l)c.children=d;else if(1<l){for(var h=Array(l),n=0;n<l;n++)h[n]=arguments[n+2];c.children=h}if(a&&a.defaultProps)for(e in l=a.defaultProps,l)void 0===c[e]&&(c[e]=l[e]);return G(a,g,k,m,q,C.current,c)};
G.createFactory=function(a){var b=G.createElement.bind(null,a);b.type=a;return b};G.cloneAndReplaceKey=function(a,b){return G(a.type,b,a.ref,a._self,a._source,a._owner,a.props)};
G.cloneElement=function(a,b,d){var e=f({},a.props),c=a.key,g=a.ref,k=a._self,m=a._source,q=a._owner;if(null!=b){void 0!==b.ref&&(g=b.ref,q=C.current);void 0!==b.key&&(c=""+b.key);if(a.type&&a.type.defaultProps)var l=a.type.defaultProps;for(h in b)D.call(b,h)&&!F.hasOwnProperty(h)&&(e[h]=void 0===b[h]&&void 0!==l?l[h]:b[h])}var h=arguments.length-2;if(1===h)e.children=d;else if(1<h){l=Array(h);for(var n=0;n<h;n++)l[n]=arguments[n+2];e.children=l}return G(a.type,c,g,k,m,q,e)};
G.isValidElement=function(a){return"object"===typeof a&&null!==a&&a.$$typeof===E};var H="function"===typeof Symbol&&Symbol.iterator,I="function"===typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;function escape(a){var b={"\x3d":"\x3d0",":":"\x3d2"};return"$"+(""+a).replace(/[=:]/g,function(a){return b[a]})}var J=/\/+/g,K=[];
function L(a,b,d,e){if(K.length){var c=K.pop();c.result=a;c.keyPrefix=b;c.func=d;c.context=e;c.count=0;return c}return{result:a,keyPrefix:b,func:d,context:e,count:0}}function M(a){a.result=null;a.keyPrefix=null;a.func=null;a.context=null;a.count=0;10>K.length&&K.push(a)}
function N(a,b,d,e){var c=typeof a;if("undefined"===c||"boolean"===c)a=null;if(null===a||"string"===c||"number"===c||"object"===c&&a.$$typeof===I)return d(e,a,""===b?"."+O(a,0):b),1;var g=0;b=""===b?".":b+":";if(Array.isArray(a))for(var k=0;k<a.length;k++){c=a[k];var m=b+O(c,k);g+=N(c,m,d,e)}else if(m=H&&a[H]||a["@@iterator"],"function"===typeof m)for(a=m.call(a),k=0;!(c=a.next()).done;)c=c.value,m=b+O(c,k++),g+=N(c,m,d,e);else"object"===c&&(d=""+a,t("31","[object Object]"===d?"object with keys {"+
Object.keys(a).join(", ")+"}":d,""));return g}function O(a,b){return"object"===typeof a&&null!==a&&null!=a.key?escape(a.key):b.toString(36)}function P(a,b){a.func.call(a.context,b,a.count++)}function Q(a,b,d){var e=a.result,c=a.keyPrefix;a=a.func.call(a.context,b,a.count++);Array.isArray(a)?R(a,e,d,r.thatReturnsArgument):null!=a&&(G.isValidElement(a)&&(a=G.cloneAndReplaceKey(a,c+(!a.key||b&&b.key===a.key?"":(""+a.key).replace(J,"$\x26/")+"/")+d)),e.push(a))}
function R(a,b,d,e,c){var g="";null!=d&&(g=(""+d).replace(J,"$\x26/")+"/");b=L(b,g,e,c);null==a||N(a,"",Q,b);M(b)}var S={forEach:function(a,b,d){if(null==a)return a;b=L(null,null,b,d);null==a||N(a,"",P,b);M(b)},map:function(a,b,d){if(null==a)return a;var e=[];R(a,e,null,b,d);return e},count:function(a){return null==a?0:N(a,"",r.thatReturnsNull,null)},toArray:function(a){var b=[];R(a,b,null,r.thatReturnsArgument);return b}};
module.exports={Children:{map:S.map,forEach:S.forEach,count:S.count,toArray:S.toArray,only:function(a){G.isValidElement(a)?void 0:t("143");return a}},Component:B.Component,PureComponent:B.PureComponent,unstable_AsyncComponent:B.AsyncComponent,createElement:G.createElement,cloneElement:G.cloneElement,isValidElement:G.isValidElement,createFactory:G.createFactory,version:"16.0.0",__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{ReactCurrentOwner:C,assign:f}};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/** @license React v16.0.0
 * react.development.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (process.env.NODE_ENV !== "production") {
(function() {

'use strict';

var objectAssign$1 = __webpack_require__(3);
var require$$0 = __webpack_require__(5);
var emptyObject = __webpack_require__(4);
var invariant = __webpack_require__(1);
var emptyFunction = __webpack_require__(2);
var checkPropTypes = __webpack_require__(11);

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule reactProdInvariant
 * 
 */

{
  var warning = require$$0;
}

function warnNoop(publicInstance, callerName) {
  {
    var constructor = publicInstance.constructor;
    warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op.\n\nPlease check the code for the %s component.', callerName, callerName, constructor && (constructor.displayName || constructor.name) || 'ReactClass');
  }
}

/**
 * This is the abstract API for an update queue.
 */
var ReactNoopUpdateQueue = {
  /**
   * Checks whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function (publicInstance) {
    return false;
  },

  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {?function} callback Called after component is updated.
   * @param {?string} callerName name of the calling function in the public API.
   * @internal
   */
  enqueueForceUpdate: function (publicInstance, callback, callerName) {
    warnNoop(publicInstance, 'forceUpdate');
  },

  /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} completeState Next state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} callerName name of the calling function in the public API.
   * @internal
   */
  enqueueReplaceState: function (publicInstance, completeState, callback, callerName) {
    warnNoop(publicInstance, 'replaceState');
  },

  /**
   * Sets a subset of the state. This only exists because _pendingState is
   * internal. This provides a merging strategy that is not available to deep
   * properties which is confusing. TODO: Expose pendingState or don't use it
   * during the merge.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} Name of the calling function in the public API.
   * @internal
   */
  enqueueSetState: function (publicInstance, partialState, callback, callerName) {
    warnNoop(publicInstance, 'setState');
  }
};

var ReactNoopUpdateQueue_1 = ReactNoopUpdateQueue;

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule lowPriorityWarning
 */

/**
 * Forked from fbjs/warning:
 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
 *
 * Only change is we use console.warn instead of console.error,
 * and do nothing when 'console' is not supported.
 * This really simplifies the code.
 * ---
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var lowPriorityWarning = function () {};

{
  var printWarning = function (format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.warn(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  lowPriorityWarning = function (condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }
    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

var lowPriorityWarning_1 = lowPriorityWarning;

/**
 * Base class helpers for the updating state of a component.
 */
function ReactComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue_1;
}

ReactComponent.prototype.isReactComponent = {};

/**
 * Sets a subset of the state. Always use this to mutate
 * state. You should treat `this.state` as immutable.
 *
 * There is no guarantee that `this.state` will be immediately updated, so
 * accessing `this.state` after calling this method may return the old value.
 *
 * There is no guarantee that calls to `setState` will run synchronously,
 * as they may eventually be batched together.  You can provide an optional
 * callback that will be executed when the call to setState is actually
 * completed.
 *
 * When a function is provided to setState, it will be called at some point in
 * the future (not synchronously). It will be called with the up to date
 * component arguments (state, props, context). These values can be different
 * from this.* because your function may be called after receiveProps but before
 * shouldComponentUpdate, and this new state, props, and context will not yet be
 * assigned to this.
 *
 * @param {object|function} partialState Next partial state or function to
 *        produce next partial state to be merged with current state.
 * @param {?function} callback Called after state is updated.
 * @final
 * @protected
 */
ReactComponent.prototype.setState = function (partialState, callback) {
  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : void 0;
  this.updater.enqueueSetState(this, partialState, callback, 'setState');
};

/**
 * Forces an update. This should only be invoked when it is known with
 * certainty that we are **not** in a DOM transaction.
 *
 * You may want to call this when you know that some deeper aspect of the
 * component's state has changed but `setState` was not called.
 *
 * This will not invoke `shouldComponentUpdate`, but it will invoke
 * `componentWillUpdate` and `componentDidUpdate`.
 *
 * @param {?function} callback Called after update is complete.
 * @final
 * @protected
 */
ReactComponent.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
};

/**
 * Deprecated APIs. These APIs used to exist on classic React classes but since
 * we would like to deprecate them, we're not going to move them over to this
 * modern base class. Instead, we define a getter that warns if it's accessed.
 */
{
  var deprecatedAPIs = {
    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
  };
  var defineDeprecationWarning = function (methodName, info) {
    Object.defineProperty(ReactComponent.prototype, methodName, {
      get: function () {
        lowPriorityWarning_1(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
        return undefined;
      }
    });
  };
  for (var fnName in deprecatedAPIs) {
    if (deprecatedAPIs.hasOwnProperty(fnName)) {
      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
    }
  }
}

/**
 * Base class helpers for the updating state of a component.
 */
function ReactPureComponent(props, context, updater) {
  // Duplicated from ReactComponent.
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue_1;
}

function ComponentDummy() {}
ComponentDummy.prototype = ReactComponent.prototype;
var pureComponentPrototype = ReactPureComponent.prototype = new ComponentDummy();
pureComponentPrototype.constructor = ReactPureComponent;
// Avoid an extra prototype jump for these methods.
objectAssign$1(pureComponentPrototype, ReactComponent.prototype);
pureComponentPrototype.isPureReactComponent = true;

function ReactAsyncComponent(props, context, updater) {
  // Duplicated from ReactComponent.
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue_1;
}

var asyncComponentPrototype = ReactAsyncComponent.prototype = new ComponentDummy();
asyncComponentPrototype.constructor = ReactAsyncComponent;
// Avoid an extra prototype jump for these methods.
objectAssign$1(asyncComponentPrototype, ReactComponent.prototype);
asyncComponentPrototype.unstable_isAsyncReactComponent = true;
asyncComponentPrototype.render = function () {
  return this.props.children;
};

var ReactBaseClasses = {
  Component: ReactComponent,
  PureComponent: ReactPureComponent,
  AsyncComponent: ReactAsyncComponent
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule ReactCurrentOwner
 * 
 */

/**
 * Keeps track of the current owner.
 *
 * The current owner is the component who should own any components that are
 * currently being constructed.
 */
var ReactCurrentOwner = {
  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null
};

var ReactCurrentOwner_1 = ReactCurrentOwner;

var hasOwnProperty = Object.prototype.hasOwnProperty;

{
  var warning$2 = require$$0;
}

// The Symbol used to tag the ReactElement type. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var REACT_ELEMENT_TYPE$1 = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};

var specialPropKeyWarningShown;
var specialPropRefWarningShown;

function hasValidRef(config) {
  {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.ref !== undefined;
}

function hasValidKey(config) {
  {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.key !== undefined;
}

function defineKeyPropWarningGetter(props, displayName) {
  var warnAboutAccessingKey = function () {
    if (!specialPropKeyWarningShown) {
      specialPropKeyWarningShown = true;
      warning$2(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
    }
  };
  warnAboutAccessingKey.isReactWarning = true;
  Object.defineProperty(props, 'key', {
    get: warnAboutAccessingKey,
    configurable: true
  });
}

function defineRefPropWarningGetter(props, displayName) {
  var warnAboutAccessingRef = function () {
    if (!specialPropRefWarningShown) {
      specialPropRefWarningShown = true;
      warning$2(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
    }
  };
  warnAboutAccessingRef.isReactWarning = true;
  Object.defineProperty(props, 'ref', {
    get: warnAboutAccessingRef,
    configurable: true
  });
}

/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, no instanceof check
 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} key
 * @param {string|object} ref
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @param {*} owner
 * @param {*} props
 * @internal
 */
var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allow us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE$1,

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner
  };

  {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {};

    // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.
    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false
    });
    // self and source are DEV only properties.
    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self
    });
    // Two elements created in two different places should be considered
    // equal for testing purposes and therefore we hide it from enumeration.
    Object.defineProperty(element, '_source', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: source
    });
    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};

/**
 * Create and return a new ReactElement of the given type.
 * See https://facebook.github.io/react/docs/react-api.html#createelement
 */
ReactElement.createElement = function (type, config, children) {
  var propName;

  // Reserved names are extracted
  var props = {};

  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // Remaining properties are added to a new props object
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }
    props.children = childArray;
  }

  // Resolve default props
  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  {
    if (key || ref) {
      if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE$1) {
        var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
        if (key) {
          defineKeyPropWarningGetter(props, displayName);
        }
        if (ref) {
          defineRefPropWarningGetter(props, displayName);
        }
      }
    }
  }
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner_1.current, props);
};

/**
 * Return a function that produces ReactElements of a given type.
 * See https://facebook.github.io/react/docs/react-api.html#createfactory
 */
ReactElement.createFactory = function (type) {
  var factory = ReactElement.createElement.bind(null, type);
  // Expose the type on the factory and the prototype so that it can be
  // easily accessed on elements. E.g. `<Foo />.type === Foo`.
  // This should not be named `constructor` since this may not be the function
  // that created the element, and it may not even be a constructor.
  // Legacy hook TODO: Warn if this is accessed
  factory.type = type;
  return factory;
};

ReactElement.cloneAndReplaceKey = function (oldElement, newKey) {
  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

  return newElement;
};

/**
 * Clone and return a new ReactElement using element as the starting point.
 * See https://facebook.github.io/react/docs/react-api.html#cloneelement
 */
ReactElement.cloneElement = function (element, config, children) {
  var propName;

  // Original props are copied
  var props = objectAssign$1({}, element.props);

  // Reserved names are extracted
  var key = element.key;
  var ref = element.ref;
  // Self is preserved since the owner is preserved.
  var self = element._self;
  // Source is preserved since cloneElement is unlikely to be targeted by a
  // transpiler, and the original source is probably a better indicator of the
  // true owner.
  var source = element._source;

  // Owner will be preserved, unless ref is overridden
  var owner = element._owner;

  if (config != null) {
    if (hasValidRef(config)) {
      // Silently steal the ref from the parent.
      ref = config.ref;
      owner = ReactCurrentOwner_1.current;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    // Remaining properties override existing props
    var defaultProps;
    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps;
    }
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        if (config[propName] === undefined && defaultProps !== undefined) {
          // Resolve default props
          props[propName] = defaultProps[propName];
        } else {
          props[propName] = config[propName];
        }
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  return ReactElement(element.type, key, ref, self, source, owner, props);
};

/**
 * Verifies the object is a ReactElement.
 * See https://facebook.github.io/react/docs/react-api.html#isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a valid component.
 * @final
 */
ReactElement.isValidElement = function (object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE$1;
};

var ReactElement_1 = ReactElement;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule ReactDebugCurrentFrame
 * 
 */

var ReactDebugCurrentFrame = {};

{
  // Component that is being worked on
  ReactDebugCurrentFrame.getCurrentStack = null;

  ReactDebugCurrentFrame.getStackAddendum = function () {
    var impl = ReactDebugCurrentFrame.getCurrentStack;
    if (impl) {
      return impl();
    }
    return null;
  };
}

var ReactDebugCurrentFrame_1 = ReactDebugCurrentFrame;

{
  var warning$1 = require$$0;

  var _require = ReactDebugCurrentFrame_1,
      getStackAddendum = _require.getStackAddendum;
}

var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.
// The Symbol used to tag the ReactElement type. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

var SEPARATOR = '.';
var SUBSEPARATOR = ':';

/**
 * Escape and wrap key so it is safe to use as a reactid
 *
 * @param {string} key to be escaped.
 * @return {string} the escaped key.
 */
function escape(key) {
  var escapeRegex = /[=:]/g;
  var escaperLookup = {
    '=': '=0',
    ':': '=2'
  };
  var escapedString = ('' + key).replace(escapeRegex, function (match) {
    return escaperLookup[match];
  });

  return '$' + escapedString;
}

/**
 * TODO: Test that a single child and an array with one item have the same key
 * pattern.
 */

var didWarnAboutMaps = false;

var userProvidedKeyEscapeRegex = /\/+/g;
function escapeUserProvidedKey(text) {
  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
}

var POOL_SIZE = 10;
var traverseContextPool = [];
function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {
  if (traverseContextPool.length) {
    var traverseContext = traverseContextPool.pop();
    traverseContext.result = mapResult;
    traverseContext.keyPrefix = keyPrefix;
    traverseContext.func = mapFunction;
    traverseContext.context = mapContext;
    traverseContext.count = 0;
    return traverseContext;
  } else {
    return {
      result: mapResult,
      keyPrefix: keyPrefix,
      func: mapFunction,
      context: mapContext,
      count: 0
    };
  }
}

function releaseTraverseContext(traverseContext) {
  traverseContext.result = null;
  traverseContext.keyPrefix = null;
  traverseContext.func = null;
  traverseContext.context = null;
  traverseContext.count = 0;
  if (traverseContextPool.length < POOL_SIZE) {
    traverseContextPool.push(traverseContext);
  }
}

/**
 * @param {?*} children Children tree container.
 * @param {!string} nameSoFar Name of the key path so far.
 * @param {!function} callback Callback to invoke with each child found.
 * @param {?*} traverseContext Used to pass information throughout the traversal
 * process.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
  var type = typeof children;

  if (type === 'undefined' || type === 'boolean') {
    // All of the above are perceived as null.
    children = null;
  }

  if (children === null || type === 'string' || type === 'number' ||
  // The following is inlined from ReactElement. This means we can optimize
  // some checks. React Fiber also inlines this logic for similar purposes.
  type === 'object' && children.$$typeof === REACT_ELEMENT_TYPE) {
    callback(traverseContext, children,
    // If it's the only child, treat the name as if it was wrapped in an array
    // so that it's consistent if the number of children grows.
    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
    return 1;
  }

  var child;
  var nextName;
  var subtreeCount = 0; // Count of children found in the current subtree.
  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + getComponentKey(child, i);
      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
    }
  } else {
    var iteratorFn = ITERATOR_SYMBOL && children[ITERATOR_SYMBOL] || children[FAUX_ITERATOR_SYMBOL];
    if (typeof iteratorFn === 'function') {
      {
        // Warn about using Maps as children
        if (iteratorFn === children.entries) {
          warning$1(didWarnAboutMaps, 'Using Maps as children is unsupported and will likely yield ' + 'unexpected results. Convert it to a sequence/iterable of keyed ' + 'ReactElements instead.%s', getStackAddendum());
          didWarnAboutMaps = true;
        }
      }

      var iterator = iteratorFn.call(children);
      var step;
      var ii = 0;
      while (!(step = iterator.next()).done) {
        child = step.value;
        nextName = nextNamePrefix + getComponentKey(child, ii++);
        subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
      }
    } else if (type === 'object') {
      var addendum = '';
      {
        addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + getStackAddendum();
      }
      var childrenString = '' + children;
      invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum);
    }
  }

  return subtreeCount;
}

/**
 * Traverses children that are typically specified as `props.children`, but
 * might also be specified through attributes:
 *
 * - `traverseAllChildren(this.props.children, ...)`
 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
 *
 * The `traverseContext` is an optional argument that is passed through the
 * entire traversal. It can be used to store accumulations or anything else that
 * the callback might find relevant.
 *
 * @param {?*} children Children tree object.
 * @param {!function} callback To invoke upon traversing each child.
 * @param {?*} traverseContext Context for traversal.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildren(children, callback, traverseContext) {
  if (children == null) {
    return 0;
  }

  return traverseAllChildrenImpl(children, '', callback, traverseContext);
}

/**
 * Generate a key string that identifies a component within a set.
 *
 * @param {*} component A component that could contain a manual key.
 * @param {number} index Index that is used if a manual key is not provided.
 * @return {string}
 */
function getComponentKey(component, index) {
  // Do some typechecking here since we call this blindly. We want to ensure
  // that we don't block potential future ES APIs.
  if (typeof component === 'object' && component !== null && component.key != null) {
    // Explicit key
    return escape(component.key);
  }
  // Implicit key determined by the index in the set
  return index.toString(36);
}

function forEachSingleChild(bookKeeping, child, name) {
  var func = bookKeeping.func,
      context = bookKeeping.context;

  func.call(context, child, bookKeeping.count++);
}

/**
 * Iterates through children that are typically specified as `props.children`.
 *
 * See https://facebook.github.io/react/docs/react-api.html#react.children.foreach
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc
 * @param {*} forEachContext Context for forEachContext.
 */
function forEachChildren(children, forEachFunc, forEachContext) {
  if (children == null) {
    return children;
  }
  var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);
  traverseAllChildren(children, forEachSingleChild, traverseContext);
  releaseTraverseContext(traverseContext);
}

function mapSingleChildIntoContext(bookKeeping, child, childKey) {
  var result = bookKeeping.result,
      keyPrefix = bookKeeping.keyPrefix,
      func = bookKeeping.func,
      context = bookKeeping.context;


  var mappedChild = func.call(context, child, bookKeeping.count++);
  if (Array.isArray(mappedChild)) {
    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
  } else if (mappedChild != null) {
    if (ReactElement_1.isValidElement(mappedChild)) {
      mappedChild = ReactElement_1.cloneAndReplaceKey(mappedChild,
      // Keep both the (mapped) and old keys if they differ, just as
      // traverseAllChildren used to do for objects as children
      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
    }
    result.push(mappedChild);
  }
}

function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
  var escapedPrefix = '';
  if (prefix != null) {
    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
  }
  var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);
  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
  releaseTraverseContext(traverseContext);
}

/**
 * Maps children that are typically specified as `props.children`.
 *
 * See https://facebook.github.io/react/docs/react-api.html#react.children.map
 *
 * The provided mapFunction(child, key, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func The map function.
 * @param {*} context Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */
function mapChildren(children, func, context) {
  if (children == null) {
    return children;
  }
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
  return result;
}

/**
 * Count the number of children that are typically specified as
 * `props.children`.
 *
 * See https://facebook.github.io/react/docs/react-api.html#react.children.count
 *
 * @param {?*} children Children tree container.
 * @return {number} The number of children.
 */
function countChildren(children, context) {
  return traverseAllChildren(children, emptyFunction.thatReturnsNull, null);
}

/**
 * Flatten a children object (typically specified as `props.children`) and
 * return an array with appropriately re-keyed children.
 *
 * See https://facebook.github.io/react/docs/react-api.html#react.children.toarray
 */
function toArray(children) {
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
  return result;
}

var ReactChildren = {
  forEach: forEachChildren,
  map: mapChildren,
  count: countChildren,
  toArray: toArray
};

var ReactChildren_1 = ReactChildren;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule ReactVersion
 */

var ReactVersion = '16.0.0';

/**
 * Returns the first child in a collection of children and verifies that there
 * is only one child in the collection.
 *
 * See https://facebook.github.io/react/docs/react-api.html#react.children.only
 *
 * The current implementation of this function assumes that a single child gets
 * passed without a wrapper, but the purpose of this helper function is to
 * abstract away the particular structure of children.
 *
 * @param {?object} children Child collection structure.
 * @return {ReactElement} The first and only `ReactElement` contained in the
 * structure.
 */
function onlyChild(children) {
  !ReactElement_1.isValidElement(children) ? invariant(false, 'React.Children.only expected to receive a single React element child.') : void 0;
  return children;
}

var onlyChild_1 = onlyChild;

/**
 * Copyright (c) 2016-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @providesModule describeComponentFrame
 */

var describeComponentFrame$1 = function (name, source, ownerName) {
  return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule getComponentName
 * 
 */

function getComponentName$1(instanceOrFiber) {
  if (typeof instanceOrFiber.getName === 'function') {
    // Stack reconciler
    var instance = instanceOrFiber;
    return instance.getName();
  }
  if (typeof instanceOrFiber.tag === 'number') {
    // Fiber reconciler
    var fiber = instanceOrFiber;
    var type = fiber.type;

    if (typeof type === 'string') {
      return type;
    }
    if (typeof type === 'function') {
      return type.displayName || type.name;
    }
  }
  return null;
}

var getComponentName_1 = getComponentName$1;

{
  var checkPropTypes$1 = checkPropTypes;
  var lowPriorityWarning$1 = lowPriorityWarning_1;
  var ReactDebugCurrentFrame$1 = ReactDebugCurrentFrame_1;
  var warning$3 = require$$0;
  var describeComponentFrame = describeComponentFrame$1;
  var getComponentName = getComponentName_1;

  var currentlyValidatingElement = null;

  var getDisplayName = function (element) {
    if (element == null) {
      return '#empty';
    } else if (typeof element === 'string' || typeof element === 'number') {
      return '#text';
    } else if (typeof element.type === 'string') {
      return element.type;
    } else {
      return element.type.displayName || element.type.name || 'Unknown';
    }
  };

  var getStackAddendum$1 = function () {
    var stack = '';
    if (currentlyValidatingElement) {
      var name = getDisplayName(currentlyValidatingElement);
      var owner = currentlyValidatingElement._owner;
      stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner));
    }
    stack += ReactDebugCurrentFrame$1.getStackAddendum() || '';
    return stack;
  };
}

var ITERATOR_SYMBOL$1 = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL$1 = '@@iterator'; // Before Symbol spec.

function getDeclarationErrorAddendum() {
  if (ReactCurrentOwner_1.current) {
    var name = getComponentName(ReactCurrentOwner_1.current);
    if (name) {
      return '\n\nCheck the render method of `' + name + '`.';
    }
  }
  return '';
}

function getSourceInfoErrorAddendum(elementProps) {
  if (elementProps !== null && elementProps !== undefined && elementProps.__source !== undefined) {
    var source = elementProps.__source;
    var fileName = source.fileName.replace(/^.*[\\\/]/, '');
    var lineNumber = source.lineNumber;
    return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
  }
  return '';
}

/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */
var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  var info = getDeclarationErrorAddendum();

  if (!info) {
    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
    if (parentName) {
      info = '\n\nCheck the top-level render call using <' + parentName + '>.';
    }
  }
  return info;
}

/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */
function validateExplicitKey(element, parentType) {
  if (!element._store || element._store.validated || element.key != null) {
    return;
  }
  element._store.validated = true;

  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
  if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
    return;
  }
  ownerHasKeyUseWarning[currentComponentErrorInfo] = true;

  // Usually the current owner is the offender, but if it accepts children as a
  // property, it may be the creator of the child that's responsible for
  // assigning it a key.
  var childOwner = '';
  if (element && element._owner && element._owner !== ReactCurrentOwner_1.current) {
    // Give the component that originally created this child.
    childOwner = ' It was passed a child from ' + getComponentName(element._owner) + '.';
  }

  currentlyValidatingElement = element;
  {
    warning$3(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, getStackAddendum$1());
  }
  currentlyValidatingElement = null;
}

/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */
function validateChildKeys(node, parentType) {
  if (typeof node !== 'object') {
    return;
  }
  if (Array.isArray(node)) {
    for (var i = 0; i < node.length; i++) {
      var child = node[i];
      if (ReactElement_1.isValidElement(child)) {
        validateExplicitKey(child, parentType);
      }
    }
  } else if (ReactElement_1.isValidElement(node)) {
    // This element was passed in a valid location.
    if (node._store) {
      node._store.validated = true;
    }
  } else if (node) {
    var iteratorFn = ITERATOR_SYMBOL$1 && node[ITERATOR_SYMBOL$1] || node[FAUX_ITERATOR_SYMBOL$1];
    if (typeof iteratorFn === 'function') {
      // Entry iterators used to provide implicit keys,
      // but now we print a separate warning for them later.
      if (iteratorFn !== node.entries) {
        var iterator = iteratorFn.call(node);
        var step;
        while (!(step = iterator.next()).done) {
          if (ReactElement_1.isValidElement(step.value)) {
            validateExplicitKey(step.value, parentType);
          }
        }
      }
    }
  }
}

/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */
function validatePropTypes(element) {
  var componentClass = element.type;
  if (typeof componentClass !== 'function') {
    return;
  }
  var name = componentClass.displayName || componentClass.name;
  var propTypes = componentClass.propTypes;

  if (propTypes) {
    currentlyValidatingElement = element;
    checkPropTypes$1(propTypes, element.props, 'prop', name, getStackAddendum$1);
    currentlyValidatingElement = null;
  }
  if (typeof componentClass.getDefaultProps === 'function') {
    warning$3(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
  }
}

var ReactElementValidator$1 = {
  createElement: function (type, props, children) {
    var validType = typeof type === 'string' || typeof type === 'function';
    // We warn in this case but don't throw. We expect the element creation to
    // succeed and there will likely be errors in render.
    if (!validType) {
      var info = '';
      if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
        info += ' You likely forgot to export your component from the file ' + "it's defined in.";
      }

      var sourceInfo = getSourceInfoErrorAddendum(props);
      if (sourceInfo) {
        info += sourceInfo;
      } else {
        info += getDeclarationErrorAddendum();
      }

      info += ReactDebugCurrentFrame$1.getStackAddendum() || '';

      warning$3(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', type == null ? type : typeof type, info);
    }

    var element = ReactElement_1.createElement.apply(this, arguments);

    // The result can be nullish if a mock or a custom function is used.
    // TODO: Drop this when these are no longer allowed as the type argument.
    if (element == null) {
      return element;
    }

    // Skip key warning if the type isn't valid since our key validation logic
    // doesn't expect a non-string/function type and can throw confusing errors.
    // We don't want exception behavior to differ between dev and prod.
    // (Rendering will throw with a helpful message and as soon as the type is
    // fixed, the key warnings will appear.)
    if (validType) {
      for (var i = 2; i < arguments.length; i++) {
        validateChildKeys(arguments[i], type);
      }
    }

    validatePropTypes(element);

    return element;
  },

  createFactory: function (type) {
    var validatedFactory = ReactElementValidator$1.createElement.bind(null, type);
    // Legacy hook TODO: Warn if this is accessed
    validatedFactory.type = type;

    {
      Object.defineProperty(validatedFactory, 'type', {
        enumerable: false,
        get: function () {
          lowPriorityWarning$1(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
          Object.defineProperty(this, 'type', {
            value: type
          });
          return type;
        }
      });
    }

    return validatedFactory;
  },

  cloneElement: function (element, props, children) {
    var newElement = ReactElement_1.cloneElement.apply(this, arguments);
    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], newElement.type);
    }
    validatePropTypes(newElement);
    return newElement;
  }
};

var ReactElementValidator_1 = ReactElementValidator$1;

{
  var warning$4 = require$$0;
}

function isNative(fn) {
  // Based on isNative() from Lodash
  var funcToString = Function.prototype.toString;
  var reIsNative = RegExp('^' + funcToString
  // Take an example native function source for comparison
  .call(Object.prototype.hasOwnProperty)
  // Strip regex characters so we can use it for regex
  .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  // Remove hasOwnProperty from the template to make it generic
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
  try {
    var source = funcToString.call(fn);
    return reIsNative.test(source);
  } catch (err) {
    return false;
  }
}

var canUseCollections =
// Array.from
typeof Array.from === 'function' &&
// Map
typeof Map === 'function' && isNative(Map) &&
// Map.prototype.keys
Map.prototype != null && typeof Map.prototype.keys === 'function' && isNative(Map.prototype.keys) &&
// Set
typeof Set === 'function' && isNative(Set) &&
// Set.prototype.keys
Set.prototype != null && typeof Set.prototype.keys === 'function' && isNative(Set.prototype.keys);

var setItem;
var getItem;
var removeItem;
var getItemIDs;
var addRoot;
var removeRoot;
var getRootIDs;

if (canUseCollections) {
  var itemMap = new Map();
  var rootIDSet = new Set();

  setItem = function (id, item) {
    itemMap.set(id, item);
  };
  getItem = function (id) {
    return itemMap.get(id);
  };
  removeItem = function (id) {
    itemMap['delete'](id);
  };
  getItemIDs = function () {
    return Array.from(itemMap.keys());
  };

  addRoot = function (id) {
    rootIDSet.add(id);
  };
  removeRoot = function (id) {
    rootIDSet['delete'](id);
  };
  getRootIDs = function () {
    return Array.from(rootIDSet.keys());
  };
} else {
  var itemByKey = {};
  var rootByKey = {};

  // Use non-numeric keys to prevent V8 performance issues:
  // https://github.com/facebook/react/pull/7232
  var getKeyFromID = function (id) {
    return '.' + id;
  };
  var getIDFromKey = function (key) {
    return parseInt(key.substr(1), 10);
  };

  setItem = function (id, item) {
    var key = getKeyFromID(id);
    itemByKey[key] = item;
  };
  getItem = function (id) {
    var key = getKeyFromID(id);
    return itemByKey[key];
  };
  removeItem = function (id) {
    var key = getKeyFromID(id);
    delete itemByKey[key];
  };
  getItemIDs = function () {
    return Object.keys(itemByKey).map(getIDFromKey);
  };

  addRoot = function (id) {
    var key = getKeyFromID(id);
    rootByKey[key] = true;
  };
  removeRoot = function (id) {
    var key = getKeyFromID(id);
    delete rootByKey[key];
  };
  getRootIDs = function () {
    return Object.keys(rootByKey).map(getIDFromKey);
  };
}

var unmountedIDs = [];

function purgeDeep(id) {
  var item = getItem(id);
  if (item) {
    var childIDs = item.childIDs;

    removeItem(id);
    childIDs.forEach(purgeDeep);
  }
}

function getDisplayName$1(element) {
  if (element == null) {
    return '#empty';
  } else if (typeof element === 'string' || typeof element === 'number') {
    return '#text';
  } else if (typeof element.type === 'string') {
    return element.type;
  } else {
    return element.type.displayName || element.type.name || 'Unknown';
  }
}

function describeID(id) {
  var name = ReactComponentTreeHook.getDisplayName(id);
  var element = ReactComponentTreeHook.getElement(id);
  var ownerID = ReactComponentTreeHook.getOwnerID(id);
  var ownerName = void 0;

  if (ownerID) {
    ownerName = ReactComponentTreeHook.getDisplayName(ownerID);
  }
  warning$4(element, 'ReactComponentTreeHook: Missing React element for debugID %s when ' + 'building stack', id);
  return describeComponentFrame$1(name || '', element && element._source, ownerName || '');
}

var ReactComponentTreeHook = {
  onSetChildren: function (id, nextChildIDs) {
    var item = getItem(id);
    !item ? invariant(false, 'Item must have been set') : void 0;
    item.childIDs = nextChildIDs;

    for (var i = 0; i < nextChildIDs.length; i++) {
      var nextChildID = nextChildIDs[i];
      var nextChild = getItem(nextChildID);
      !nextChild ? invariant(false, 'Expected hook events to fire for the child before its parent includes it in onSetChildren().') : void 0;
      !(nextChild.childIDs != null || typeof nextChild.element !== 'object' || nextChild.element == null) ? invariant(false, 'Expected onSetChildren() to fire for a container child before its parent includes it in onSetChildren().') : void 0;
      !nextChild.isMounted ? invariant(false, 'Expected onMountComponent() to fire for the child before its parent includes it in onSetChildren().') : void 0;
      if (nextChild.parentID == null) {
        nextChild.parentID = id;
        // TODO: This shouldn't be necessary but mounting a new root during in
        // componentWillMount currently causes not-yet-mounted components to
        // be purged from our tree data so their parent id is missing.
      }
      !(nextChild.parentID === id) ? invariant(false, 'Expected onBeforeMountComponent() parent and onSetChildren() to be consistent (%s has parents %s and %s).', nextChildID, nextChild.parentID, id) : void 0;
    }
  },
  onBeforeMountComponent: function (id, element, parentID) {
    var item = {
      element: element,
      parentID: parentID,
      text: null,
      childIDs: [],
      isMounted: false,
      updateCount: 0
    };
    setItem(id, item);
  },
  onBeforeUpdateComponent: function (id, element) {
    var item = getItem(id);
    if (!item || !item.isMounted) {
      // We may end up here as a result of setState() in componentWillUnmount().
      // In this case, ignore the element.
      return;
    }
    item.element = element;
  },
  onMountComponent: function (id) {
    var item = getItem(id);
    !item ? invariant(false, 'Item must have been set') : void 0;
    item.isMounted = true;
    var isRoot = item.parentID === 0;
    if (isRoot) {
      addRoot(id);
    }
  },
  onUpdateComponent: function (id) {
    var item = getItem(id);
    if (!item || !item.isMounted) {
      // We may end up here as a result of setState() in componentWillUnmount().
      // In this case, ignore the element.
      return;
    }
    item.updateCount++;
  },
  onUnmountComponent: function (id) {
    var item = getItem(id);
    if (item) {
      // We need to check if it exists.
      // `item` might not exist if it is inside an error boundary, and a sibling
      // error boundary child threw while mounting. Then this instance never
      // got a chance to mount, but it still gets an unmounting event during
      // the error boundary cleanup.
      item.isMounted = false;
      var isRoot = item.parentID === 0;
      if (isRoot) {
        removeRoot(id);
      }
    }
    unmountedIDs.push(id);
  },
  purgeUnmountedComponents: function () {
    if (ReactComponentTreeHook._preventPurging) {
      // Should only be used for testing.
      return;
    }

    for (var i = 0; i < unmountedIDs.length; i++) {
      var id = unmountedIDs[i];
      purgeDeep(id);
    }
    unmountedIDs.length = 0;
  },
  isMounted: function (id) {
    var item = getItem(id);
    return item ? item.isMounted : false;
  },
  getCurrentStackAddendum: function () {
    var info = '';
    var currentOwner = ReactCurrentOwner_1.current;
    if (currentOwner) {
      !(typeof currentOwner.tag !== 'number') ? invariant(false, 'Fiber owners should not show up in Stack stack traces.') : void 0;
      if (typeof currentOwner._debugID === 'number') {
        info += ReactComponentTreeHook.getStackAddendumByID(currentOwner._debugID);
      }
    }
    return info;
  },
  getStackAddendumByID: function (id) {
    var info = '';
    while (id) {
      info += describeID(id);
      id = ReactComponentTreeHook.getParentID(id);
    }
    return info;
  },
  getChildIDs: function (id) {
    var item = getItem(id);
    return item ? item.childIDs : [];
  },
  getDisplayName: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (!element) {
      return null;
    }
    return getDisplayName$1(element);
  },
  getElement: function (id) {
    var item = getItem(id);
    return item ? item.element : null;
  },
  getOwnerID: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (!element || !element._owner) {
      return null;
    }
    return element._owner._debugID;
  },
  getParentID: function (id) {
    var item = getItem(id);
    return item ? item.parentID : null;
  },
  getSource: function (id) {
    var item = getItem(id);
    var element = item ? item.element : null;
    var source = element != null ? element._source : null;
    return source;
  },
  getText: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (typeof element === 'string') {
      return element;
    } else if (typeof element === 'number') {
      return '' + element;
    } else {
      return null;
    }
  },
  getUpdateCount: function (id) {
    var item = getItem(id);
    return item ? item.updateCount : 0;
  },


  getRootIDs: getRootIDs,
  getRegisteredIDs: getItemIDs
};

var ReactComponentTreeHook_1 = ReactComponentTreeHook;

var createElement = ReactElement_1.createElement;
var createFactory = ReactElement_1.createFactory;
var cloneElement = ReactElement_1.cloneElement;

{
  var ReactElementValidator = ReactElementValidator_1;
  createElement = ReactElementValidator.createElement;
  createFactory = ReactElementValidator.createFactory;
  cloneElement = ReactElementValidator.cloneElement;
}

var React = {
  Children: {
    map: ReactChildren_1.map,
    forEach: ReactChildren_1.forEach,
    count: ReactChildren_1.count,
    toArray: ReactChildren_1.toArray,
    only: onlyChild_1
  },

  Component: ReactBaseClasses.Component,
  PureComponent: ReactBaseClasses.PureComponent,
  unstable_AsyncComponent: ReactBaseClasses.AsyncComponent,

  createElement: createElement,
  cloneElement: cloneElement,
  isValidElement: ReactElement_1.isValidElement,

  createFactory: createFactory,

  version: ReactVersion,

  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
    ReactCurrentOwner: ReactCurrentOwner_1,
    // Used by renderers to avoid bundling object-assign twice in UMD bundles:
    assign: objectAssign$1
  }
};

{
  objectAssign$1(React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, {
    // These should not be included in production.
    ReactComponentTreeHook: ReactComponentTreeHook_1,
    ReactDebugCurrentFrame: ReactDebugCurrentFrame_1
  });
}

var ReactEntry = React;

module.exports = ReactEntry;

})();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(1);
  var warning = __webpack_require__(5);
  var ReactPropTypesSecret = __webpack_require__(12);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/*! powerbi-client v2.4.1 | (c) 2016 Microsoft Corporation MIT */
(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["powerbi-client"] = factory();
	else
		root["powerbi-client"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	var service = __webpack_require__(1);
	exports.service = service;
	var factories = __webpack_require__(12);
	exports.factories = factories;
	var models = __webpack_require__(4);
	exports.models = models;
	var report_1 = __webpack_require__(5);
	exports.Report = report_1.Report;
	var dashboard_1 = __webpack_require__(9);
	exports.Dashboard = dashboard_1.Dashboard;
	var tile_1 = __webpack_require__(10);
	exports.Tile = tile_1.Tile;
	var embed_1 = __webpack_require__(2);
	exports.Embed = embed_1.Embed;
	var page_1 = __webpack_require__(6);
	exports.Page = page_1.Page;
	/**
	 * Makes Power BI available to the global object for use in applications that don't have module loading support.
	 *
	 * Note: create an instance of the class with the default configuration for normal usage, or save the class so that you can create an instance of the service.
	 */
	var powerbi = new service.Service(factories.hpmFactory, factories.wpmpFactory, factories.routerFactory);
	window.powerbi = powerbi;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	var embed = __webpack_require__(2);
	var report_1 = __webpack_require__(5);
	var create_1 = __webpack_require__(8);
	var dashboard_1 = __webpack_require__(9);
	var tile_1 = __webpack_require__(10);
	var page_1 = __webpack_require__(6);
	var qna_1 = __webpack_require__(11);
	var utils = __webpack_require__(3);
	/**
	 * The Power BI Service embed component, which is the entry point to embed all other Power BI components into your application
	 *
	 * @export
	 * @class Service
	 * @implements {IService}
	 */
	var Service = (function () {
	    /**
	     * Creates an instance of a Power BI Service.
	     *
	     * @param {IHpmFactory} hpmFactory The http post message factory used in the postMessage communication layer
	     * @param {IWpmpFactory} wpmpFactory The window post message factory used in the postMessage communication layer
	     * @param {IRouterFactory} routerFactory The router factory used in the postMessage communication layer
	     * @param {IServiceConfiguration} [config={}]
	     */
	    function Service(hpmFactory, wpmpFactory, routerFactory, config) {
	        var _this = this;
	        if (config === void 0) { config = {}; }
	        this.wpmp = wpmpFactory(config.wpmpName, config.logMessages);
	        this.hpm = hpmFactory(this.wpmp, null, config.version, config.type);
	        this.router = routerFactory(this.wpmp);
	        /**
	         * Adds handler for report events.
	         */
	        this.router.post("/reports/:uniqueId/events/:eventName", function (req, res) {
	            var event = {
	                type: 'report',
	                id: req.params.uniqueId,
	                name: req.params.eventName,
	                value: req.body
	            };
	            _this.handleEvent(event);
	        });
	        this.router.post("/reports/:uniqueId/pages/:pageName/events/:eventName", function (req, res) {
	            var event = {
	                type: 'report',
	                id: req.params.uniqueId,
	                name: req.params.eventName,
	                value: req.body
	            };
	            _this.handleEvent(event);
	        });
	        this.router.post("/dashboards/:uniqueId/events/:eventName", function (req, res) {
	            var event = {
	                type: 'dashboard',
	                id: req.params.uniqueId,
	                name: req.params.eventName,
	                value: req.body
	            };
	            _this.handleEvent(event);
	        });
	        /**
	         * Adds handler for Q&A events.
	         */
	        this.router.post("/qna/:uniqueId/events/:eventName", function (req, res) {
	            var event = {
	                type: 'qna',
	                id: req.params.uniqueId,
	                name: req.params.eventName,
	                value: req.body
	            };
	            _this.handleEvent(event);
	        });
	        this.embeds = [];
	        // TODO: Change when Object.assign is available.
	        this.config = utils.assign({}, Service.defaultConfig, config);
	        if (this.config.autoEmbedOnContentLoaded) {
	            this.enableAutoEmbed();
	        }
	    }
	    /**
	     * Creates new report
	     * @param {HTMLElement} element
	     * @param {embed.IEmbedConfiguration} [config={}]
	     * @returns {embed.Embed}
	     */
	    Service.prototype.createReport = function (element, config) {
	        config.type = 'create';
	        var powerBiElement = element;
	        var component = new create_1.Create(this, powerBiElement, config);
	        powerBiElement.powerBiEmbed = component;
	        this.addOrOverwriteEmbed(component, element);
	        return component;
	    };
	    /**
	     * TODO: Add a description here
	     *
	     * @param {HTMLElement} [container]
	     * @param {embed.IEmbedConfiguration} [config=undefined]
	     * @returns {embed.Embed[]}
	     */
	    Service.prototype.init = function (container, config) {
	        var _this = this;
	        if (config === void 0) { config = undefined; }
	        container = (container && container instanceof HTMLElement) ? container : document.body;
	        var elements = Array.prototype.slice.call(container.querySelectorAll("[" + embed.Embed.embedUrlAttribute + "]"));
	        return elements.map(function (element) { return _this.embed(element, config); });
	    };
	    /**
	     * Given a configuration based on an HTML element,
	     * if the component has already been created and attached to the element, reuses the component instance and existing iframe,
	     * otherwise creates a new component instance.
	     *
	     * @param {HTMLElement} element
	     * @param {embed.IEmbedConfigurationBase} [config={}]
	     * @returns {embed.Embed}
	     */
	    Service.prototype.embed = function (element, config) {
	        if (config === void 0) { config = {}; }
	        return this.embedInternal(element, config);
	    };
	    Service.prototype.embedInternal = function (element, config) {
	        if (config === void 0) { config = {}; }
	        var component;
	        var powerBiElement = element;
	        if (powerBiElement.powerBiEmbed) {
	            component = this.embedExisting(powerBiElement, config);
	        }
	        else {
	            component = this.embedNew(powerBiElement, config);
	        }
	        return component;
	    };
	    /**
	     * Given a configuration based on a Power BI element, saves the component instance that reference the element for later lookup.
	     *
	     * @private
	     * @param {IPowerBiElement} element
	     * @param {embed.IEmbedConfigurationBase} config
	     * @returns {embed.Embed}
	     */
	    Service.prototype.embedNew = function (element, config) {
	        var componentType = config.type || element.getAttribute(embed.Embed.typeAttribute);
	        if (!componentType) {
	            throw new Error("Attempted to embed using config " + JSON.stringify(config) + " on element " + element.outerHTML + ", but could not determine what type of component to embed. You must specify a type in the configuration or as an attribute such as '" + embed.Embed.typeAttribute + "=\"" + report_1.Report.type.toLowerCase() + "\"'.");
	        }
	        // Saves the type as part of the configuration so that it can be referenced later at a known location.
	        config.type = componentType;
	        var Component = utils.find(function (component) { return componentType === component.type.toLowerCase(); }, Service.components);
	        if (!Component) {
	            throw new Error("Attempted to embed component of type: " + componentType + " but did not find any matching component.  Please verify the type you specified is intended.");
	        }
	        var component = new Component(this, element, config);
	        element.powerBiEmbed = component;
	        this.addOrOverwriteEmbed(component, element);
	        return component;
	    };
	    /**
	     * Given an element that already contains an embed component, load with a new configuration.
	     *
	     * @private
	     * @param {IPowerBiElement} element
	     * @param {embed.IEmbedConfigurationBase} config
	     * @returns {embed.Embed}
	     */
	    Service.prototype.embedExisting = function (element, config) {
	        var component = utils.find(function (x) { return x.element === element; }, this.embeds);
	        if (!component) {
	            throw new Error("Attempted to embed using config " + JSON.stringify(config) + " on element " + element.outerHTML + " which already has embedded comopnent associated, but could not find the existing comopnent in the list of active components. This could indicate the embeds list is out of sync with the DOM, or the component is referencing the incorrect HTML element.");
	        }
	        // TODO: Multiple embedding to the same iframe is not supported in QnA
	        if (config.type && config.type.toLowerCase() === "qna") {
	            return this.embedNew(element, config);
	        }
	        /**
	         * TODO: Dynamic embed type switching could be supported but there is work needed to prepare the service state and DOM cleanup.
	         * remove all event handlers from the DOM, then reset the element to initial state which removes iframe, and removes from list of embeds
	         * then we can call the embedNew function which would allow setting the proper embedUrl and construction of object based on the new type.
	         */
	        if (typeof config.type === "string" && config.type !== component.config.type) {
	            /**
	             * When loading report after create we want to use existing Iframe to optimize load period
	             */
	            if (config.type === "report" && component.config.type === "create") {
	                var report = new report_1.Report(this, element, config, element.powerBiEmbed.iframe);
	                report.load(config);
	                element.powerBiEmbed = report;
	                this.addOrOverwriteEmbed(component, element);
	                return report;
	            }
	            throw new Error("Embedding on an existing element with a different type than the previous embed object is not supported.  Attempted to embed using config " + JSON.stringify(config) + " on element " + element.outerHTML + ", but the existing element contains an embed of type: " + this.config.type + " which does not match the new type: " + config.type);
	        }
	        component.load(config);
	        return component;
	    };
	    /**
	     * Adds an event handler for DOMContentLoaded, which searches the DOM for elements that have the 'powerbi-embed-url' attribute,
	     * and automatically attempts to embed a powerbi component based on information from other powerbi-* attributes.
	     *
	     * Note: Only runs if `config.autoEmbedOnContentLoaded` is true when the service is created.
	     * This handler is typically useful only for applications that are rendered on the server so that all required data is available when the handler is called.
	     */
	    Service.prototype.enableAutoEmbed = function () {
	        var _this = this;
	        window.addEventListener('DOMContentLoaded', function (event) { return _this.init(document.body); }, false);
	    };
	    /**
	     * Returns an instance of the component associated with the element.
	     *
	     * @param {HTMLElement} element
	     * @returns {(Report | Tile)}
	     */
	    Service.prototype.get = function (element) {
	        var powerBiElement = element;
	        if (!powerBiElement.powerBiEmbed) {
	            throw new Error("You attempted to get an instance of powerbi component associated with element: " + element.outerHTML + " but there was no associated instance.");
	        }
	        return powerBiElement.powerBiEmbed;
	    };
	    /**
	     * Finds an embed instance by the name or unique ID that is provided.
	     *
	     * @param {string} uniqueId
	     * @returns {(Report | Tile)}
	     */
	    Service.prototype.find = function (uniqueId) {
	        return utils.find(function (x) { return x.config.uniqueId === uniqueId; }, this.embeds);
	    };
	    Service.prototype.addOrOverwriteEmbed = function (component, element) {
	        // remove embeds over the same div element.
	        this.embeds = this.embeds.filter(function (embed) {
	            return embed.element.id !== element.id;
	        });
	        this.embeds.push(component);
	    };
	    /**
	     * Given an HTML element that has a component embedded within it, removes the component from the list of embedded components, removes the association between the element and the component, and removes the iframe.
	     *
	     * @param {HTMLElement} element
	     * @returns {void}
	     */
	    Service.prototype.reset = function (element) {
	        var powerBiElement = element;
	        if (!powerBiElement.powerBiEmbed) {
	            return;
	        }
	        /** Removes the component from an internal list of components. */
	        utils.remove(function (x) { return x === powerBiElement.powerBiEmbed; }, this.embeds);
	        /** Deletes a property from the HTML element. */
	        delete powerBiElement.powerBiEmbed;
	        /** Removes the iframe from the element. */
	        var iframe = element.querySelector('iframe');
	        if (iframe) {
	            if (iframe.remove !== undefined) {
	                iframe.remove();
	            }
	            else {
	                /** Workaround for IE: unhandled rejection TypeError: object doesn't support propert or method 'remove' */
	                iframe.parentElement.removeChild(iframe);
	            }
	        }
	    };
	    /**
	     * handles tile events
	     *
	     * @param {IEvent<any>} event
	     */
	    Service.prototype.handleTileEvents = function (event) {
	        if (event.type === 'tile') {
	            this.handleEvent(event);
	        }
	    };
	    /**
	     * Given an event object, finds the embed component with the matching type and ID, and invokes its handleEvent method with the event object.
	     *
	     * @private
	     * @param {IEvent<any>} event
	     */
	    Service.prototype.handleEvent = function (event) {
	        var embed = utils.find(function (embed) {
	            return (embed.config.uniqueId === event.id);
	        }, this.embeds);
	        if (embed) {
	            var value = event.value;
	            if (event.name === 'pageChanged') {
	                var pageKey = 'newPage';
	                var page = value[pageKey];
	                if (!page) {
	                    throw new Error("Page model not found at 'event.value." + pageKey + "'.");
	                }
	                value[pageKey] = new page_1.Page(embed, page.name, page.displayName, true /* isActive */);
	            }
	            utils.raiseCustomEvent(embed.element, event.name, value);
	        }
	    };
	    /**
	     * A list of components that this service can embed
	     */
	    Service.components = [
	        tile_1.Tile,
	        report_1.Report,
	        dashboard_1.Dashboard,
	        qna_1.Qna
	    ];
	    /**
	     * The default configuration for the service
	     */
	    Service.defaultConfig = {
	        autoEmbedOnContentLoaded: false,
	        onError: function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i - 0] = arguments[_i];
	            }
	            return console.log(args[0], args.slice(1));
	        }
	    };
	    return Service;
	}());
	exports.Service = Service;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	var utils = __webpack_require__(3);
	var models = __webpack_require__(4);
	/**
	 * Base class for all Power BI embed components
	 *
	 * @export
	 * @abstract
	 * @class Embed
	 */
	var Embed = (function () {
	    /**
	     * Creates an instance of Embed.
	     *
	     * Note: there is circular reference between embeds and the service, because
	     * the service has a list of all embeds on the host page, and each embed has a reference to the service that created it.
	     *
	     * @param {service.Service} service
	     * @param {HTMLElement} element
	     * @param {IEmbedConfigurationBase} config
	     */
	    function Embed(service, element, config, iframe) {
	        this.allowedEvents = [];
	        Array.prototype.push.apply(this.allowedEvents, Embed.allowedEvents);
	        this.eventHandlers = [];
	        this.service = service;
	        this.element = element;
	        this.iframe = iframe;
	        this.embeType = config.type.toLowerCase();
	        this.populateConfig(config);
	        if (this.embeType === 'create') {
	            this.setIframe(false /*set EventListener to call create() on 'load' event*/);
	        }
	        else {
	            this.setIframe(true /*set EventListener to call load() on 'load' event*/);
	        }
	    }
	    /**
	     * Sends createReport configuration data.
	     *
	     * ```javascript
	     * createReport({
	     *   datasetId: '5dac7a4a-4452-46b3-99f6-a25915e0fe55',
	     *   accessToken: 'eyJ0eXA ... TaE2rTSbmg',
	     * ```
	     *
	     * @param {models.IReportCreateConfiguration} config
	     * @returns {Promise<void>}
	     */
	    Embed.prototype.createReport = function (config) {
	        var errors = models.validateCreateReport(config);
	        if (errors) {
	            throw errors;
	        }
	        return this.service.hpm.post("/report/create", config, { uid: this.config.uniqueId }, this.iframe.contentWindow)
	            .then(function (response) {
	            return response.body;
	        }, function (response) {
	            throw response.body;
	        });
	    };
	    /**
	     * Saves Report.
	     *
	     * @returns {Promise<void>}
	     */
	    Embed.prototype.save = function () {
	        return this.service.hpm.post('/report/save', null, { uid: this.config.uniqueId }, this.iframe.contentWindow)
	            .then(function (response) {
	            return response.body;
	        })
	            .catch(function (response) {
	            throw response.body;
	        });
	    };
	    /**
	     * SaveAs Report.
	     *
	     * @returns {Promise<void>}
	     */
	    Embed.prototype.saveAs = function (saveAsParameters) {
	        return this.service.hpm.post('/report/saveAs', saveAsParameters, { uid: this.config.uniqueId }, this.iframe.contentWindow)
	            .then(function (response) {
	            return response.body;
	        })
	            .catch(function (response) {
	            throw response.body;
	        });
	    };
	    /**
	     * Sends load configuration data.
	     *
	     * ```javascript
	     * report.load({
	     *   type: 'report',
	     *   id: '5dac7a4a-4452-46b3-99f6-a25915e0fe55',
	     *   accessToken: 'eyJ0eXA ... TaE2rTSbmg',
	     *   settings: {
	     *     navContentPaneEnabled: false
	     *   },
	     *   pageName: "DefaultPage",
	     *   filters: [
	     *     {
	     *        ...  DefaultReportFilter ...
	     *     }
	     *   ]
	     * })
	     *   .catch(error => { ... });
	     * ```
	     *
	     * @param {models.ILoadConfiguration} config
	     * @returns {Promise<void>}
	     */
	    Embed.prototype.load = function (config) {
	        var _this = this;
	        var errors = this.validate(config);
	        if (errors) {
	            throw errors;
	        }
	        return this.service.hpm.post(this.loadPath, config, { uid: this.config.uniqueId }, this.iframe.contentWindow)
	            .then(function (response) {
	            utils.assign(_this.config, config);
	            return response.body;
	        }, function (response) {
	            throw response.body;
	        });
	    };
	    /**
	     * Removes one or more event handlers from the list of handlers.
	     * If a reference to the existing handle function is specified, remove the specific handler.
	     * If the handler is not specified, remove all handlers for the event name specified.
	     *
	     * ```javascript
	     * report.off('pageChanged')
	     *
	     * or
	     *
	     * const logHandler = function (event) {
	     *    console.log(event);
	     * };
	     *
	     * report.off('pageChanged', logHandler);
	     * ```
	     *
	     * @template T
	     * @param {string} eventName
	     * @param {service.IEventHandler<T>} [handler]
	     */
	    Embed.prototype.off = function (eventName, handler) {
	        var _this = this;
	        var fakeEvent = { name: eventName, type: null, id: null, value: null };
	        if (handler) {
	            utils.remove(function (eventHandler) { return eventHandler.test(fakeEvent) && (eventHandler.handle === handler); }, this.eventHandlers);
	            this.element.removeEventListener(eventName, handler);
	        }
	        else {
	            var eventHandlersToRemove = this.eventHandlers
	                .filter(function (eventHandler) { return eventHandler.test(fakeEvent); });
	            eventHandlersToRemove
	                .forEach(function (eventHandlerToRemove) {
	                utils.remove(function (eventHandler) { return eventHandler === eventHandlerToRemove; }, _this.eventHandlers);
	                _this.element.removeEventListener(eventName, eventHandlerToRemove.handle);
	            });
	        }
	    };
	    /**
	     * Adds an event handler for a specific event.
	     *
	     * ```javascript
	     * report.on('pageChanged', (event) => {
	     *   console.log('PageChanged: ', event.page.name);
	     * });
	     * ```
	     *
	     * @template T
	     * @param {string} eventName
	     * @param {service.IEventHandler<T>} handler
	     */
	    Embed.prototype.on = function (eventName, handler) {
	        if (this.allowedEvents.indexOf(eventName) === -1) {
	            throw new Error("eventName is must be one of " + this.allowedEvents + ". You passed: " + eventName);
	        }
	        this.eventHandlers.push({
	            test: function (event) { return event.name === eventName; },
	            handle: handler
	        });
	        this.element.addEventListener(eventName, handler);
	    };
	    /**
	     * Reloads embed using existing configuration.
	     * E.g. For reports this effectively clears all filters and makes the first page active which simulates resetting a report back to loaded state.
	     *
	     * ```javascript
	     * report.reload();
	     * ```
	     */
	    Embed.prototype.reload = function () {
	        return this.load(this.config);
	    };
	    /**
	     * Set accessToken.
	     *
	     * @returns {Promise<void>}
	     */
	    Embed.prototype.setAccessToken = function (accessToken) {
	        return this.service.hpm.post('/report/token', accessToken, { uid: this.config.uniqueId }, this.iframe.contentWindow)
	            .then(function (response) {
	            return response.body;
	        })
	            .catch(function (response) {
	            throw response.body;
	        });
	    };
	    /**
	     * Gets an access token from the first available location: config, attribute, global.
	     *
	     * @private
	     * @param {string} globalAccessToken
	     * @returns {string}
	     */
	    Embed.prototype.getAccessToken = function (globalAccessToken) {
	        var accessToken = this.config.accessToken || this.element.getAttribute(Embed.accessTokenAttribute) || globalAccessToken;
	        if (!accessToken) {
	            throw new Error("No access token was found for element. You must specify an access token directly on the element using attribute '" + Embed.accessTokenAttribute + "' or specify a global token at: powerbi.accessToken.");
	        }
	        return accessToken;
	    };
	    /**
	     * Populate config for create and load
	     *
	     * @param {IEmbedConfiguration}
	     * @returns {void}
	     */
	    Embed.prototype.populateConfig = function (config) {
	        this.config = config;
	        // TODO: Change when Object.assign is available.
	        this.config.uniqueId = this.getUniqueId();
	        this.config.embedUrl = this.getEmbedUrl();
	        this.config.accessToken = this.getAccessToken(this.service.accessToken);
	        this.addLocaleToEmbedUrl(config);
	    };
	    /**
	     * Adds locale parameters to embedUrl
	     *
	     * @private
	     * @param {IEmbedConfiguration} config
	     */
	    Embed.prototype.addLocaleToEmbedUrl = function (config) {
	        if (!config.settings) {
	            return;
	        }
	        var localeSettings = config.settings.localeSettings;
	        if (localeSettings && localeSettings.language) {
	            this.config.embedUrl = utils.addParamToUrl(this.config.embedUrl, 'language', localeSettings.language);
	        }
	        if (localeSettings && localeSettings.formatLocale) {
	            this.config.embedUrl = utils.addParamToUrl(this.config.embedUrl, 'formatLocale', localeSettings.formatLocale);
	        }
	    };
	    /**
	     * Gets an embed url from the first available location: options, attribute.
	     *
	     * @private
	     * @returns {string}
	     */
	    Embed.prototype.getEmbedUrl = function () {
	        var embedUrl = this.config.embedUrl || this.element.getAttribute(Embed.embedUrlAttribute);
	        if (typeof embedUrl !== 'string' || embedUrl.length === 0) {
	            throw new Error("Embed Url is required, but it was not found. You must provide an embed url either as part of embed configuration or as attribute '" + Embed.embedUrlAttribute + "'.");
	        }
	        return embedUrl;
	    };
	    /**
	     * Gets a unique ID from the first available location: options, attribute.
	     * If neither is provided generate a unique string.
	     *
	     * @private
	     * @returns {string}
	     */
	    Embed.prototype.getUniqueId = function () {
	        return this.config.uniqueId || this.element.getAttribute(Embed.nameAttribute) || utils.createRandomString();
	    };
	    /**
	     * Requests the browser to render the component's iframe in fullscreen mode.
	     */
	    Embed.prototype.fullscreen = function () {
	        var requestFullScreen = this.iframe.requestFullscreen || this.iframe.msRequestFullscreen || this.iframe.mozRequestFullScreen || this.iframe.webkitRequestFullscreen;
	        requestFullScreen.call(this.iframe);
	    };
	    /**
	     * Requests the browser to exit fullscreen mode.
	     */
	    Embed.prototype.exitFullscreen = function () {
	        if (!this.isFullscreen(this.iframe)) {
	            return;
	        }
	        var exitFullscreen = document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.msExitFullscreen;
	        exitFullscreen.call(document);
	    };
	    /**
	     * Returns true if the iframe is rendered in fullscreen mode,
	     * otherwise returns false.
	     *
	     * @private
	     * @param {HTMLIFrameElement} iframe
	     * @returns {boolean}
	     */
	    Embed.prototype.isFullscreen = function (iframe) {
	        var options = ['fullscreenElement', 'webkitFullscreenElement', 'mozFullscreenScreenElement', 'msFullscreenElement'];
	        return options.some(function (option) { return document[option] === iframe; });
	    };
	    /**
	     * Sets Iframe for embed
	     */
	    Embed.prototype.setIframe = function (isLoad) {
	        var _this = this;
	        if (!this.iframe) {
	            var iframeContent = document.createElement("iframe");
	            var embedUrl = this.config.embedUrl;
	            iframeContent.setAttribute("style", "width:100%;height:100%;");
	            iframeContent.setAttribute("src", embedUrl);
	            iframeContent.setAttribute("scrolling", "no");
	            iframeContent.setAttribute("allowfullscreen", "true");
	            var node = this.element;
	            while (node.firstChild) {
	                node.removeChild(node.firstChild);
	            }
	            node.appendChild(iframeContent);
	            this.iframe = node.firstChild;
	        }
	        if (isLoad) {
	            this.iframe.addEventListener('load', function () { return _this.load(_this.config); }, false);
	        }
	        else {
	            this.iframe.addEventListener('load', function () { return _this.createReport(_this.createConfig); }, false);
	        }
	    };
	    Embed.allowedEvents = ["loaded", "saved", "rendered", "saveAsTriggered", "error", "dataSelected"];
	    Embed.accessTokenAttribute = 'powerbi-access-token';
	    Embed.embedUrlAttribute = 'powerbi-embed-url';
	    Embed.nameAttribute = 'powerbi-name';
	    Embed.typeAttribute = 'powerbi-type';
	    return Embed;
	}());
	exports.Embed = Embed;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	/**
	 * Raises a custom event with event data on the specified HTML element.
	 *
	 * @export
	 * @param {HTMLElement} element
	 * @param {string} eventName
	 * @param {*} eventData
	 */
	function raiseCustomEvent(element, eventName, eventData) {
	    var customEvent;
	    if (typeof CustomEvent === 'function') {
	        customEvent = new CustomEvent(eventName, {
	            detail: eventData,
	            bubbles: true,
	            cancelable: true
	        });
	    }
	    else {
	        customEvent = document.createEvent('CustomEvent');
	        customEvent.initCustomEvent(eventName, true, true, eventData);
	    }
	    element.dispatchEvent(customEvent);
	}
	exports.raiseCustomEvent = raiseCustomEvent;
	/**
	 * Finds the index of the first value in an array that matches the specified predicate.
	 *
	 * @export
	 * @template T
	 * @param {(x: T) => boolean} predicate
	 * @param {T[]} xs
	 * @returns {number}
	 */
	function findIndex(predicate, xs) {
	    if (!Array.isArray(xs)) {
	        throw new Error("You attempted to call find with second parameter that was not an array. You passed: " + xs);
	    }
	    var index;
	    xs.some(function (x, i) {
	        if (predicate(x)) {
	            index = i;
	            return true;
	        }
	    });
	    return index;
	}
	exports.findIndex = findIndex;
	/**
	 * Finds the first value in an array that matches the specified predicate.
	 *
	 * @export
	 * @template T
	 * @param {(x: T) => boolean} predicate
	 * @param {T[]} xs
	 * @returns {T}
	 */
	function find(predicate, xs) {
	    var index = findIndex(predicate, xs);
	    return xs[index];
	}
	exports.find = find;
	function remove(predicate, xs) {
	    var index = findIndex(predicate, xs);
	    xs.splice(index, 1);
	}
	exports.remove = remove;
	// See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
	// TODO: replace in favor of using polyfill
	/**
	 * Copies the values of all enumerable properties from one or more source objects to a target object, and returns the target object.
	 *
	 * @export
	 * @param {any} args
	 * @returns
	 */
	function assign() {
	    var args = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        args[_i - 0] = arguments[_i];
	    }
	    var target = args[0];
	    'use strict';
	    if (target === undefined || target === null) {
	        throw new TypeError('Cannot convert undefined or null to object');
	    }
	    var output = Object(target);
	    for (var index = 1; index < arguments.length; index++) {
	        var source = arguments[index];
	        if (source !== undefined && source !== null) {
	            for (var nextKey in source) {
	                if (source.hasOwnProperty(nextKey)) {
	                    output[nextKey] = source[nextKey];
	                }
	            }
	        }
	    }
	    return output;
	}
	exports.assign = assign;
	/**
	 * Generates a random 7 character string.
	 *
	 * @export
	 * @returns {string}
	 */
	function createRandomString() {
	    return (Math.random() + 1).toString(36).substring(7);
	}
	exports.createRandomString = createRandomString;
	/**
	 * Adds a parameter to the given url
	 *
	 * @export
	 * @param {string} url
	 * @param {string} paramName
	 * @param {string} value
	 * @returns {string}
	 */
	function addParamToUrl(url, paramName, value) {
	    var parameterPrefix = url.indexOf('?') > 0 ? '&' : '?';
	    url += parameterPrefix + paramName + '=' + value;
	    return url;
	}
	exports.addParamToUrl = addParamToUrl;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	/*! powerbi-models v1.0.0 | (c) 2016 Microsoft Corporation MIT */
	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define([], factory);
		else if(typeof exports === 'object')
			exports["powerbi-models"] = factory();
		else
			root["powerbi-models"] = factory();
	})(this, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	/******/
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	/******/
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	/******/
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};
	/******/
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	/******/
	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;
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
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	/******/
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ (function(module, exports, __webpack_require__) {
	
		var __extends = (this && this.__extends) || (function () {
		    var extendStatics = Object.setPrototypeOf ||
		        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
		        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
		    return function (d, b) {
		        extendStatics(d, b);
		        function __() { this.constructor = d; }
		        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		    };
		})();
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.Validators = __webpack_require__(1).Validators;
		var PageSizeType;
		(function (PageSizeType) {
		    PageSizeType[PageSizeType["Widescreen"] = 0] = "Widescreen";
		    PageSizeType[PageSizeType["Standard"] = 1] = "Standard";
		    PageSizeType[PageSizeType["Cortana"] = 2] = "Cortana";
		    PageSizeType[PageSizeType["Letter"] = 3] = "Letter";
		    PageSizeType[PageSizeType["Custom"] = 4] = "Custom";
		})(PageSizeType = exports.PageSizeType || (exports.PageSizeType = {}));
		var DisplayOption;
		(function (DisplayOption) {
		    DisplayOption[DisplayOption["FitToPage"] = 0] = "FitToPage";
		    DisplayOption[DisplayOption["FitToWidth"] = 1] = "FitToWidth";
		    DisplayOption[DisplayOption["ActualSize"] = 2] = "ActualSize";
		})(DisplayOption = exports.DisplayOption || (exports.DisplayOption = {}));
		var VisualContainerDisplayMode;
		(function (VisualContainerDisplayMode) {
		    VisualContainerDisplayMode[VisualContainerDisplayMode["Visible"] = 0] = "Visible";
		    VisualContainerDisplayMode[VisualContainerDisplayMode["Hidden"] = 1] = "Hidden";
		})(VisualContainerDisplayMode = exports.VisualContainerDisplayMode || (exports.VisualContainerDisplayMode = {}));
		var LayoutType;
		(function (LayoutType) {
		    LayoutType[LayoutType["Master"] = 0] = "Master";
		    LayoutType[LayoutType["Custom"] = 1] = "Custom";
		})(LayoutType = exports.LayoutType || (exports.LayoutType = {}));
		var Permissions;
		(function (Permissions) {
		    Permissions[Permissions["Read"] = 0] = "Read";
		    Permissions[Permissions["ReadWrite"] = 1] = "ReadWrite";
		    Permissions[Permissions["Copy"] = 2] = "Copy";
		    Permissions[Permissions["Create"] = 4] = "Create";
		    Permissions[Permissions["All"] = 7] = "All";
		})(Permissions = exports.Permissions || (exports.Permissions = {}));
		var ViewMode;
		(function (ViewMode) {
		    ViewMode[ViewMode["View"] = 0] = "View";
		    ViewMode[ViewMode["Edit"] = 1] = "Edit";
		})(ViewMode = exports.ViewMode || (exports.ViewMode = {}));
		var TokenType;
		(function (TokenType) {
		    TokenType[TokenType["Aad"] = 0] = "Aad";
		    TokenType[TokenType["Embed"] = 1] = "Embed";
		})(TokenType = exports.TokenType || (exports.TokenType = {}));
		var FilterType;
		(function (FilterType) {
		    FilterType[FilterType["Advanced"] = 0] = "Advanced";
		    FilterType[FilterType["Basic"] = 1] = "Basic";
		    FilterType[FilterType["Unknown"] = 2] = "Unknown";
		    FilterType[FilterType["IncludeExclude"] = 3] = "IncludeExclude";
		    FilterType[FilterType["RelativeDate"] = 4] = "RelativeDate";
		    FilterType[FilterType["TopN"] = 5] = "TopN";
		})(FilterType = exports.FilterType || (exports.FilterType = {}));
		var RelativeDateFilterTimeUnit;
		(function (RelativeDateFilterTimeUnit) {
		    RelativeDateFilterTimeUnit[RelativeDateFilterTimeUnit["Days"] = 0] = "Days";
		    RelativeDateFilterTimeUnit[RelativeDateFilterTimeUnit["Weeks"] = 1] = "Weeks";
		    RelativeDateFilterTimeUnit[RelativeDateFilterTimeUnit["CalendarWeeks"] = 2] = "CalendarWeeks";
		    RelativeDateFilterTimeUnit[RelativeDateFilterTimeUnit["Months"] = 3] = "Months";
		    RelativeDateFilterTimeUnit[RelativeDateFilterTimeUnit["CalendarMonths"] = 4] = "CalendarMonths";
		    RelativeDateFilterTimeUnit[RelativeDateFilterTimeUnit["Years"] = 5] = "Years";
		    RelativeDateFilterTimeUnit[RelativeDateFilterTimeUnit["CalendarYears"] = 6] = "CalendarYears";
		})(RelativeDateFilterTimeUnit = exports.RelativeDateFilterTimeUnit || (exports.RelativeDateFilterTimeUnit = {}));
		var RelativeDateOperators;
		(function (RelativeDateOperators) {
		    RelativeDateOperators[RelativeDateOperators["InLast"] = 0] = "InLast";
		    RelativeDateOperators[RelativeDateOperators["InThis"] = 1] = "InThis";
		    RelativeDateOperators[RelativeDateOperators["InNext"] = 2] = "InNext";
		})(RelativeDateOperators = exports.RelativeDateOperators || (exports.RelativeDateOperators = {}));
		var Filter = (function () {
		    function Filter(target, filterType) {
		        this.target = target;
		        this.filterType = filterType;
		    }
		    Filter.prototype.toJSON = function () {
		        return {
		            $schema: this.schemaUrl,
		            target: this.target,
		            filterType: this.filterType
		        };
		    };
		    ;
		    return Filter;
		}());
		exports.Filter = Filter;
		var NotSupportedFilter = (function (_super) {
		    __extends(NotSupportedFilter, _super);
		    function NotSupportedFilter(target, message, notSupportedTypeName) {
		        var _this = _super.call(this, target, FilterType.Unknown) || this;
		        _this.message = message;
		        _this.notSupportedTypeName = notSupportedTypeName;
		        _this.schemaUrl = NotSupportedFilter.schemaUrl;
		        return _this;
		    }
		    NotSupportedFilter.prototype.toJSON = function () {
		        var filter = _super.prototype.toJSON.call(this);
		        filter.message = this.message;
		        filter.notSupportedTypeName = this.notSupportedTypeName;
		        return filter;
		    };
		    return NotSupportedFilter;
		}(Filter));
		NotSupportedFilter.schemaUrl = "http://powerbi.com/product/schema#notSupported";
		exports.NotSupportedFilter = NotSupportedFilter;
		var IncludeExcludeFilter = (function (_super) {
		    __extends(IncludeExcludeFilter, _super);
		    function IncludeExcludeFilter(target, isExclude, values) {
		        var _this = _super.call(this, target, FilterType.IncludeExclude) || this;
		        _this.values = values;
		        _this.isExclude = isExclude;
		        _this.schemaUrl = IncludeExcludeFilter.schemaUrl;
		        return _this;
		    }
		    IncludeExcludeFilter.prototype.toJSON = function () {
		        var filter = _super.prototype.toJSON.call(this);
		        filter.isExclude = this.isExclude;
		        filter.values = this.values;
		        return filter;
		    };
		    return IncludeExcludeFilter;
		}(Filter));
		IncludeExcludeFilter.schemaUrl = "http://powerbi.com/product/schema#includeExclude";
		exports.IncludeExcludeFilter = IncludeExcludeFilter;
		var TopNFilter = (function (_super) {
		    __extends(TopNFilter, _super);
		    function TopNFilter(target, operator, itemCount) {
		        var _this = _super.call(this, target, FilterType.TopN) || this;
		        _this.operator = operator;
		        _this.itemCount = itemCount;
		        _this.schemaUrl = TopNFilter.schemaUrl;
		        return _this;
		    }
		    TopNFilter.prototype.toJSON = function () {
		        var filter = _super.prototype.toJSON.call(this);
		        filter.operator = this.operator;
		        filter.itemCount = this.itemCount;
		        return filter;
		    };
		    return TopNFilter;
		}(Filter));
		TopNFilter.schemaUrl = "http://powerbi.com/product/schema#topN";
		exports.TopNFilter = TopNFilter;
		var RelativeDateFilter = (function (_super) {
		    __extends(RelativeDateFilter, _super);
		    function RelativeDateFilter(target, operator, timeUnitsCount, timeUnitType, includeToday) {
		        var _this = _super.call(this, target, FilterType.RelativeDate) || this;
		        _this.operator = operator;
		        _this.timeUnitsCount = timeUnitsCount;
		        _this.timeUnitType = timeUnitType;
		        _this.includeToday = includeToday;
		        _this.schemaUrl = RelativeDateFilter.schemaUrl;
		        return _this;
		    }
		    RelativeDateFilter.prototype.toJSON = function () {
		        var filter = _super.prototype.toJSON.call(this);
		        filter.operator = this.operator;
		        filter.timeUnitsCount = this.timeUnitsCount;
		        filter.timeUnitType = this.timeUnitType;
		        filter.includeToday = this.includeToday;
		        return filter;
		    };
		    return RelativeDateFilter;
		}(Filter));
		RelativeDateFilter.schemaUrl = "http://powerbi.com/product/schema#relativeDate";
		exports.RelativeDateFilter = RelativeDateFilter;
		var BasicFilter = (function (_super) {
		    __extends(BasicFilter, _super);
		    function BasicFilter(target, operator) {
		        var values = [];
		        for (var _i = 2; _i < arguments.length; _i++) {
		            values[_i - 2] = arguments[_i];
		        }
		        var _this = _super.call(this, target, FilterType.Basic) || this;
		        _this.operator = operator;
		        _this.schemaUrl = BasicFilter.schemaUrl;
		        if (values.length === 0 && operator !== "All") {
		            throw new Error("values must be a non-empty array unless your operator is \"All\".");
		        }
		        /**
		         * Accept values as array instead of as individual arguments
		         * new BasicFilter('a', 'b', 1, 2);
		         * new BasicFilter('a', 'b', [1,2]);
		         */
		        if (Array.isArray(values[0])) {
		            _this.values = values[0];
		        }
		        else {
		            _this.values = values;
		        }
		        return _this;
		    }
		    BasicFilter.prototype.toJSON = function () {
		        var filter = _super.prototype.toJSON.call(this);
		        filter.operator = this.operator;
		        filter.values = this.values;
		        return filter;
		    };
		    return BasicFilter;
		}(Filter));
		BasicFilter.schemaUrl = "http://powerbi.com/product/schema#basic";
		exports.BasicFilter = BasicFilter;
		var BasicFilterWithKeys = (function (_super) {
		    __extends(BasicFilterWithKeys, _super);
		    function BasicFilterWithKeys(target, operator, values, keyValues) {
		        var _this = _super.call(this, target, operator, values) || this;
		        _this.keyValues = keyValues;
		        _this.target = target;
		        var numberOfKeys = target.keys ? target.keys.length : 0;
		        if (numberOfKeys > 0 && !keyValues) {
		            throw new Error("You shold pass the values to be filtered for each key. You passed: no values and " + numberOfKeys + " keys");
		        }
		        if (numberOfKeys === 0 && keyValues && keyValues.length > 0) {
		            throw new Error("You passed key values but your target object doesn't contain the keys to be filtered");
		        }
		        for (var i = 0; i < _this.keyValues.length; i++) {
		            if (_this.keyValues[i]) {
		                var lengthOfArray = _this.keyValues[i].length;
		                if (lengthOfArray !== numberOfKeys) {
		                    throw new Error("Each tuple of key values should contain a value for each of the keys. You passed: " + lengthOfArray + " values and " + numberOfKeys + " keys");
		                }
		            }
		        }
		        return _this;
		    }
		    BasicFilterWithKeys.prototype.toJSON = function () {
		        var filter = _super.prototype.toJSON.call(this);
		        filter.keyValues = this.keyValues;
		        return filter;
		    };
		    return BasicFilterWithKeys;
		}(BasicFilter));
		exports.BasicFilterWithKeys = BasicFilterWithKeys;
		var AdvancedFilter = (function (_super) {
		    __extends(AdvancedFilter, _super);
		    function AdvancedFilter(target, logicalOperator) {
		        var conditions = [];
		        for (var _i = 2; _i < arguments.length; _i++) {
		            conditions[_i - 2] = arguments[_i];
		        }
		        var _this = _super.call(this, target, FilterType.Advanced) || this;
		        _this.schemaUrl = AdvancedFilter.schemaUrl;
		        // Guard statements
		        if (typeof logicalOperator !== "string" || logicalOperator.length === 0) {
		            // TODO: It would be nicer to list out the possible logical operators.
		            throw new Error("logicalOperator must be a valid operator, You passed: " + logicalOperator);
		        }
		        _this.logicalOperator = logicalOperator;
		        var extractedConditions;
		        /**
		         * Accept conditions as array instead of as individual arguments
		         * new AdvancedFilter('a', 'b', "And", { value: 1, operator: "Equals" }, { value: 2, operator: "IsGreaterThan" });
		         * new AdvancedFilter('a', 'b', "And", [{ value: 1, operator: "Equals" }, { value: 2, operator: "IsGreaterThan" }]);
		         */
		        if (Array.isArray(conditions[0])) {
		            extractedConditions = conditions[0];
		        }
		        else {
		            extractedConditions = conditions;
		        }
		        if (extractedConditions.length === 0) {
		            throw new Error("conditions must be a non-empty array. You passed: " + conditions);
		        }
		        if (extractedConditions.length > 2) {
		            throw new Error("AdvancedFilters may not have more than two conditions. You passed: " + conditions.length);
		        }
		        if (extractedConditions.length === 1 && logicalOperator !== "And") {
		            throw new Error("Logical Operator must be \"And\" when there is only one condition provided");
		        }
		        _this.conditions = extractedConditions;
		        return _this;
		    }
		    AdvancedFilter.prototype.toJSON = function () {
		        var filter = _super.prototype.toJSON.call(this);
		        filter.logicalOperator = this.logicalOperator;
		        filter.conditions = this.conditions;
		        return filter;
		    };
		    return AdvancedFilter;
		}(Filter));
		AdvancedFilter.schemaUrl = "http://powerbi.com/product/schema#advanced";
		exports.AdvancedFilter = AdvancedFilter;
		function isFilterKeyColumnsTarget(target) {
		    return isColumn(target) && !!target.keys;
		}
		exports.isFilterKeyColumnsTarget = isFilterKeyColumnsTarget;
		function isBasicFilterWithKeys(filter) {
		    return getFilterType(filter) === FilterType.Basic && !!filter.keyValues;
		}
		exports.isBasicFilterWithKeys = isBasicFilterWithKeys;
		function getFilterType(filter) {
		    if (filter.filterType) {
		        return filter.filterType;
		    }
		    var basicFilter = filter;
		    var advancedFilter = filter;
		    if ((typeof basicFilter.operator === "string")
		        && (Array.isArray(basicFilter.values))) {
		        return FilterType.Basic;
		    }
		    else if ((typeof advancedFilter.logicalOperator === "string")
		        && (Array.isArray(advancedFilter.conditions))) {
		        return FilterType.Advanced;
		    }
		    else {
		        return FilterType.Unknown;
		    }
		}
		exports.getFilterType = getFilterType;
		function isMeasure(arg) {
		    return arg.table !== undefined && arg.measure !== undefined;
		}
		exports.isMeasure = isMeasure;
		function isColumn(arg) {
		    return arg.table !== undefined && arg.column !== undefined;
		}
		exports.isColumn = isColumn;
		function isHierarchy(arg) {
		    return arg.table !== undefined && arg.hierarchy !== undefined && arg.hierarchyLevel !== undefined;
		}
		exports.isHierarchy = isHierarchy;
		var QnaMode;
		(function (QnaMode) {
		    QnaMode[QnaMode["Interactive"] = 0] = "Interactive";
		    QnaMode[QnaMode["ResultOnly"] = 1] = "ResultOnly";
		})(QnaMode = exports.QnaMode || (exports.QnaMode = {}));
		function normalizeError(error) {
		    var message = error.message;
		    if (!message) {
		        message = error.path + " is invalid. Not meeting " + error.keyword + " constraint";
		    }
		    return {
		        message: message
		    };
		}
		function validateSettings(input) {
		    var errors = exports.Validators.settingsValidator.validate(input);
		    return errors ? errors.map(normalizeError) : undefined;
		}
		exports.validateSettings = validateSettings;
		function validateCustomPageSize(input) {
		    var errors = exports.Validators.customPageSizeValidator.validate(input);
		    return errors ? errors.map(normalizeError) : undefined;
		}
		exports.validateCustomPageSize = validateCustomPageSize;
		function validateExtension(input) {
		    var errors = exports.Validators.extentionValidator.validate(input);
		    return errors ? errors.map(normalizeError) : undefined;
		}
		exports.validateExtension = validateExtension;
		function validateReportLoad(input) {
		    var errors = exports.Validators.reportLoadValidator.validate(input);
		    return errors ? errors.map(normalizeError) : undefined;
		}
		exports.validateReportLoad = validateReportLoad;
		function validateCreateReport(input) {
		    var errors = exports.Validators.reportCreateValidator.validate(input);
		    return errors ? errors.map(normalizeError) : undefined;
		}
		exports.validateCreateReport = validateCreateReport;
		function validateDashboardLoad(input) {
		    var errors = exports.Validators.dashboardLoadValidator.validate(input);
		    return errors ? errors.map(normalizeError) : undefined;
		}
		exports.validateDashboardLoad = validateDashboardLoad;
		function validateTileLoad(input) {
		    var errors = exports.Validators.tileLoadValidator.validate(input);
		    return errors ? errors.map(normalizeError) : undefined;
		}
		exports.validateTileLoad = validateTileLoad;
		function validatePage(input) {
		    var errors = exports.Validators.pageValidator.validate(input);
		    return errors ? errors.map(normalizeError) : undefined;
		}
		exports.validatePage = validatePage;
		function validateFilter(input) {
		    var errors = exports.Validators.filtersValidator.validate(input);
		    return errors ? errors.map(normalizeError) : undefined;
		}
		exports.validateFilter = validateFilter;
		function validateSaveAsParameters(input) {
		    var errors = exports.Validators.saveAsParametersValidator.validate(input);
		    return errors ? errors.map(normalizeError) : undefined;
		}
		exports.validateSaveAsParameters = validateSaveAsParameters;
		function validateLoadQnaConfiguration(input) {
		    var errors = exports.Validators.loadQnaValidator.validate(input);
		    return errors ? errors.map(normalizeError) : undefined;
		}
		exports.validateLoadQnaConfiguration = validateLoadQnaConfiguration;
		function validateQnaInterpretInputData(input) {
		    var errors = exports.Validators.qnaInterpretInputDataValidator.validate(input);
		    return errors ? errors.map(normalizeError) : undefined;
		}
		exports.validateQnaInterpretInputData = validateQnaInterpretInputData;
	
	
	/***/ }),
	/* 1 */
	/***/ (function(module, exports, __webpack_require__) {
	
		Object.defineProperty(exports, "__esModule", { value: true });
		var typeValidator_1 = __webpack_require__(2);
		var extensionsValidator_1 = __webpack_require__(3);
		var settingsValidator_1 = __webpack_require__(5);
		var filtersValidator_1 = __webpack_require__(6);
		var fieldRequiredValidator_1 = __webpack_require__(7);
		var anyOfValidator_1 = __webpack_require__(8);
		var reportLoadValidator_1 = __webpack_require__(9);
		var reportCreateValidator_1 = __webpack_require__(10);
		var dashboardLoadValidator_1 = __webpack_require__(11);
		var tileLoadValidator_1 = __webpack_require__(12);
		var pageValidator_1 = __webpack_require__(13);
		var qnaValidator_1 = __webpack_require__(14);
		var saveAsParametersValidator_1 = __webpack_require__(15);
		var mapValidator_1 = __webpack_require__(16);
		var layoutValidator_1 = __webpack_require__(17);
		exports.Validators = {
		    advancedFilterTypeValidator: new typeValidator_1.EnumValidator([0]),
		    advancedFilterValidator: new filtersValidator_1.AdvancedFilterValidator(),
		    anyArrayValidator: new typeValidator_1.ArrayValidator([new anyOfValidator_1.AnyOfValidator([new typeValidator_1.StringValidator(), new typeValidator_1.NumberValidator(), new typeValidator_1.BooleanValidator()])]),
		    anyFilterValidator: new anyOfValidator_1.AnyOfValidator([new filtersValidator_1.BasicFilterValidator(), new filtersValidator_1.AdvancedFilterValidator(), new filtersValidator_1.IncludeExcludeFilterValidator(), new filtersValidator_1.NotSupportedFilterValidator(), new filtersValidator_1.RelativeDateFilterValidator(), new filtersValidator_1.TopNFilterValidator()]),
		    anyValueValidator: new anyOfValidator_1.AnyOfValidator([new typeValidator_1.StringValidator(), new typeValidator_1.NumberValidator(), new typeValidator_1.BooleanValidator()]),
		    basicFilterTypeValidator: new typeValidator_1.EnumValidator([1]),
		    basicFilterValidator: new filtersValidator_1.BasicFilterValidator(),
		    booleanArrayValidator: new typeValidator_1.BooleanArrayValidator(),
		    booleanValidator: new typeValidator_1.BooleanValidator(),
		    commandExtensionValidator: new extensionsValidator_1.CommandExtensionValidator(),
		    conditionItemValidator: new filtersValidator_1.ConditionItemValidator(),
		    customLayoutValidator: new layoutValidator_1.CustomLayoutValidator(),
		    customLayoutDisplayOptionValidator: new typeValidator_1.EnumValidator([0, 1, 2]),
		    customPageSizeValidator: new pageValidator_1.CustomPageSizeValidator(),
		    dashboardLoadValidator: new dashboardLoadValidator_1.DashboardLoadValidator(),
		    displayStateModeValidator: new typeValidator_1.EnumValidator([0, 1]),
		    displayStateValidator: new layoutValidator_1.DisplayStateValidator(),
		    extensionPointsValidator: new extensionsValidator_1.ExtensionPointsValidator(),
		    extentionArrayValidator: new typeValidator_1.ArrayValidator([new extensionsValidator_1.ExtensionValidator()]),
		    extentionValidator: new extensionsValidator_1.ExtensionValidator(),
		    fieldRequiredValidator: new fieldRequiredValidator_1.FieldRequiredValidator(),
		    filterColumnTargetValidator: new filtersValidator_1.FilterColumnTargetValidator(),
		    filterConditionsValidator: new typeValidator_1.ArrayValidator([new filtersValidator_1.ConditionItemValidator()]),
		    filterHierarchyTargetValidator: new filtersValidator_1.FilterHierarchyTargetValidator(),
		    filterMeasureTargetValidator: new filtersValidator_1.FilterMeasureTargetValidator(),
		    filterTargetValidator: new anyOfValidator_1.AnyOfValidator([new filtersValidator_1.FilterColumnTargetValidator(), new filtersValidator_1.FilterHierarchyTargetValidator(), new filtersValidator_1.FilterMeasureTargetValidator()]),
		    filtersArrayValidator: new typeValidator_1.ArrayValidator([new anyOfValidator_1.AnyOfValidator([new filtersValidator_1.BasicFilterValidator(), new filtersValidator_1.AdvancedFilterValidator(), new filtersValidator_1.RelativeDateFilterValidator()])]),
		    filtersValidator: new filtersValidator_1.FilterValidator(),
		    includeExcludeFilterValidator: new filtersValidator_1.IncludeExcludeFilterValidator(),
		    includeExludeFilterTypeValidator: new typeValidator_1.EnumValidator([3]),
		    layoutTypeValidator: new typeValidator_1.EnumValidator([0, 1]),
		    loadQnaValidator: new qnaValidator_1.LoadQnaValidator(),
		    menuExtensionValidator: new extensionsValidator_1.MenuExtensionValidator(),
		    notSupportedFilterTypeValidator: new typeValidator_1.EnumValidator([2]),
		    notSupportedFilterValidator: new filtersValidator_1.NotSupportedFilterValidator(),
		    numberArrayValidator: new typeValidator_1.NumberArrayValidator(),
		    numberValidator: new typeValidator_1.NumberValidator(),
		    pageLayoutValidator: new mapValidator_1.MapValidator([new typeValidator_1.StringValidator()], [new layoutValidator_1.VisualLayoutValidator()]),
		    pageSizeTypeValidator: new typeValidator_1.EnumValidator([0, 1, 2, 3, 4, 5]),
		    pageSizeValidator: new pageValidator_1.PageSizeValidator(),
		    pageValidator: new pageValidator_1.PageValidator(),
		    pageViewFieldValidator: new pageValidator_1.PageViewFieldValidator(),
		    pagesLayoutValidator: new mapValidator_1.MapValidator([new typeValidator_1.StringValidator()], [new layoutValidator_1.PageLayoutValidator()]),
		    permissionsValidator: new typeValidator_1.EnumValidator([0, 1, 2, 4, 7]),
		    qnaInterpretInputDataValidator: new qnaValidator_1.QnaInterpretInputDataValidator(),
		    qnaSettingValidator: new qnaValidator_1.QnaSettingsValidator(),
		    relativeDateFilterOperatorValidator: new typeValidator_1.EnumValidator([0, 1, 2]),
		    relativeDateFilterTimeUnitTypeValidator: new typeValidator_1.EnumValidator([0, 1, 2, 3, 4, 5, 6]),
		    relativeDateFilterTypeValidator: new typeValidator_1.EnumValidator([4]),
		    relativeDateFilterValidator: new filtersValidator_1.RelativeDateFilterValidator(),
		    reportCreateValidator: new reportCreateValidator_1.ReportCreateValidator(),
		    reportLoadValidator: new reportLoadValidator_1.ReportLoadValidator(),
		    saveAsParametersValidator: new saveAsParametersValidator_1.SaveAsParametersValidator(),
		    settingsValidator: new settingsValidator_1.SettingsValidator(),
		    stringArrayValidator: new typeValidator_1.StringArrayValidator(),
		    stringValidator: new typeValidator_1.StringValidator(),
		    tileLoadValidator: new tileLoadValidator_1.TileLoadValidator(),
		    tokenTypeValidator: new typeValidator_1.EnumValidator([0, 1]),
		    topNFilterTypeValidator: new typeValidator_1.EnumValidator([5]),
		    topNFilterValidator: new filtersValidator_1.TopNFilterValidator(),
		    viewModeValidator: new typeValidator_1.EnumValidator([0, 1]),
		    visualLayoutValidator: new layoutValidator_1.VisualLayoutValidator(),
		};
	
	
	/***/ }),
	/* 2 */
	/***/ (function(module, exports) {
	
		var __extends = (this && this.__extends) || (function () {
		    var extendStatics = Object.setPrototypeOf ||
		        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
		        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
		    return function (d, b) {
		        extendStatics(d, b);
		        function __() { this.constructor = d; }
		        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		    };
		})();
		Object.defineProperty(exports, "__esModule", { value: true });
		var ObjectValidator = (function () {
		    function ObjectValidator() {
		    }
		    ObjectValidator.prototype.validate = function (input, path, field) {
		        if (input === undefined || input === null) {
		            return null;
		        }
		        if (typeof input !== "object" || Array.isArray(input)) {
		            return [{
		                    message: field !== undefined ? field + " must be an object" : "input must be an object",
		                    path: path,
		                    keyword: "type"
		                }];
		        }
		        return null;
		    };
		    return ObjectValidator;
		}());
		exports.ObjectValidator = ObjectValidator;
		var ArrayValidator = (function () {
		    function ArrayValidator(itemValidators) {
		        this.itemValidators = itemValidators;
		    }
		    ArrayValidator.prototype.validate = function (input, path, field) {
		        if (input === undefined || input === null) {
		            return null;
		        }
		        if (!(Array.isArray(input))) {
		            return [{
		                    message: field + " property is invalid",
		                    path: (path ? path + "." : "") + field,
		                    keyword: "type"
		                }];
		        }
		        for (var i = 0; i < input.length; i++) {
		            var fieldsPath = (path ? path + "." : "") + field + "." + i;
		            for (var _i = 0, _a = this.itemValidators; _i < _a.length; _i++) {
		                var validator = _a[_i];
		                var errors = validator.validate(input[i], fieldsPath, field);
		                if (errors) {
		                    return [{
		                            message: field + " property is invalid",
		                            path: (path ? path + "." : "") + field,
		                            keyword: "type"
		                        }];
		                }
		            }
		        }
		        return null;
		    };
		    return ArrayValidator;
		}());
		exports.ArrayValidator = ArrayValidator;
		var TypeValidator = (function () {
		    function TypeValidator(expectedType) {
		        this.expectedType = expectedType;
		    }
		    TypeValidator.prototype.validate = function (input, path, field) {
		        if (input === undefined || input === null) {
		            return null;
		        }
		        if (!(typeof input === this.expectedType)) {
		            return [{
		                    message: field + " must be a " + this.expectedType,
		                    path: (path ? path + "." : "") + field,
		                    keyword: "type"
		                }];
		        }
		        return null;
		    };
		    return TypeValidator;
		}());
		exports.TypeValidator = TypeValidator;
		var StringValidator = (function (_super) {
		    __extends(StringValidator, _super);
		    function StringValidator() {
		        return _super.call(this, "string") || this;
		    }
		    return StringValidator;
		}(TypeValidator));
		exports.StringValidator = StringValidator;
		var BooleanValidator = (function (_super) {
		    __extends(BooleanValidator, _super);
		    function BooleanValidator() {
		        return _super.call(this, "boolean") || this;
		    }
		    return BooleanValidator;
		}(TypeValidator));
		exports.BooleanValidator = BooleanValidator;
		var NumberValidator = (function (_super) {
		    __extends(NumberValidator, _super);
		    function NumberValidator() {
		        return _super.call(this, "number") || this;
		    }
		    return NumberValidator;
		}(TypeValidator));
		exports.NumberValidator = NumberValidator;
		var ValueValidator = (function () {
		    function ValueValidator(possibleValues) {
		        this.possibleValues = possibleValues;
		    }
		    ValueValidator.prototype.validate = function (input, path, field) {
		        if (input === undefined || input === null) {
		            return null;
		        }
		        if (this.possibleValues.indexOf(input) < 0) {
		            return [{
		                    message: field + " property is invalid",
		                    path: (path ? path + "." : "") + field,
		                    keyword: "invalid"
		                }];
		        }
		        return null;
		    };
		    return ValueValidator;
		}());
		exports.ValueValidator = ValueValidator;
		var EnumValidator = (function (_super) {
		    __extends(EnumValidator, _super);
		    function EnumValidator(possibleValues) {
		        var _this = _super.call(this) || this;
		        _this.possibleValues = possibleValues;
		        return _this;
		    }
		    EnumValidator.prototype.validate = function (input, path, field) {
		        if (input === undefined || input === null) {
		            return null;
		        }
		        var errors = _super.prototype.validate.call(this, input, path, field);
		        if (errors) {
		            return errors;
		        }
		        var valueValidator = new ValueValidator(this.possibleValues);
		        return valueValidator.validate(input, path, field);
		    };
		    return EnumValidator;
		}(NumberValidator));
		exports.EnumValidator = EnumValidator;
		var StringArrayValidator = (function (_super) {
		    __extends(StringArrayValidator, _super);
		    function StringArrayValidator() {
		        return _super.call(this, [new StringValidator()]) || this;
		    }
		    StringArrayValidator.prototype.validate = function (input, path, field) {
		        var errors = _super.prototype.validate.call(this, input, path, field);
		        if (errors) {
		            return [{
		                    message: field + " must be an array of strings",
		                    path: (path ? path + "." : "") + field,
		                    keyword: "type"
		                }];
		        }
		        return null;
		    };
		    return StringArrayValidator;
		}(ArrayValidator));
		exports.StringArrayValidator = StringArrayValidator;
		var BooleanArrayValidator = (function (_super) {
		    __extends(BooleanArrayValidator, _super);
		    function BooleanArrayValidator() {
		        return _super.call(this, [new BooleanValidator()]) || this;
		    }
		    BooleanArrayValidator.prototype.validate = function (input, path, field) {
		        var errors = _super.prototype.validate.call(this, input, path, field);
		        if (errors) {
		            return [{
		                    message: field + " must be an array of booleans",
		                    path: (path ? path + "." : "") + field,
		                    keyword: "type"
		                }];
		        }
		        return null;
		    };
		    return BooleanArrayValidator;
		}(ArrayValidator));
		exports.BooleanArrayValidator = BooleanArrayValidator;
		var NumberArrayValidator = (function (_super) {
		    __extends(NumberArrayValidator, _super);
		    function NumberArrayValidator() {
		        return _super.call(this, [new NumberValidator()]) || this;
		    }
		    NumberArrayValidator.prototype.validate = function (input, path, field) {
		        var errors = _super.prototype.validate.call(this, input, path, field);
		        if (errors) {
		            return [{
		                    message: field + " must be an array of numbers",
		                    path: (path ? path + "." : "") + field,
		                    keyword: "type"
		                }];
		        }
		        return null;
		    };
		    return NumberArrayValidator;
		}(ArrayValidator));
		exports.NumberArrayValidator = NumberArrayValidator;
	
	
	/***/ }),
	/* 3 */
	/***/ (function(module, exports, __webpack_require__) {
	
		var __extends = (this && this.__extends) || (function () {
		    var extendStatics = Object.setPrototypeOf ||
		        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
		        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
		    return function (d, b) {
		        extendStatics(d, b);
		        function __() { this.constructor = d; }
		        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		    };
		})();
		Object.defineProperty(exports, "__esModule", { value: true });
		var validator_1 = __webpack_require__(1);
		var multipleFieldsValidator_1 = __webpack_require__(4);
		var typeValidator_1 = __webpack_require__(2);
		var MenuExtensionValidator = (function (_super) {
		    __extends(MenuExtensionValidator, _super);
		    function MenuExtensionValidator() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    MenuExtensionValidator.prototype.validate = function (input, path, field) {
		        if (input === undefined || input === null) {
		            return null;
		        }
		        var errors = _super.prototype.validate.call(this, input, path, field);
		        if (errors) {
		            return errors;
		        }
		        var fields = [
		            {
		                field: "title",
		                validators: [validator_1.Validators.stringValidator]
		            },
		            {
		                field: "icon",
		                validators: [validator_1.Validators.stringValidator]
		            }
		        ];
		        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
		        return multipleFieldsValidator.validate(input, path, field);
		    };
		    return MenuExtensionValidator;
		}(typeValidator_1.ObjectValidator));
		exports.MenuExtensionValidator = MenuExtensionValidator;
		var ExtensionPointsValidator = (function (_super) {
		    __extends(ExtensionPointsValidator, _super);
		    function ExtensionPointsValidator() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    ExtensionPointsValidator.prototype.validate = function (input, path, field) {
		        if (input === undefined || input === null) {
		            return null;
		        }
		        var errors = _super.prototype.validate.call(this, input, path, field);
		        if (errors) {
		            return errors;
		        }
		        var fields = [
		            {
		                field: "visualContextMenu",
		                validators: [validator_1.Validators.menuExtensionValidator]
		            },
		            {
		                field: "visualOptionsMenu",
		                validators: [validator_1.Validators.menuExtensionValidator]
		            }
		        ];
		        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
		        return multipleFieldsValidator.validate(input, path, field);
		    };
		    return ExtensionPointsValidator;
		}(typeValidator_1.ObjectValidator));
		exports.ExtensionPointsValidator = ExtensionPointsValidator;
		var ExtensionItemValidator = (function (_super) {
		    __extends(ExtensionItemValidator, _super);
		    function ExtensionItemValidator() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    ExtensionItemValidator.prototype.validate = function (input, path, field) {
		        if (input === undefined || input === null) {
		            return null;
		        }
		        var errors = _super.prototype.validate.call(this, input, path, field);
		        if (errors) {
		            return errors;
		        }
		        var fields = [
		            {
		                field: "name",
		                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
		            },
		            {
		                field: "extend",
		                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.extensionPointsValidator]
		            }
		        ];
		        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
		        return multipleFieldsValidator.validate(input, path, field);
		    };
		    return ExtensionItemValidator;
		}(typeValidator_1.ObjectValidator));
		exports.ExtensionItemValidator = ExtensionItemValidator;
		var CommandExtensionValidator = (function (_super) {
		    __extends(CommandExtensionValidator, _super);
		    function CommandExtensionValidator() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    CommandExtensionValidator.prototype.validate = function (input, path, field) {
		        if (input === undefined || input === null) {
		            return null;
		        }
		        var errors = _super.prototype.validate.call(this, input, path, field);
		        if (errors) {
		            return errors;
		        }
		        var fields = [
		            {
		                field: "title",
		                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
		            },
		            {
		                field: "icon",
		                validators: [validator_1.Validators.stringValidator]
		            }
		        ];
		        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
		        return multipleFieldsValidator.validate(input, path, field);
		    };
		    return CommandExtensionValidator;
		}(ExtensionItemValidator));
		exports.CommandExtensionValidator = CommandExtensionValidator;
		var ExtensionValidator = (function (_super) {
		    __extends(ExtensionValidator, _super);
		    function ExtensionValidator() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    ExtensionValidator.prototype.validate = function (input, path, field) {
		        if (input === undefined || input === null) {
		            return null;
		        }
		        var errors = _super.prototype.validate.call(this, input, path, field);
		        if (errors) {
		            return errors;
		        }
		        var fields = [
		            {
		                field: "command",
		                validators: [validator_1.Validators.commandExtensionValidator]
		            }
		        ];
		        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
		        return multipleFieldsValidator.validate(input, path, field);
		    };
		    return ExtensionValidator;
		}(typeValidator_1.ObjectValidator));
		exports.ExtensionValidator = ExtensionValidator;
	
	
	/***/ }),
	/* 4 */
	/***/ (function(module, exports) {
	
		Object.defineProperty(exports, "__esModule", { value: true });
		var MultipleFieldsValidator = (function () {
		    function MultipleFieldsValidator(fieldValidatorsPairs) {
		        this.fieldValidatorsPairs = fieldValidatorsPairs;
		    }
		    MultipleFieldsValidator.prototype.validate = function (input, path, field) {
		        if (!this.fieldValidatorsPairs) {
		            return null;
		        }
		        var fieldsPath = path ? path + "." + field : field;
		        for (var _i = 0, _a = this.fieldValidatorsPairs; _i < _a.length; _i++) {
		            var fieldValidators = _a[_i];
		            for (var _b = 0, _c = fieldValidators.validators; _b < _c.length; _b++) {
		                var validator = _c[_b];
		                var errors = validator.validate(input[fieldValidators.field], fieldsPath, fieldValidators.field);
		                if (errors) {
		                    return errors;
		                }
		            }
		        }
		        return null;
		    };
		    return MultipleFieldsValidator;
		}());
		exports.MultipleFieldsValidator = MultipleFieldsValidator;
	
	
	/***/ }),
	/* 5 */
	/***/ (function(module, exports, __webpack_require__) {
	
		var __extends = (this && this.__extends) || (function () {
		    var extendStatics = Object.setPrototypeOf ||
		        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
		        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
		    return function (d, b) {
		        extendStatics(d, b);
		        function __() { this.constructor = d; }
		        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		    };
		})();
		Object.defineProperty(exports, "__esModule", { value: true });
		var validator_1 = __webpack_require__(1);
		var multipleFieldsValidator_1 = __webpack_require__(4);
		var typeValidator_1 = __webpack_require__(2);
		var SettingsValidator = (function (_super) {
		    __extends(SettingsValidator, _super);
		    function SettingsValidator() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    SettingsValidator.prototype.validate = function (input, path, field) {
		        if (input === undefined || input === null) {
		            return null;
		        }
		        var errors = _super.prototype.validate.call(this, input, path, field);
		        if (errors) {
		            return errors;
		        }
		        var fields = [
		            {
		                field: "filterPaneEnabled",
		                validators: [validator_1.Validators.booleanValidator]
		            },
		            {
		                field: "navContentPaneEnabled",
		                validators: [validator_1.Validators.booleanValidator]
		            },
		            {
		                field: "useCustomSaveAsDialog",
		                validators: [validator_1.Validators.booleanValidator]
		            },
		            {
		                field: "extensions",
		                validators: [validator_1.Validators.extentionArrayValidator]
		            },
		            {
		                field: "layoutType",
		                validators: [validator_1.Validators.layoutTypeValidator]
		            },
		            {
		                field: "customLayout",
		                validators: [validator_1.Validators.customLayoutValidator]
		            }
		        ];
		        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
		        return multipleFieldsValidator.validate(input, path, field);
		    };
		    return SettingsValidator;
		}(typeValidator_1.ObjectValidator));
		exports.SettingsValidator = SettingsValidator;
	
	
	/***/ }),
	/* 6 */
	/***/ (function(module, exports, __webpack_require__) {
	
		var __extends = (this && this.__extends) || (function () {
		    var extendStatics = Object.setPrototypeOf ||
		        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
		        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
		    return function (d, b) {
		        extendStatics(d, b);
		        function __() { this.constructor = d; }
		        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		    };
		})();
		Object.defineProperty(exports, "__esModule", { value: true });
		var validator_1 = __webpack_require__(1);
		var multipleFieldsValidator_1 = __webpack_require__(4);
		var typeValidator_1 = __webpack_require__(2);
		var FilterColumnTargetValidator = (function (_super) {
		    __extends(FilterColumnTargetValidator, _super);
		    function FilterColumnTargetValidator() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    FilterColumnTargetValidator.prototype.validate = function (input, path, field) {
		        if (input === undefined || input === null) {
		            return null;
		        }
		        var errors = _super.prototype.validate.call(this, input, path, field);
		        if (errors) {
		            return errors;
		        }
		        var fields = [
		            {
		                field: "table",
		                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
		            },
		            {
		                field: "column",
		                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
		            }
		        ];
		        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
		        return multipleFieldsValidator.validate(input, path, field);
		    };
		    return FilterColumnTargetValidator;
		}(typeValidator_1.ObjectValidator));
		exports.FilterColumnTargetValidator = FilterColumnTargetValidator;
		var FilterHierarchyTargetValidator = (function (_super) {
		    __extends(FilterHierarchyTargetValidator, _super);
		    function FilterHierarchyTargetValidator() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    FilterHierarchyTargetValidator.prototype.validate = function (input, path, field) {
		        if (input === undefined || input === null) {
		            return null;
		        }
		        var errors = _super.prototype.validate.call(this, input, path, field);
		        if (errors) {
		            return errors;
		        }
		        var fields = [
		            {
		                field: "table",
		                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
		            },
		            {
		                field: "hierarchy",
		                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
		            },
		            {
		                field: "hierarchyLevel",
		                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
		            }
		        ];
		        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
		        return multipleFieldsValidator.validate(input, path, field);
		    };
		    return FilterHierarchyTargetValidator;
		}(typeValidator_1.ObjectValidator));
		exports.FilterHierarchyTargetValidator = FilterHierarchyTargetValidator;
		var FilterMeasureTargetValidator = (function (_super) {
		    __extends(FilterMeasureTargetValidator, _super);
		    function FilterMeasureTargetValidator() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    FilterMeasureTargetValidator.prototype.validate = function (input, path, field) {
		        if (input === undefined || input === null) {
		            return null;
		        }
		        var errors = _super.prototype.validate.call(this, input, path, field);
		        if (errors) {
		            return errors;
		        }
		        var fields = [
		            {
		                field: "table",
		                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
		            },
		            {
		                field: "measure",
		                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
		            }
		        ];
		        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
		        return multipleFieldsValidator.validate(input, path, field);
		    };
		    return FilterMeasureTargetValidator;
		}(typeValidator_1.ObjectValidator));
		exports.FilterMeasureTargetValidator = FilterMeasureTargetValidator;
		var BasicFilterValidator = (function (_super) {
		    __extends(BasicFilterValidator, _super);
		    function BasicFilterValidator() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    BasicFilterValidator.prototype.validate = function (input, path, field) {
		        if (input === undefined || input === null) {
		            return null;
		        }
		        var errors = _super.prototype.validate.call(this, input, path, field);
		        if (errors) {
		            return errors;
		        }
		        var fields = [
		            {
		                field: "target",
		                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.filterTargetValidator]
		            },
		            {
		                field: "operator",
		                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
		            },
		            {
		                field: "values",
		                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.anyArrayValidator]
		            },
		            {
		                field: "filterType",
		                validators: [validator_1.Validators.basicFilterTypeValidator]
		            },
		        ];
		        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
		        return multipleFieldsValidator.validate(input, path, field);
		    };
		    return BasicFilterValidator;
		}(typeValidator_1.ObjectValidator));
		exports.BasicFilterValidator = BasicFilterValidator;
		var AdvancedFilterValidator = (function (_super) {
		    __extends(AdvancedFilterValidator, _super);
		    function AdvancedFilterValidator() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    AdvancedFilterValidator.prototype.validate = function (input, path, field) {
		        if (input === undefined || input === null) {
		            return null;
		        }
		        var errors = _super.prototype.validate.call(this, input, path, field);
		        if (errors) {
		            return errors;
		        }
		        var fields = [
		            {
		                field: "target",
		                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.filterTargetValidator]
		            },
		            {
		                field: "logicalOperator",
		                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
		            },
		            {
		                field: "conditions",
		                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.filterConditionsValidator]
		            },
		            {
		                field: "filterType",
		                validators: [validator_1.Validators.advancedFilterTypeValidator]
		            }
		        ];
		        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
		        return multipleFieldsValidator.validate(input, path, field);
		    };
		    return AdvancedFilterValidator;
		}(typeValidator_1.ObjectValidator));
		exports.AdvancedFilterValidator = AdvancedFilterValidator;
		var RelativeDateFilterValidator = (function (_super) {
		    __extends(RelativeDateFilterValidator, _super);
		    function RelativeDateFilterValidator() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    RelativeDateFilterValidator.prototype.validate = function (input, path, field) {
		        if (input === undefined || input === null) {
		            return null;
		        }
		        var errors = _super.prototype.validate.call(this, input, path, field);
		        if (errors) {
		            return errors;
		        }
		        var fields = [
		            {
		                field: "target",
		                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.filterTargetValidator]
		            },
		            {
		                field: "operator",
		                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.relativeDateFilterOperatorValidator]
		            },
		            {
		                field: "timeUnitsCount",
		                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.numberValidator]
		            },
		            {
		                field: "timeUnitType",
		                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.relativeDateFilterTimeUnitTypeValidator]
		            },
		            {
		                field: "includeToday",
		                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.booleanValidator]
		            },
		            {
		                field: "filterType",
		                validators: [validator_1.Validators.relativeDateFilterTypeValidator]
		            },
		        ];
		        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
		        return multipleFieldsValidator.validate(input, path, field);
		    };
		    return RelativeDateFilterValidator;
		}(typeValidator_1.ObjectValidator));
		exports.RelativeDateFilterValidator = RelativeDateFilterValidator;
		var TopNFilterValidator = (function (_super) {
		    __extends(TopNFilterValidator, _super);
		    function TopNFilterValidator() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    TopNFilterValidator.prototype.validate = function (input, path, field) {
		        if (input === undefined || input === null) {
		            return null;
		        }
		        var errors = _super.prototype.validate.call(this, input, path, field);
		        if (errors) {
		            return errors;
		        }
		        var fields = [
		            {
		                field: "target",
		                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.filterTargetValidator]
		            },
		            {
		                field: "operator",
		                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
		            },
		            {
		                field: "itemCount",
		                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.numberValidator]
		            },
		            {
		                field: "filterType",
		                validators: [validator_1.Validators.topNFilterTypeValidator]
		            },
		        ];
		        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
		        return multipleFieldsValidator.validate(input, path, field);
		    };
		    return TopNFilterValidator;
		}(typeValidator_1.ObjectValidator));
		exports.TopNFilterValidator = TopNFilterValidator;
		var NotSupportedFilterValidator = (function (_super) {
		    __extends(NotSupportedFilterValidator, _super);
		    function NotSupportedFilterValidator() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    NotSupportedFilterValidator.prototype.validate = function (input, path, field) {
		        if (input === undefined || input === null) {
		            return null;
		        }
		        var errors = _super.prototype.validate.call(this, input, path, field);
		        if (errors) {
		            return errors;
		        }
		        var fields = [
		            {
		                field: "target",
		                validators: [validator_1.Validators.filterTargetValidator]
		            },
		            {
		                field: "message",
		                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
		            },
		            {
		                field: "notSupportedTypeName",
		                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
		            },
		            {
		                field: "filterType",
		                validators: [validator_1.Validators.notSupportedFilterTypeValidator]
		            },
		        ];
		        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
		        return multipleFieldsValidator.validate(input, path, field);
		    };
		    return NotSupportedFilterValidator;
		}(typeValidator_1.ObjectValidator));
		exports.NotSupportedFilterValidator = NotSupportedFilterValidator;
		var IncludeExcludeFilterValidator = (function (_super) {
		    __extends(IncludeExcludeFilterValidator, _super);
		    function IncludeExcludeFilterValidator() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    IncludeExcludeFilterValidator.prototype.validate = function (input, path, field) {
		        if (input === undefined || input === null) {
		            return null;
		        }
		        var errors = _super.prototype.validate.call(this, input, path, field);
		        if (errors) {
		            return errors;
		        }
		        var fields = [
		            {
		                field: "target",
		                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.filterTargetValidator]
		            },
		            {
		                field: "isExclude",
		                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.booleanValidator]
		            },
		            {
		                field: "values",
		                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.anyArrayValidator]
		            },
		            {
		                field: "filterType",
		                validators: [validator_1.Validators.includeExludeFilterTypeValidator]
		            },
		        ];
		        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
		        return multipleFieldsValidator.validate(input, path, field);
		    };
		    return IncludeExcludeFilterValidator;
		}(typeValidator_1.ObjectValidator));
		exports.IncludeExcludeFilterValidator = IncludeExcludeFilterValidator;
		var FilterValidator = (function (_super) {
		    __extends(FilterValidator, _super);
		    function FilterValidator() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    FilterValidator.prototype.validate = function (input, path, field) {
		        if (input === undefined || input === null) {
		            return null;
		        }
		        return validator_1.Validators.anyFilterValidator.validate(input, path, field);
		    };
		    return FilterValidator;
		}(typeValidator_1.ObjectValidator));
		exports.FilterValidator = FilterValidator;
		var ConditionItemValidator = (function (_super) {
		    __extends(ConditionItemValidator, _super);
		    function ConditionItemValidator() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    ConditionItemValidator.prototype.validate = function (input, path, field) {
		        if (input === undefined || input === null) {
		            return null;
		        }
		        var errors = _super.prototype.validate.call(this, input, path, field);
		        if (errors) {
		            return errors;
		        }
		        var fields = [
		            {
		                field: "value",
		                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.anyValueValidator]
		            },
		            {
		                field: "operator",
		                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
		            }
		        ];
		        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
		        return multipleFieldsValidator.validate(input, path, field);
		    };
		    return ConditionItemValidator;
		}(typeValidator_1.ObjectValidator));
		exports.ConditionItemValidator = ConditionItemValidator;
	
	
	/***/ }),
	/* 7 */
	/***/ (function(module, exports) {
	
		Object.defineProperty(exports, "__esModule", { value: true });
		var FieldRequiredValidator = (function () {
		    function FieldRequiredValidator() {
		    }
		    FieldRequiredValidator.prototype.validate = function (input, path, field) {
		        if (input === undefined || input === null) {
		            return [{
		                    message: field + " is required",
		                    path: (path ? path + "." : "") + field,
		                    keyword: "required"
		                }];
		        }
		        return null;
		    };
		    return FieldRequiredValidator;
		}());
		exports.FieldRequiredValidator = FieldRequiredValidator;
	
	
	/***/ }),
	/* 8 */
	/***/ (function(module, exports) {
	
		Object.defineProperty(exports, "__esModule", { value: true });
		var AnyOfValidator = (function () {
		    function AnyOfValidator(validators) {
		        this.validators = validators;
		    }
		    AnyOfValidator.prototype.validate = function (input, path, field) {
		        if (input === undefined || input === null) {
		            return null;
		        }
		        var valid = false;
		        for (var _i = 0, _a = this.validators; _i < _a.length; _i++) {
		            var validator = _a[_i];
		            var errors = validator.validate(input, path, field);
		            if (!errors) {
		                valid = true;
		                break;
		            }
		        }
		        if (!valid) {
		            return [{
		                    message: field + " property is invalid",
		                    path: (path ? path + "." : "") + field,
		                    keyword: "invalid"
		                }];
		        }
		        return null;
		    };
		    return AnyOfValidator;
		}());
		exports.AnyOfValidator = AnyOfValidator;
	
	
	/***/ }),
	/* 9 */
	/***/ (function(module, exports, __webpack_require__) {
	
		var __extends = (this && this.__extends) || (function () {
		    var extendStatics = Object.setPrototypeOf ||
		        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
		        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
		    return function (d, b) {
		        extendStatics(d, b);
		        function __() { this.constructor = d; }
		        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		    };
		})();
		Object.defineProperty(exports, "__esModule", { value: true });
		var validator_1 = __webpack_require__(1);
		var multipleFieldsValidator_1 = __webpack_require__(4);
		var typeValidator_1 = __webpack_require__(2);
		var ReportLoadValidator = (function (_super) {
		    __extends(ReportLoadValidator, _super);
		    function ReportLoadValidator() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    ReportLoadValidator.prototype.validate = function (input, path, field) {
		        if (input === undefined || input === null) {
		            return null;
		        }
		        var errors = _super.prototype.validate.call(this, input, path, field);
		        if (errors) {
		            return errors;
		        }
		        var fields = [
		            {
		                field: "accessToken",
		                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
		            },
		            {
		                field: "id",
		                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
		            },
		            {
		                field: "settings",
		                validators: [validator_1.Validators.settingsValidator]
		            },
		            {
		                field: "pageName",
		                validators: [validator_1.Validators.stringValidator]
		            },
		            {
		                field: "filters",
		                validators: [validator_1.Validators.filtersArrayValidator]
		            },
		            {
		                field: "permissions",
		                validators: [validator_1.Validators.permissionsValidator]
		            },
		            {
		                field: "viewMode",
		                validators: [validator_1.Validators.viewModeValidator]
		            },
		            {
		                field: "tokenType",
		                validators: [validator_1.Validators.tokenTypeValidator]
		            }
		        ];
		        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
		        return multipleFieldsValidator.validate(input, path, field);
		    };
		    return ReportLoadValidator;
		}(typeValidator_1.ObjectValidator));
		exports.ReportLoadValidator = ReportLoadValidator;
	
	
	/***/ }),
	/* 10 */
	/***/ (function(module, exports, __webpack_require__) {
	
		var __extends = (this && this.__extends) || (function () {
		    var extendStatics = Object.setPrototypeOf ||
		        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
		        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
		    return function (d, b) {
		        extendStatics(d, b);
		        function __() { this.constructor = d; }
		        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		    };
		})();
		Object.defineProperty(exports, "__esModule", { value: true });
		var validator_1 = __webpack_require__(1);
		var multipleFieldsValidator_1 = __webpack_require__(4);
		var typeValidator_1 = __webpack_require__(2);
		var ReportCreateValidator = (function (_super) {
		    __extends(ReportCreateValidator, _super);
		    function ReportCreateValidator() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    ReportCreateValidator.prototype.validate = function (input, path, field) {
		        if (input === undefined || input === null) {
		            return null;
		        }
		        var errors = _super.prototype.validate.call(this, input, path, field);
		        if (errors) {
		            return errors;
		        }
		        var fields = [
		            {
		                field: "accessToken",
		                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
		            },
		            {
		                field: "datasetId",
		                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
		            },
		            {
		                field: "tokenType",
		                validators: [validator_1.Validators.tokenTypeValidator]
		            }
		        ];
		        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
		        return multipleFieldsValidator.validate(input, path, field);
		    };
		    return ReportCreateValidator;
		}(typeValidator_1.ObjectValidator));
		exports.ReportCreateValidator = ReportCreateValidator;
	
	
	/***/ }),
	/* 11 */
	/***/ (function(module, exports, __webpack_require__) {
	
		var __extends = (this && this.__extends) || (function () {
		    var extendStatics = Object.setPrototypeOf ||
		        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
		        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
		    return function (d, b) {
		        extendStatics(d, b);
		        function __() { this.constructor = d; }
		        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		    };
		})();
		Object.defineProperty(exports, "__esModule", { value: true });
		var validator_1 = __webpack_require__(1);
		var multipleFieldsValidator_1 = __webpack_require__(4);
		var typeValidator_1 = __webpack_require__(2);
		var DashboardLoadValidator = (function (_super) {
		    __extends(DashboardLoadValidator, _super);
		    function DashboardLoadValidator() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    DashboardLoadValidator.prototype.validate = function (input, path, field) {
		        if (input === undefined || input === null) {
		            return null;
		        }
		        var errors = _super.prototype.validate.call(this, input, path, field);
		        if (errors) {
		            return errors;
		        }
		        var fields = [
		            {
		                field: "accessToken",
		                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
		            },
		            {
		                field: "id",
		                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
		            },
		            {
		                field: "pageView",
		                validators: [validator_1.Validators.pageViewFieldValidator]
		            },
		            {
		                field: "tokenType",
		                validators: [validator_1.Validators.tokenTypeValidator]
		            }
		        ];
		        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
		        return multipleFieldsValidator.validate(input, path, field);
		    };
		    return DashboardLoadValidator;
		}(typeValidator_1.ObjectValidator));
		exports.DashboardLoadValidator = DashboardLoadValidator;
	
	
	/***/ }),
	/* 12 */
	/***/ (function(module, exports, __webpack_require__) {
	
		var __extends = (this && this.__extends) || (function () {
		    var extendStatics = Object.setPrototypeOf ||
		        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
		        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
		    return function (d, b) {
		        extendStatics(d, b);
		        function __() { this.constructor = d; }
		        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		    };
		})();
		Object.defineProperty(exports, "__esModule", { value: true });
		var validator_1 = __webpack_require__(1);
		var multipleFieldsValidator_1 = __webpack_require__(4);
		var typeValidator_1 = __webpack_require__(2);
		var TileLoadValidator = (function (_super) {
		    __extends(TileLoadValidator, _super);
		    function TileLoadValidator() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    TileLoadValidator.prototype.validate = function (input, path, field) {
		        if (input === undefined || input === null) {
		            return null;
		        }
		        var errors = _super.prototype.validate.call(this, input, path, field);
		        if (errors) {
		            return errors;
		        }
		        var fields = [
		            {
		                field: "accessToken",
		                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
		            },
		            {
		                field: "id",
		                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
		            },
		            {
		                field: "dashboardId",
		                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
		            },
		            {
		                field: "pageView",
		                validators: [validator_1.Validators.stringValidator]
		            },
		            {
		                field: "tokenType",
		                validators: [validator_1.Validators.tokenTypeValidator]
		            },
		            {
		                field: "width",
		                validators: [validator_1.Validators.numberValidator]
		            },
		            {
		                field: "height",
		                validators: [validator_1.Validators.numberValidator]
		            }
		        ];
		        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
		        return multipleFieldsValidator.validate(input, path, field);
		    };
		    return TileLoadValidator;
		}(typeValidator_1.ObjectValidator));
		exports.TileLoadValidator = TileLoadValidator;
	
	
	/***/ }),
	/* 13 */
	/***/ (function(module, exports, __webpack_require__) {
	
		var __extends = (this && this.__extends) || (function () {
		    var extendStatics = Object.setPrototypeOf ||
		        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
		        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
		    return function (d, b) {
		        extendStatics(d, b);
		        function __() { this.constructor = d; }
		        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		    };
		})();
		Object.defineProperty(exports, "__esModule", { value: true });
		var validator_1 = __webpack_require__(1);
		var multipleFieldsValidator_1 = __webpack_require__(4);
		var typeValidator_1 = __webpack_require__(2);
		var PageSizeValidator = (function (_super) {
		    __extends(PageSizeValidator, _super);
		    function PageSizeValidator() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    PageSizeValidator.prototype.validate = function (input, path, field) {
		        if (input === undefined || input === null) {
		            return null;
		        }
		        var errors = _super.prototype.validate.call(this, input, path, field);
		        if (errors) {
		            return errors;
		        }
		        var fields = [
		            {
		                field: "type",
		                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.pageSizeTypeValidator]
		            }
		        ];
		        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
		        return multipleFieldsValidator.validate(input, path, field);
		    };
		    return PageSizeValidator;
		}(typeValidator_1.ObjectValidator));
		exports.PageSizeValidator = PageSizeValidator;
		var CustomPageSizeValidator = (function (_super) {
		    __extends(CustomPageSizeValidator, _super);
		    function CustomPageSizeValidator() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    CustomPageSizeValidator.prototype.validate = function (input, path, field) {
		        if (input === undefined || input === null) {
		            return null;
		        }
		        var errors = _super.prototype.validate.call(this, input, path, field);
		        if (errors) {
		            return errors;
		        }
		        var fields = [
		            {
		                field: "width",
		                validators: [validator_1.Validators.numberValidator]
		            },
		            {
		                field: "height",
		                validators: [validator_1.Validators.numberValidator]
		            }
		        ];
		        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
		        return multipleFieldsValidator.validate(input, path, field);
		    };
		    return CustomPageSizeValidator;
		}(PageSizeValidator));
		exports.CustomPageSizeValidator = CustomPageSizeValidator;
		var PageValidator = (function (_super) {
		    __extends(PageValidator, _super);
		    function PageValidator() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    PageValidator.prototype.validate = function (input, path, field) {
		        if (input === undefined || input === null) {
		            return null;
		        }
		        var errors = _super.prototype.validate.call(this, input, path, field);
		        if (errors) {
		            return errors;
		        }
		        var fields = [
		            {
		                field: "name",
		                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
		            }
		        ];
		        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
		        return multipleFieldsValidator.validate(input, path, field);
		    };
		    return PageValidator;
		}(typeValidator_1.ObjectValidator));
		exports.PageValidator = PageValidator;
		var PageViewFieldValidator = (function (_super) {
		    __extends(PageViewFieldValidator, _super);
		    function PageViewFieldValidator() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    PageViewFieldValidator.prototype.validate = function (input, path, field) {
		        if (input === undefined || input === null) {
		            return null;
		        }
		        var errors = _super.prototype.validate.call(this, input, path, field);
		        if (errors) {
		            return errors;
		        }
		        var possibleValues = ["actualSize", "fitToWidth", "oneColumn"];
		        if (possibleValues.indexOf(input) < 0) {
		            return [{
		                    message: "pageView must be a string with one of the following values: \"actualSize\", \"fitToWidth\", \"oneColumn\""
		                }];
		        }
		        return null;
		    };
		    return PageViewFieldValidator;
		}(typeValidator_1.StringValidator));
		exports.PageViewFieldValidator = PageViewFieldValidator;
	
	
	/***/ }),
	/* 14 */
	/***/ (function(module, exports, __webpack_require__) {
	
		var __extends = (this && this.__extends) || (function () {
		    var extendStatics = Object.setPrototypeOf ||
		        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
		        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
		    return function (d, b) {
		        extendStatics(d, b);
		        function __() { this.constructor = d; }
		        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		    };
		})();
		Object.defineProperty(exports, "__esModule", { value: true });
		var validator_1 = __webpack_require__(1);
		var multipleFieldsValidator_1 = __webpack_require__(4);
		var typeValidator_1 = __webpack_require__(2);
		var LoadQnaValidator = (function (_super) {
		    __extends(LoadQnaValidator, _super);
		    function LoadQnaValidator() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    LoadQnaValidator.prototype.validate = function (input, path, field) {
		        if (input === undefined || input === null) {
		            return null;
		        }
		        var errors = _super.prototype.validate.call(this, input, path, field);
		        if (errors) {
		            return errors;
		        }
		        var fields = [
		            {
		                field: "accessToken",
		                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
		            },
		            {
		                field: "datasetIds",
		                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringArrayValidator]
		            },
		            {
		                field: "question",
		                validators: [validator_1.Validators.stringValidator]
		            },
		            {
		                field: "viewMode",
		                validators: [validator_1.Validators.viewModeValidator]
		            },
		            {
		                field: "settings",
		                validators: [validator_1.Validators.qnaSettingValidator]
		            },
		            {
		                field: "tokenType",
		                validators: [validator_1.Validators.tokenTypeValidator]
		            }
		        ];
		        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
		        return multipleFieldsValidator.validate(input, path, field);
		    };
		    return LoadQnaValidator;
		}(typeValidator_1.ObjectValidator));
		exports.LoadQnaValidator = LoadQnaValidator;
		var QnaSettingsValidator = (function (_super) {
		    __extends(QnaSettingsValidator, _super);
		    function QnaSettingsValidator() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    QnaSettingsValidator.prototype.validate = function (input, path, field) {
		        if (input === undefined || input === null) {
		            return null;
		        }
		        var errors = _super.prototype.validate.call(this, input, path, field);
		        if (errors) {
		            return errors;
		        }
		        var fields = [
		            {
		                field: "filterPaneEnabled",
		                validators: [validator_1.Validators.booleanValidator]
		            }
		        ];
		        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
		        return multipleFieldsValidator.validate(input, path, field);
		    };
		    return QnaSettingsValidator;
		}(typeValidator_1.ObjectValidator));
		exports.QnaSettingsValidator = QnaSettingsValidator;
		var QnaInterpretInputDataValidator = (function (_super) {
		    __extends(QnaInterpretInputDataValidator, _super);
		    function QnaInterpretInputDataValidator() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    QnaInterpretInputDataValidator.prototype.validate = function (input, path, field) {
		        if (input === undefined || input === null) {
		            return null;
		        }
		        var errors = _super.prototype.validate.call(this, input, path, field);
		        if (errors) {
		            return errors;
		        }
		        var fields = [
		            {
		                field: "datasetIds",
		                validators: [validator_1.Validators.stringArrayValidator]
		            },
		            {
		                field: "question",
		                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
		            },
		        ];
		        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
		        return multipleFieldsValidator.validate(input, path, field);
		    };
		    return QnaInterpretInputDataValidator;
		}(typeValidator_1.ObjectValidator));
		exports.QnaInterpretInputDataValidator = QnaInterpretInputDataValidator;
	
	
	/***/ }),
	/* 15 */
	/***/ (function(module, exports, __webpack_require__) {
	
		var __extends = (this && this.__extends) || (function () {
		    var extendStatics = Object.setPrototypeOf ||
		        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
		        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
		    return function (d, b) {
		        extendStatics(d, b);
		        function __() { this.constructor = d; }
		        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		    };
		})();
		Object.defineProperty(exports, "__esModule", { value: true });
		var validator_1 = __webpack_require__(1);
		var multipleFieldsValidator_1 = __webpack_require__(4);
		var typeValidator_1 = __webpack_require__(2);
		var SaveAsParametersValidator = (function (_super) {
		    __extends(SaveAsParametersValidator, _super);
		    function SaveAsParametersValidator() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    SaveAsParametersValidator.prototype.validate = function (input, path, field) {
		        if (input === undefined || input === null) {
		            return null;
		        }
		        var errors = _super.prototype.validate.call(this, input, path, field);
		        if (errors) {
		            return errors;
		        }
		        var fields = [
		            {
		                field: "name",
		                validators: [validator_1.Validators.fieldRequiredValidator, validator_1.Validators.stringValidator]
		            }
		        ];
		        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
		        return multipleFieldsValidator.validate(input, path, field);
		    };
		    return SaveAsParametersValidator;
		}(typeValidator_1.ObjectValidator));
		exports.SaveAsParametersValidator = SaveAsParametersValidator;
	
	
	/***/ }),
	/* 16 */
	/***/ (function(module, exports, __webpack_require__) {
	
		var __extends = (this && this.__extends) || (function () {
		    var extendStatics = Object.setPrototypeOf ||
		        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
		        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
		    return function (d, b) {
		        extendStatics(d, b);
		        function __() { this.constructor = d; }
		        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		    };
		})();
		Object.defineProperty(exports, "__esModule", { value: true });
		var typeValidator_1 = __webpack_require__(2);
		var MapValidator = (function (_super) {
		    __extends(MapValidator, _super);
		    function MapValidator(keyValidators, valueValidators) {
		        var _this = _super.call(this) || this;
		        _this.keyValidators = keyValidators;
		        _this.valueValidators = valueValidators;
		        return _this;
		    }
		    MapValidator.prototype.validate = function (input, path, field) {
		        if (input === undefined || input === null) {
		            return null;
		        }
		        var errors = _super.prototype.validate.call(this, input, path, field);
		        if (errors) {
		            return errors;
		        }
		        for (var key in input) {
		            if (input.hasOwnProperty(key)) {
		                var fieldsPath = (path ? path + "." : "") + field + "." + key;
		                for (var _i = 0, _a = this.keyValidators; _i < _a.length; _i++) {
		                    var keyValidator = _a[_i];
		                    errors = keyValidator.validate(key, fieldsPath, field);
		                    if (errors) {
		                        return errors;
		                    }
		                }
		                for (var _b = 0, _c = this.valueValidators; _b < _c.length; _b++) {
		                    var valueValidator = _c[_b];
		                    errors = valueValidator.validate(input[key], fieldsPath, field);
		                    if (errors) {
		                        return errors;
		                    }
		                }
		            }
		        }
		        return null;
		    };
		    return MapValidator;
		}(typeValidator_1.ObjectValidator));
		exports.MapValidator = MapValidator;
	
	
	/***/ }),
	/* 17 */
	/***/ (function(module, exports, __webpack_require__) {
	
		var __extends = (this && this.__extends) || (function () {
		    var extendStatics = Object.setPrototypeOf ||
		        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
		        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
		    return function (d, b) {
		        extendStatics(d, b);
		        function __() { this.constructor = d; }
		        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		    };
		})();
		Object.defineProperty(exports, "__esModule", { value: true });
		var validator_1 = __webpack_require__(1);
		var multipleFieldsValidator_1 = __webpack_require__(4);
		var typeValidator_1 = __webpack_require__(2);
		var CustomLayoutValidator = (function (_super) {
		    __extends(CustomLayoutValidator, _super);
		    function CustomLayoutValidator() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    CustomLayoutValidator.prototype.validate = function (input, path, field) {
		        if (input === undefined || input === null) {
		            return null;
		        }
		        var errors = _super.prototype.validate.call(this, input, path, field);
		        if (errors) {
		            return errors;
		        }
		        var fields = [
		            {
		                field: "pageSize",
		                validators: [validator_1.Validators.pageSizeValidator]
		            },
		            {
		                field: "displayOption",
		                validators: [validator_1.Validators.customLayoutDisplayOptionValidator]
		            },
		            {
		                field: "pagesLayout",
		                validators: [validator_1.Validators.pagesLayoutValidator]
		            }
		        ];
		        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
		        return multipleFieldsValidator.validate(input, path, field);
		    };
		    return CustomLayoutValidator;
		}(typeValidator_1.ObjectValidator));
		exports.CustomLayoutValidator = CustomLayoutValidator;
		var VisualLayoutValidator = (function (_super) {
		    __extends(VisualLayoutValidator, _super);
		    function VisualLayoutValidator() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    VisualLayoutValidator.prototype.validate = function (input, path, field) {
		        if (input === undefined || input === null) {
		            return null;
		        }
		        var errors = _super.prototype.validate.call(this, input, path, field);
		        if (errors) {
		            return errors;
		        }
		        var fields = [
		            {
		                field: "x",
		                validators: [validator_1.Validators.numberValidator]
		            },
		            {
		                field: "y",
		                validators: [validator_1.Validators.numberValidator]
		            },
		            {
		                field: "z",
		                validators: [validator_1.Validators.numberValidator]
		            },
		            {
		                field: "width",
		                validators: [validator_1.Validators.numberValidator]
		            },
		            {
		                field: "height",
		                validators: [validator_1.Validators.numberValidator]
		            },
		            {
		                field: "displayState",
		                validators: [validator_1.Validators.displayStateValidator]
		            }
		        ];
		        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
		        return multipleFieldsValidator.validate(input, path, field);
		    };
		    return VisualLayoutValidator;
		}(typeValidator_1.ObjectValidator));
		exports.VisualLayoutValidator = VisualLayoutValidator;
		var DisplayStateValidator = (function (_super) {
		    __extends(DisplayStateValidator, _super);
		    function DisplayStateValidator() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    DisplayStateValidator.prototype.validate = function (input, path, field) {
		        if (input === undefined || input === null) {
		            return null;
		        }
		        var errors = _super.prototype.validate.call(this, input, path, field);
		        if (errors) {
		            return errors;
		        }
		        var fields = [
		            {
		                field: "mode",
		                validators: [validator_1.Validators.displayStateModeValidator]
		            }
		        ];
		        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
		        return multipleFieldsValidator.validate(input, path, field);
		    };
		    return DisplayStateValidator;
		}(typeValidator_1.ObjectValidator));
		exports.DisplayStateValidator = DisplayStateValidator;
		var PageLayoutValidator = (function (_super) {
		    __extends(PageLayoutValidator, _super);
		    function PageLayoutValidator() {
		        return _super !== null && _super.apply(this, arguments) || this;
		    }
		    PageLayoutValidator.prototype.validate = function (input, path, field) {
		        if (input === undefined || input === null) {
		            return null;
		        }
		        var errors = _super.prototype.validate.call(this, input, path, field);
		        if (errors) {
		            return errors;
		        }
		        var fields = [
		            {
		                field: "visualsLayout",
		                validators: [validator_1.Validators.pageLayoutValidator]
		            }
		        ];
		        var multipleFieldsValidator = new multipleFieldsValidator_1.MultipleFieldsValidator(fields);
		        return multipleFieldsValidator.validate(input, path, field);
		    };
		    return PageLayoutValidator;
		}(typeValidator_1.ObjectValidator));
		exports.PageLayoutValidator = PageLayoutValidator;
	
	
	/***/ })
	/******/ ])
	});
	;
	//# sourceMappingURL=models.js.map

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var embed = __webpack_require__(2);
	var models = __webpack_require__(4);
	var utils = __webpack_require__(3);
	var page_1 = __webpack_require__(6);
	var defaults_1 = __webpack_require__(7);
	/**
	 * The Power BI Report embed component
	 *
	 * @export
	 * @class Report
	 * @extends {embed.Embed}
	 * @implements {IReportNode}
	 * @implements {IFilterable}
	 */
	var Report = (function (_super) {
	    __extends(Report, _super);
	    /**
	     * Creates an instance of a Power BI Report.
	     *
	     * @param {service.Service} service
	     * @param {HTMLElement} element
	     * @param {embed.IEmbedConfiguration} config
	     */
	    function Report(service, element, baseConfig, iframe) {
	        var config = baseConfig;
	        var filterPaneEnabled = (config.settings && config.settings.filterPaneEnabled) || !(element.getAttribute(Report.filterPaneEnabledAttribute) === "false");
	        var navContentPaneEnabled = (config.settings && config.settings.navContentPaneEnabled) || !(element.getAttribute(Report.navContentPaneEnabledAttribute) === "false");
	        var settings = utils.assign({
	            filterPaneEnabled: filterPaneEnabled,
	            navContentPaneEnabled: navContentPaneEnabled
	        }, config.settings);
	        var configCopy = utils.assign({ settings: settings }, config);
	        _super.call(this, service, element, configCopy, iframe);
	        this.loadPath = "/report/load";
	        Array.prototype.push.apply(this.allowedEvents, Report.allowedEvents);
	    }
	    /**
	     * Adds backwards compatibility for the previous load configuration, which used the reportId query parameter to specify the report ID
	     * (e.g. http://embedded.powerbi.com/appTokenReportEmbed?reportId=854846ed-2106-4dc2-bc58-eb77533bf2f1).
	     *
	     * By extracting the ID we can ensure that the ID is always explicitly provided as part of the load configuration.
	     *
	     * @static
	     * @param {string} url
	     * @returns {string}
	     */
	    Report.findIdFromEmbedUrl = function (url) {
	        var reportIdRegEx = /reportId="?([^&]+)"?/;
	        var reportIdMatch = url.match(reportIdRegEx);
	        var reportId;
	        if (reportIdMatch) {
	            reportId = reportIdMatch[1];
	        }
	        return reportId;
	    };
	    /**
	     * Gets filters that are applied at the report level.
	     *
	     * ```javascript
	     * // Get filters applied at report level
	     * report.getFilters()
	     *   .then(filters => {
	     *     ...
	     *   });
	     * ```
	     *
	     * @returns {Promise<models.IFilter[]>}
	     */
	    Report.prototype.getFilters = function () {
	        return this.service.hpm.get("/report/filters", { uid: this.config.uniqueId }, this.iframe.contentWindow)
	            .then(function (response) { return response.body; }, function (response) {
	            throw response.body;
	        });
	    };
	    /**
	     * Gets the report ID from the first available location: options, attribute, embed url.
	     *
	     * @returns {string}
	     */
	    Report.prototype.getId = function () {
	        var config = this.config;
	        var reportId = config.id || this.element.getAttribute(Report.reportIdAttribute) || Report.findIdFromEmbedUrl(config.embedUrl);
	        if (typeof reportId !== 'string' || reportId.length === 0) {
	            throw new Error("Report id is required, but it was not found. You must provide an id either as part of embed configuration or as attribute '" + Report.reportIdAttribute + "'.");
	        }
	        return reportId;
	    };
	    /**
	     * Gets the list of pages within the report.
	     *
	     * ```javascript
	     * report.getPages()
	     *  .then(pages => {
	     *      ...
	     *  });
	     * ```
	     *
	     * @returns {Promise<Page[]>}
	     */
	    Report.prototype.getPages = function () {
	        var _this = this;
	        return this.service.hpm.get('/report/pages', { uid: this.config.uniqueId }, this.iframe.contentWindow)
	            .then(function (response) {
	            return response.body
	                .map(function (page) {
	                return new page_1.Page(_this, page.name, page.displayName, page.isActive);
	            });
	        }, function (response) {
	            throw response.body;
	        });
	    };
	    /**
	     * Creates an instance of a Page.
	     *
	     * Normally you would get Page objects by calling `report.getPages()`, but in the case
	     * that the page name is known and you want to perform an action on a page without having to retrieve it
	     * you can create it directly.
	     *
	     * Note: Because you are creating the page manually there is no guarantee that the page actually exists in the report, and subsequent requests could fail.
	     *
	     * ```javascript
	     * const page = report.page('ReportSection1');
	     * page.setActive();
	     * ```
	     *
	     * @param {string} name
	     * @param {string} [displayName]
	     * @param {boolean} [isActive]
	     * @returns {Page}
	     */
	    Report.prototype.page = function (name, displayName, isActive) {
	        return new page_1.Page(this, name, displayName, isActive);
	    };
	    /**
	     * Prints the active page of the report by invoking `window.print()` on the embed iframe component.
	     */
	    Report.prototype.print = function () {
	        return this.service.hpm.post('/report/print', null, { uid: this.config.uniqueId }, this.iframe.contentWindow)
	            .then(function (response) {
	            return response.body;
	        })
	            .catch(function (response) {
	            throw response.body;
	        });
	    };
	    /**
	     * Removes all filters at the report level.
	     *
	     * ```javascript
	     * report.removeFilters();
	     * ```
	     *
	     * @returns {Promise<void>}
	     */
	    Report.prototype.removeFilters = function () {
	        return this.setFilters([]);
	    };
	    /**
	     * Sets the active page of the report.
	     *
	     * ```javascript
	     * report.setPage("page2")
	     *  .catch(error => { ... });
	     * ```
	     *
	     * @param {string} pageName
	     * @returns {Promise<void>}
	     */
	    Report.prototype.setPage = function (pageName) {
	        var page = {
	            name: pageName,
	            displayName: null,
	            isActive: true
	        };
	        return this.service.hpm.put('/report/pages/active', page, { uid: this.config.uniqueId }, this.iframe.contentWindow)
	            .catch(function (response) {
	            throw response.body;
	        });
	    };
	    /**
	     * Sets filters at the report level.
	     *
	     * ```javascript
	     * const filters: [
	     *    ...
	     * ];
	     *
	     * report.setFilters(filters)
	     *  .catch(errors => {
	     *    ...
	     *  });
	     * ```
	     *
	     * @param {(models.IFilter[])} filters
	     * @returns {Promise<void>}
	     */
	    Report.prototype.setFilters = function (filters) {
	        return this.service.hpm.put("/report/filters", filters, { uid: this.config.uniqueId }, this.iframe.contentWindow)
	            .catch(function (response) {
	            throw response.body;
	        });
	    };
	    /**
	     * Updates visibility settings for the filter pane and the page navigation pane.
	     *
	     * ```javascript
	     * const newSettings = {
	     *   navContentPaneEnabled: true,
	     *   filterPaneEnabled: false
	     * };
	     *
	     * report.updateSettings(newSettings)
	     *   .catch(error => { ... });
	     * ```
	     *
	     * @param {models.ISettings} settings
	     * @returns {Promise<void>}
	     */
	    Report.prototype.updateSettings = function (settings) {
	        return this.service.hpm.patch('/report/settings', settings, { uid: this.config.uniqueId }, this.iframe.contentWindow)
	            .catch(function (response) {
	            throw response.body;
	        });
	    };
	    /**
	     * Validate load configuration.
	     */
	    Report.prototype.validate = function (config) {
	        return models.validateReportLoad(config);
	    };
	    /**
	     * Populate config for load config
	     *
	     * @param {IEmbedConfigurationBase}
	     * @returns {void}
	     */
	    Report.prototype.populateConfig = function (baseConfig) {
	        var config = baseConfig;
	        _super.prototype.populateConfig.call(this, config);
	        // TODO: Change when Object.assign is available.
	        var settings = utils.assign({}, defaults_1.Defaults.defaultSettings, config.settings);
	        config = utils.assign({ settings: settings }, config);
	        config.id = this.getId();
	        this.config = config;
	    };
	    /**
	     * Switch Report view mode.
	     *
	     * @returns {Promise<void>}
	     */
	    Report.prototype.switchMode = function (viewMode) {
	        var url = '/report/switchMode/' + viewMode;
	        return this.service.hpm.post(url, null, { uid: this.config.uniqueId }, this.iframe.contentWindow)
	            .then(function (response) {
	            return response.body;
	        })
	            .catch(function (response) {
	            throw response.body;
	        });
	    };
	    /**
	    * Refreshes data sources for the report.
	    *
	    * ```javascript
	    * report.refresh();
	    * ```
	    */
	    Report.prototype.refresh = function () {
	        return this.service.hpm.post('/report/refresh', null, { uid: this.config.uniqueId }, this.iframe.contentWindow)
	            .then(function (response) {
	            return response.body;
	        })
	            .catch(function (response) {
	            throw response.body;
	        });
	    };
	    Report.allowedEvents = ["filtersApplied", "pageChanged", "commandTriggered"];
	    Report.reportIdAttribute = 'powerbi-report-id';
	    Report.filterPaneEnabledAttribute = 'powerbi-settings-filter-pane-enabled';
	    Report.navContentPaneEnabledAttribute = 'powerbi-settings-nav-content-pane-enabled';
	    Report.typeAttribute = 'powerbi-type';
	    Report.type = "Report";
	    return Report;
	}(embed.Embed));
	exports.Report = Report;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

	/**
	 * A Power BI report page
	 *
	 * @export
	 * @class Page
	 * @implements {IPageNode}
	 * @implements {IFilterable}
	 */
	var Page = (function () {
	    /**
	     * Creates an instance of a Power BI report page.
	     *
	     * @param {IReportNode} report
	     * @param {string} name
	     * @param {string} [displayName]
	     * @param {boolean} [isActivePage]
	     */
	    function Page(report, name, displayName, isActivePage) {
	        this.report = report;
	        this.name = name;
	        this.displayName = displayName;
	        this.isActive = isActivePage;
	    }
	    /**
	     * Gets all page level filters within the report.
	     *
	     * ```javascript
	     * page.getFilters()
	     *  .then(pages => { ... });
	     * ```
	     *
	     * @returns {(Promise<models.IFilter[]>)}
	     */
	    Page.prototype.getFilters = function () {
	        return this.report.service.hpm.get("/report/pages/" + this.name + "/filters", { uid: this.report.config.uniqueId }, this.report.iframe.contentWindow)
	            .then(function (response) { return response.body; }, function (response) {
	            throw response.body;
	        });
	    };
	    /**
	     * Removes all filters from this page of the report.
	     *
	     * ```javascript
	     * page.removeFilters();
	     * ```
	     *
	     * @returns {Promise<void>}
	     */
	    Page.prototype.removeFilters = function () {
	        return this.setFilters([]);
	    };
	    /**
	     * Makes the current page the active page of the report.
	     *
	     * ```javascripot
	     * page.setActive();
	     * ```
	     *
	     * @returns {Promise<void>}
	     */
	    Page.prototype.setActive = function () {
	        var page = {
	            name: this.name,
	            displayName: null,
	            isActive: true
	        };
	        return this.report.service.hpm.put('/report/pages/active', page, { uid: this.report.config.uniqueId }, this.report.iframe.contentWindow)
	            .catch(function (response) {
	            throw response.body;
	        });
	    };
	    /**
	     * Sets all filters on the current page.
	     *
	     * ```javascript
	     * page.setFilters(filters);
	     *   .catch(errors => { ... });
	     * ```
	     *
	     * @param {(models.IFilter[])} filters
	     * @returns {Promise<void>}
	     */
	    Page.prototype.setFilters = function (filters) {
	        return this.report.service.hpm.put("/report/pages/" + this.name + "/filters", filters, { uid: this.report.config.uniqueId }, this.report.iframe.contentWindow)
	            .catch(function (response) {
	            throw response.body;
	        });
	    };
	    return Page;
	}());
	exports.Page = Page;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

	var Defaults = (function () {
	    function Defaults() {
	    }
	    Defaults.defaultSettings = {
	        filterPaneEnabled: true
	    };
	    Defaults.defaultQnaSettings = {
	        filterPaneEnabled: false
	    };
	    return Defaults;
	}());
	exports.Defaults = Defaults;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var models = __webpack_require__(4);
	var embed = __webpack_require__(2);
	var utils = __webpack_require__(3);
	var defaults_1 = __webpack_require__(7);
	var Create = (function (_super) {
	    __extends(Create, _super);
	    function Create(service, element, config) {
	        _super.call(this, service, element, config);
	    }
	    /**
	     * Gets the dataset ID from the first available location: createConfig or embed url.
	     *
	     * @returns {string}
	     */
	    Create.prototype.getId = function () {
	        var datasetId = (this.createConfig && this.createConfig.datasetId) ? this.createConfig.datasetId : Create.findIdFromEmbedUrl(this.config.embedUrl);
	        if (typeof datasetId !== 'string' || datasetId.length === 0) {
	            throw new Error('Dataset id is required, but it was not found. You must provide an id either as part of embed configuration.');
	        }
	        return datasetId;
	    };
	    /**
	     * Validate create report configuration.
	     */
	    Create.prototype.validate = function (config) {
	        return models.validateCreateReport(config);
	    };
	    /**
	     * Populate config for create
	     *
	     * @param {IEmbedConfigurationBase}
	     * @returns {void}
	     */
	    Create.prototype.populateConfig = function (baseConfig) {
	        _super.prototype.populateConfig.call(this, baseConfig);
	        // TODO: Change when Object.assign is available.
	        var settings = utils.assign({}, defaults_1.Defaults.defaultSettings, baseConfig.settings);
	        this.config = utils.assign({ settings: settings }, baseConfig);
	        var config = this.config;
	        this.createConfig = {
	            datasetId: config.datasetId || this.getId(),
	            accessToken: config.accessToken,
	            tokenType: config.tokenType,
	            settings: settings
	        };
	    };
	    /**
	     * Adds the ability to get datasetId from url.
	     * (e.g. http://embedded.powerbi.com/appTokenReportEmbed?datasetId=854846ed-2106-4dc2-bc58-eb77533bf2f1).
	     *
	     * By extracting the ID we can ensure that the ID is always explicitly provided as part of the create configuration.
	     *
	     * @static
	     * @param {string} url
	     * @returns {string}
	     */
	    Create.findIdFromEmbedUrl = function (url) {
	        var datasetIdRegEx = /datasetId="?([^&]+)"?/;
	        var datasetIdMatch = url.match(datasetIdRegEx);
	        var datasetId;
	        if (datasetIdMatch) {
	            datasetId = datasetIdMatch[1];
	        }
	        return datasetId;
	    };
	    return Create;
	}(embed.Embed));
	exports.Create = Create;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var embed = __webpack_require__(2);
	var models = __webpack_require__(4);
	var utils = __webpack_require__(3);
	var defaults_1 = __webpack_require__(7);
	/**
	 * A Power BI Dashboard embed component
	 *
	 * @export
	 * @class Dashboard
	 * @extends {embed.Embed}
	 * @implements {IDashboardNode}
	 * @implements {IFilterable}
	 */
	var Dashboard = (function (_super) {
	    __extends(Dashboard, _super);
	    /**
	     * Creates an instance of a Power BI Dashboard.
	     *
	     * @param {service.Service} service
	     * @param {HTMLElement} element
	     */
	    function Dashboard(service, element, config) {
	        _super.call(this, service, element, config);
	        this.loadPath = "/dashboard/load";
	        Array.prototype.push.apply(this.allowedEvents, Dashboard.allowedEvents);
	    }
	    /**
	     * This adds backwards compatibility for older config which used the dashboardId query param to specify dashboard id.
	     * E.g. https://powerbi-df.analysis-df.windows.net/dashboardEmbedHost?dashboardId=e9363c62-edb6-4eac-92d3-2199c5ca2a9e
	     *
	     * By extracting the id we can ensure id is always explicitly provided as part of the load configuration.
	     *
	     * @static
	     * @param {string} url
	     * @returns {string}
	     */
	    Dashboard.findIdFromEmbedUrl = function (url) {
	        var dashboardIdRegEx = /dashboardId="?([^&]+)"?/;
	        var dashboardIdMatch = url.match(dashboardIdRegEx);
	        var dashboardId;
	        if (dashboardIdMatch) {
	            dashboardId = dashboardIdMatch[1];
	        }
	        return dashboardId;
	    };
	    /**
	     * Get dashboard id from first available location: options, attribute, embed url.
	     *
	     * @returns {string}
	     */
	    Dashboard.prototype.getId = function () {
	        var config = this.config;
	        var dashboardId = config.id || this.element.getAttribute(Dashboard.dashboardIdAttribute) || Dashboard.findIdFromEmbedUrl(config.embedUrl);
	        if (typeof dashboardId !== 'string' || dashboardId.length === 0) {
	            throw new Error("Dashboard id is required, but it was not found. You must provide an id either as part of embed configuration or as attribute '" + Dashboard.dashboardIdAttribute + "'.");
	        }
	        return dashboardId;
	    };
	    /**
	     * Validate load configuration.
	     */
	    Dashboard.prototype.validate = function (baseConfig) {
	        var config = baseConfig;
	        var error = models.validateDashboardLoad(config);
	        return error ? error : this.ValidatePageView(config.pageView);
	    };
	    /**
	     * Populate config for load config
	     *
	     * @param {IEmbedConfigurationBase}
	     * @returns {void}
	     */
	    Dashboard.prototype.populateConfig = function (baseConfig) {
	        var config = baseConfig;
	        _super.prototype.populateConfig.call(this, config);
	        // TODO: Change when Object.assign is available.
	        var settings = utils.assign({}, defaults_1.Defaults.defaultSettings, config.settings);
	        config = utils.assign({ settings: settings }, config);
	        config.id = this.getId();
	        this.config = config;
	    };
	    /**
	     * Validate that pageView has a legal value: if page view is defined it must have one of the values defined in models.PageView
	     */
	    Dashboard.prototype.ValidatePageView = function (pageView) {
	        if (pageView && pageView !== "fitToWidth" && pageView !== "oneColumn" && pageView !== "actualSize") {
	            return [{ message: "pageView must be one of the followings: fitToWidth, oneColumn, actualSize" }];
	        }
	    };
	    Dashboard.allowedEvents = ["tileClicked", "error"];
	    Dashboard.dashboardIdAttribute = 'powerbi-dashboard-id';
	    Dashboard.typeAttribute = 'powerbi-type';
	    Dashboard.type = "Dashboard";
	    return Dashboard;
	}(embed.Embed));
	exports.Dashboard = Dashboard;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var models = __webpack_require__(4);
	var embed = __webpack_require__(2);
	var utils = __webpack_require__(3);
	var defaults_1 = __webpack_require__(7);
	/**
	 * The Power BI tile embed component
	 *
	 * @export
	 * @class Tile
	 * @extends {Embed}
	 */
	var Tile = (function (_super) {
	    __extends(Tile, _super);
	    function Tile(service, element, baseConfig) {
	        var config = baseConfig;
	        config.embedUrl = utils.addParamToUrl(config.embedUrl, 'dashboardId', config.dashboardId);
	        config.embedUrl = utils.addParamToUrl(config.embedUrl, 'tileId', config.id);
	        _super.call(this, service, element, config);
	        Array.prototype.push.apply(this.allowedEvents, Tile.allowedEvents);
	        window.addEventListener("message", this.receiveMessage.bind(this), false);
	    }
	    /**
	     * The ID of the tile
	     *
	     * @returns {string}
	     */
	    Tile.prototype.getId = function () {
	        var config = this.config;
	        var tileId = config.id || Tile.findIdFromEmbedUrl(this.config.embedUrl);
	        if (typeof tileId !== 'string' || tileId.length === 0) {
	            throw new Error("Tile id is required, but it was not found. You must provide an id either as part of embed configuration.");
	        }
	        return tileId;
	    };
	    /**
	     * Validate load configuration.
	     */
	    Tile.prototype.validate = function (config) {
	        var embedConfig = config;
	        return models.validateTileLoad(embedConfig);
	    };
	    /**
	     * Populate config for load config
	     *
	     * @param {IEmbedConfigurationBase}
	     * @returns {void}
	     */
	    Tile.prototype.populateConfig = function (baseConfig) {
	        var config = baseConfig;
	        _super.prototype.populateConfig.call(this, config);
	        // TODO: Change when Object.assign is available.
	        var settings = utils.assign({}, defaults_1.Defaults.defaultSettings, config.settings);
	        config = utils.assign({ settings: settings }, config);
	        config.id = this.getId();
	        this.config = config;
	    };
	    /**
	     * Sends load configuration data for tile
	     *
	     * @param {models.ILoadConfiguration} config
	     * @returns {Promise<void>}
	     */
	    Tile.prototype.load = function (baseConfig) {
	        var config = baseConfig;
	        var errors = this.validate(config);
	        if (errors) {
	            throw errors;
	        }
	        var height = config.height ? config.height : this.iframe.offsetHeight;
	        var width = config.width ? config.width : this.iframe.offsetWidth;
	        var action = config.action ? config.action : 'loadTile';
	        var tileConfig = {
	            action: action,
	            height: height,
	            width: width,
	            accessToken: config.accessToken,
	            tokenType: config.tokenType,
	        };
	        this.iframe.contentWindow.postMessage(JSON.stringify(tileConfig), "*");
	        // In order to use this function the same way we use it in embed
	        // we need to keep the return type the same as 'load' in embed 
	        return new Promise(function () {
	            return;
	        });
	    };
	    /**
	     * Adds the ability to get tileId from url.
	     * By extracting the ID we can ensure that the ID is always explicitly provided as part of the load configuration.
	     *
	     * @static
	     * @param {string} url
	     * @returns {string}
	     */
	    Tile.findIdFromEmbedUrl = function (url) {
	        var tileIdRegEx = /tileId="?([^&]+)"?/;
	        var tileIdMatch = url.match(tileIdRegEx);
	        var tileId;
	        if (tileIdMatch) {
	            tileId = tileIdMatch[1];
	        }
	        return tileId;
	    };
	    /**
	     * Adds the ability to get events from iframe
	     *
	     * @param event: MessageEvent
	     */
	    Tile.prototype.receiveMessage = function (event) {
	        if (event.data) {
	            try {
	                var messageData = JSON.parse(event.data);
	                var value = {
	                    navigationUrl: messageData.navigationUrl,
	                    errors: messageData.error,
	                    openReport: messageData.openReport
	                };
	                var tileEvent = {
	                    type: 'tile',
	                    id: this.config.uniqueId,
	                    name: messageData.event,
	                    value: value
	                };
	                this.service.handleTileEvents(tileEvent);
	            }
	            catch (e) {
	                console.log("invalid message data");
	                return;
	            }
	        }
	    };
	    Tile.type = "Tile";
	    Tile.allowedEvents = ["tileClicked", "tileLoaded"];
	    return Tile;
	}(embed.Embed));
	exports.Tile = Tile;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var models = __webpack_require__(4);
	var embed = __webpack_require__(2);
	/**
	 * The Power BI Qna embed component
	 *
	 * @export
	 * @class Qna
	 * @extends {Embed}
	 */
	var Qna = (function (_super) {
	    __extends(Qna, _super);
	    function Qna(service, element, config) {
	        _super.call(this, service, element, config);
	        this.loadPath = "/qna/load";
	        Array.prototype.push.apply(this.allowedEvents, Qna.allowedEvents);
	    }
	    /**
	     * The ID of the Qna embed component
	     *
	     * @returns {string}
	     */
	    Qna.prototype.getId = function () {
	        return null;
	    };
	    /**
	     * Change the question of the Q&A embed component
	     *
	     * @param question - question which will render Q&A data
	     * @returns {string}
	     */
	    Qna.prototype.setQuestion = function (question) {
	        var qnaData = {
	            question: question
	        };
	        return this.service.hpm.post('/qna/interpret', qnaData, { uid: this.config.uniqueId }, this.iframe.contentWindow)
	            .catch(function (response) {
	            throw response.body;
	        });
	    };
	    /**
	     * Validate load configuration.
	     */
	    Qna.prototype.validate = function (config) {
	        return models.validateLoadQnaConfiguration(config);
	    };
	    Qna.type = "Qna";
	    Qna.allowedEvents = ["loaded", "visualRendered"];
	    return Qna;
	}(embed.Embed));
	exports.Qna = Qna;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	var config_1 = __webpack_require__(13);
	var wpmp = __webpack_require__(14);
	var hpm = __webpack_require__(15);
	var router = __webpack_require__(16);
	exports.hpmFactory = function (wpmp, defaultTargetWindow, sdkVersion, sdkType) {
	    if (sdkVersion === void 0) { sdkVersion = config_1.default.version; }
	    if (sdkType === void 0) { sdkType = config_1.default.type; }
	    return new hpm.HttpPostMessage(wpmp, {
	        'x-sdk-type': sdkType,
	        'x-sdk-version': sdkVersion
	    }, defaultTargetWindow);
	};
	exports.wpmpFactory = function (name, logMessages, eventSourceOverrideWindow) {
	    return new wpmp.WindowPostMessageProxy({
	        processTrackingProperties: {
	            addTrackingProperties: hpm.HttpPostMessage.addTrackingProperties,
	            getTrackingProperties: hpm.HttpPostMessage.getTrackingProperties,
	        },
	        isErrorMessage: hpm.HttpPostMessage.isErrorMessage,
	        suppressWarnings: true,
	        name: name,
	        logMessages: logMessages,
	        eventSourceOverrideWindow: eventSourceOverrideWindow
	    });
	};
	exports.routerFactory = function (wpmp) {
	    return new router.Router(wpmp);
	};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

	var config = {
	    version: '2.4.1',
	    type: 'js'
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = config;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	/*! window-post-message-proxy v0.2.4 | (c) 2016 Microsoft Corporation MIT */
	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define([], factory);
		else if(typeof exports === 'object')
			exports["window-post-message-proxy"] = factory();
		else
			root["window-post-message-proxy"] = factory();
	})(this, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	/******/
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	/******/
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	/******/
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};
	/******/
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	/******/
	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;
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
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	/******/
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports) {
	
		"use strict";
		var WindowPostMessageProxy = (function () {
		    function WindowPostMessageProxy(options) {
		        var _this = this;
		        if (options === void 0) { options = {
		            processTrackingProperties: {
		                addTrackingProperties: WindowPostMessageProxy.defaultAddTrackingProperties,
		                getTrackingProperties: WindowPostMessageProxy.defaultGetTrackingProperties
		            },
		            isErrorMessage: WindowPostMessageProxy.defaultIsErrorMessage,
		            receiveWindow: window,
		            name: WindowPostMessageProxy.createRandomString()
		        }; }
		        this.pendingRequestPromises = {};
		        // save options with defaults
		        this.addTrackingProperties = (options.processTrackingProperties && options.processTrackingProperties.addTrackingProperties) || WindowPostMessageProxy.defaultAddTrackingProperties;
		        this.getTrackingProperties = (options.processTrackingProperties && options.processTrackingProperties.getTrackingProperties) || WindowPostMessageProxy.defaultGetTrackingProperties;
		        this.isErrorMessage = options.isErrorMessage || WindowPostMessageProxy.defaultIsErrorMessage;
		        this.receiveWindow = options.receiveWindow || window;
		        this.name = options.name || WindowPostMessageProxy.createRandomString();
		        this.logMessages = options.logMessages || false;
		        this.eventSourceOverrideWindow = options.eventSourceOverrideWindow;
		        this.suppressWarnings = options.suppressWarnings || false;
		        if (this.logMessages) {
		            console.log("new WindowPostMessageProxy created with name: " + this.name + " receiving on window: " + this.receiveWindow.document.title);
		        }
		        // Initialize
		        this.handlers = [];
		        this.windowMessageHandler = function (event) { return _this.onMessageReceived(event); };
		        this.start();
		    }
		    // Static
		    WindowPostMessageProxy.defaultAddTrackingProperties = function (message, trackingProperties) {
		        message[WindowPostMessageProxy.messagePropertyName] = trackingProperties;
		        return message;
		    };
		    WindowPostMessageProxy.defaultGetTrackingProperties = function (message) {
		        return message[WindowPostMessageProxy.messagePropertyName];
		    };
		    WindowPostMessageProxy.defaultIsErrorMessage = function (message) {
		        return !!message.error;
		    };
		    /**
		     * Utility to create a deferred object.
		     */
		    // TODO: Look to use RSVP library instead of doing this manually.
		    // From what I searched RSVP would work better because it has .finally and .deferred; however, it doesn't have Typings information. 
		    WindowPostMessageProxy.createDeferred = function () {
		        var deferred = {
		            resolve: null,
		            reject: null,
		            promise: null
		        };
		        var promise = new Promise(function (resolve, reject) {
		            deferred.resolve = resolve;
		            deferred.reject = reject;
		        });
		        deferred.promise = promise;
		        return deferred;
		    };
		    /**
		     * Utility to generate random sequence of characters used as tracking id for promises.
		     */
		    WindowPostMessageProxy.createRandomString = function () {
		        return (Math.random() + 1).toString(36).substring(7);
		    };
		    /**
		     * Adds handler.
		     * If the first handler whose test method returns true will handle the message and provide a response.
		     */
		    WindowPostMessageProxy.prototype.addHandler = function (handler) {
		        this.handlers.push(handler);
		    };
		    /**
		     * Removes handler.
		     * The reference must match the original object that was provided when adding the handler.
		     */
		    WindowPostMessageProxy.prototype.removeHandler = function (handler) {
		        var handlerIndex = this.handlers.indexOf(handler);
		        if (handlerIndex === -1) {
		            throw new Error("You attempted to remove a handler but no matching handler was found.");
		        }
		        this.handlers.splice(handlerIndex, 1);
		    };
		    /**
		     * Start listening to message events.
		     */
		    WindowPostMessageProxy.prototype.start = function () {
		        this.receiveWindow.addEventListener('message', this.windowMessageHandler);
		    };
		    /**
		     * Stops listening to message events.
		     */
		    WindowPostMessageProxy.prototype.stop = function () {
		        this.receiveWindow.removeEventListener('message', this.windowMessageHandler);
		    };
		    /**
		     * Post message to target window with tracking properties added and save deferred object referenced by tracking id.
		     */
		    WindowPostMessageProxy.prototype.postMessage = function (targetWindow, message) {
		        // Add tracking properties to indicate message came from this proxy
		        var trackingProperties = { id: WindowPostMessageProxy.createRandomString() };
		        this.addTrackingProperties(message, trackingProperties);
		        if (this.logMessages) {
		            console.log(this.name + " Posting message:");
		            console.log(JSON.stringify(message, null, '  '));
		        }
		        targetWindow.postMessage(message, "*");
		        var deferred = WindowPostMessageProxy.createDeferred();
		        this.pendingRequestPromises[trackingProperties.id] = deferred;
		        return deferred.promise;
		    };
		    /**
		     * Send response message to target window.
		     * Response messages re-use tracking properties from a previous request message.
		     */
		    WindowPostMessageProxy.prototype.sendResponse = function (targetWindow, message, trackingProperties) {
		        this.addTrackingProperties(message, trackingProperties);
		        if (this.logMessages) {
		            console.log(this.name + " Sending response:");
		            console.log(JSON.stringify(message, null, '  '));
		        }
		        targetWindow.postMessage(message, "*");
		    };
		    /**
		     * Message handler.
		     */
		    WindowPostMessageProxy.prototype.onMessageReceived = function (event) {
		        var _this = this;
		        if (this.logMessages) {
		            console.log(this.name + " Received message:");
		            console.log("type: " + event.type);
		            console.log(JSON.stringify(event.data, null, '  '));
		        }
		        var sendingWindow = this.eventSourceOverrideWindow || event.source;
		        var message = event.data;
		        if (typeof message !== "object") {
		            if (!this.suppressWarnings) {
		                console.warn("Proxy(" + this.name + "): Received message that was not an object. Discarding message");
		            }
		            return;
		        }
		        var trackingProperties;
		        try {
		            trackingProperties = this.getTrackingProperties(message);
		        }
		        catch (e) {
		            if (!this.suppressWarnings) {
		                console.warn("Proxy(" + this.name + "): Error occurred when attempting to get tracking properties from incoming message:", JSON.stringify(message, null, '  '), "Error: ", e);
		            }
		        }
		        var deferred;
		        if (trackingProperties) {
		            deferred = this.pendingRequestPromises[trackingProperties.id];
		        }
		        // If message does not have a known ID, treat it as a request
		        // Otherwise, treat message as response
		        if (!deferred) {
		            var handled = this.handlers.some(function (handler) {
		                var canMessageBeHandled = false;
		                try {
		                    canMessageBeHandled = handler.test(message);
		                }
		                catch (e) {
		                    if (!_this.suppressWarnings) {
		                        console.warn("Proxy(" + _this.name + "): Error occurred when handler was testing incoming message:", JSON.stringify(message, null, '  '), "Error: ", e);
		                    }
		                }
		                if (canMessageBeHandled) {
		                    var responseMessagePromise = void 0;
		                    try {
		                        responseMessagePromise = Promise.resolve(handler.handle(message));
		                    }
		                    catch (e) {
		                        if (!_this.suppressWarnings) {
		                            console.warn("Proxy(" + _this.name + "): Error occurred when handler was processing incoming message:", JSON.stringify(message, null, '  '), "Error: ", e);
		                        }
		                        responseMessagePromise = Promise.resolve();
		                    }
		                    responseMessagePromise
		                        .then(function (responseMessage) {
		                        if (!responseMessage) {
		                            var warningMessage = "Handler for message: " + JSON.stringify(message, null, '  ') + " did not return a response message. The default response message will be returned instead.";
		                            if (!_this.suppressWarnings) {
		                                console.warn("Proxy(" + _this.name + "): " + warningMessage);
		                            }
		                            responseMessage = {
		                                warning: warningMessage
		                            };
		                        }
		                        _this.sendResponse(sendingWindow, responseMessage, trackingProperties);
		                    });
		                    return true;
		                }
		            });
		            /**
		             * TODO: Consider returning an error message if nothing handled the message.
		             * In the case of the Report receiving messages all of them should be handled,
		             * however, in the case of the SDK receiving messages it's likely it won't register handlers
		             * for all events. Perhaps make this an option at construction time.
		             */
		            if (!handled && !this.suppressWarnings) {
		                console.warn("Proxy(" + this.name + ") did not handle message. Handlers: " + this.handlers.length + "  Message: " + JSON.stringify(message, null, '') + ".");
		            }
		        }
		        else {
		            /**
		             * If error message reject promise,
		             * Otherwise, resolve promise
		             */
		            var isErrorMessage = true;
		            try {
		                isErrorMessage = this.isErrorMessage(message);
		            }
		            catch (e) {
		                console.warn("Proxy(" + this.name + ") Error occurred when trying to determine if message is consider an error response. Message: ", JSON.stringify(message, null, ''), 'Error: ', e);
		            }
		            if (isErrorMessage) {
		                deferred.reject(message);
		            }
		            else {
		                deferred.resolve(message);
		            }
		            // TODO: Move to .finally clause up where promise is created for better maitenance like original proxy code.
		            delete this.pendingRequestPromises[trackingProperties.id];
		        }
		    };
		    WindowPostMessageProxy.messagePropertyName = "windowPostMessageProxy";
		    return WindowPostMessageProxy;
		}());
		exports.WindowPostMessageProxy = WindowPostMessageProxy;
	
	
	/***/ }
	/******/ ])
	});
	;
	//# sourceMappingURL=windowPostMessageProxy.js.map

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	/*! http-post-message v0.2.3 | (c) 2016 Microsoft Corporation MIT */
	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define([], factory);
		else if(typeof exports === 'object')
			exports["http-post-message"] = factory();
		else
			root["http-post-message"] = factory();
	})(this, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	/******/
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	/******/
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	/******/
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};
	/******/
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	/******/
	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;
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
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	/******/
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports) {
	
		"use strict";
		var HttpPostMessage = (function () {
		    function HttpPostMessage(windowPostMessageProxy, defaultHeaders, defaultTargetWindow) {
		        if (defaultHeaders === void 0) { defaultHeaders = {}; }
		        this.defaultHeaders = defaultHeaders;
		        this.defaultTargetWindow = defaultTargetWindow;
		        this.windowPostMessageProxy = windowPostMessageProxy;
		    }
		    // TODO: See if it's possible to share tracking properties interface?
		    // The responsibility of knowing how to configure windowPostMessageProxy for http should
		    // live in this http class, but the configuration would need ITrackingProperties
		    // interface which lives in WindowPostMessageProxy. Use <any> type as workaround
		    HttpPostMessage.addTrackingProperties = function (message, trackingProperties) {
		        message.headers = message.headers || {};
		        if (trackingProperties && trackingProperties.id) {
		            message.headers.id = trackingProperties.id;
		        }
		        return message;
		    };
		    HttpPostMessage.getTrackingProperties = function (message) {
		        return {
		            id: message.headers && message.headers.id
		        };
		    };
		    HttpPostMessage.isErrorMessage = function (message) {
		        if (typeof (message && message.statusCode) !== 'number') {
		            return false;
		        }
		        return !(200 <= message.statusCode && message.statusCode < 300);
		    };
		    HttpPostMessage.prototype.get = function (url, headers, targetWindow) {
		        if (headers === void 0) { headers = {}; }
		        if (targetWindow === void 0) { targetWindow = this.defaultTargetWindow; }
		        return this.send({
		            method: "GET",
		            url: url,
		            headers: headers
		        }, targetWindow);
		    };
		    HttpPostMessage.prototype.post = function (url, body, headers, targetWindow) {
		        if (headers === void 0) { headers = {}; }
		        if (targetWindow === void 0) { targetWindow = this.defaultTargetWindow; }
		        return this.send({
		            method: "POST",
		            url: url,
		            headers: headers,
		            body: body
		        }, targetWindow);
		    };
		    HttpPostMessage.prototype.put = function (url, body, headers, targetWindow) {
		        if (headers === void 0) { headers = {}; }
		        if (targetWindow === void 0) { targetWindow = this.defaultTargetWindow; }
		        return this.send({
		            method: "PUT",
		            url: url,
		            headers: headers,
		            body: body
		        }, targetWindow);
		    };
		    HttpPostMessage.prototype.patch = function (url, body, headers, targetWindow) {
		        if (headers === void 0) { headers = {}; }
		        if (targetWindow === void 0) { targetWindow = this.defaultTargetWindow; }
		        return this.send({
		            method: "PATCH",
		            url: url,
		            headers: headers,
		            body: body
		        }, targetWindow);
		    };
		    HttpPostMessage.prototype.delete = function (url, body, headers, targetWindow) {
		        if (body === void 0) { body = null; }
		        if (headers === void 0) { headers = {}; }
		        if (targetWindow === void 0) { targetWindow = this.defaultTargetWindow; }
		        return this.send({
		            method: "DELETE",
		            url: url,
		            headers: headers,
		            body: body
		        }, targetWindow);
		    };
		    HttpPostMessage.prototype.send = function (request, targetWindow) {
		        if (targetWindow === void 0) { targetWindow = this.defaultTargetWindow; }
		        request.headers = this.assign({}, this.defaultHeaders, request.headers);
		        if (!targetWindow) {
		            throw new Error("target window is not provided.  You must either provide the target window explicitly as argument to request, or specify default target window when constructing instance of this class.");
		        }
		        return this.windowPostMessageProxy.postMessage(targetWindow, request);
		    };
		    /**
		     * Object.assign() polyfill
		     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
		     */
		    HttpPostMessage.prototype.assign = function (target) {
		        var sources = [];
		        for (var _i = 1; _i < arguments.length; _i++) {
		            sources[_i - 1] = arguments[_i];
		        }
		        if (target === undefined || target === null) {
		            throw new TypeError('Cannot convert undefined or null to object');
		        }
		        var output = Object(target);
		        sources.forEach(function (source) {
		            if (source !== undefined && source !== null) {
		                for (var nextKey in source) {
		                    if (Object.prototype.hasOwnProperty.call(source, nextKey)) {
		                        output[nextKey] = source[nextKey];
		                    }
		                }
		            }
		        });
		        return output;
		    };
		    return HttpPostMessage;
		}());
		exports.HttpPostMessage = HttpPostMessage;
	
	
	/***/ }
	/******/ ])
	});
	;
	//# sourceMappingURL=httpPostMessage.js.map

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	/*! powerbi-router v0.1.5 | (c) 2016 Microsoft Corporation MIT */
	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define([], factory);
		else if(typeof exports === 'object')
			exports["powerbi-router"] = factory();
		else
			root["powerbi-router"] = factory();
	})(this, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	/******/
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	/******/
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	/******/
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};
	/******/
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	/******/
	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;
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
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	/******/
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		var RouteRecognizer = __webpack_require__(1);
		var Router = (function () {
		    function Router(handlers) {
		        this.handlers = handlers;
		        /**
		         * TODO: look at generating the router dynamically based on list of supported http methods
		         * instead of hardcoding the creation of these and the methods.
		         */
		        this.getRouteRecognizer = new RouteRecognizer();
		        this.patchRouteRecognizer = new RouteRecognizer();
		        this.postRouteRecognizer = new RouteRecognizer();
		        this.putRouteRecognizer = new RouteRecognizer();
		        this.deleteRouteRecognizer = new RouteRecognizer();
		    }
		    Router.prototype.get = function (url, handler) {
		        this.registerHandler(this.getRouteRecognizer, "GET", url, handler);
		        return this;
		    };
		    Router.prototype.patch = function (url, handler) {
		        this.registerHandler(this.patchRouteRecognizer, "PATCH", url, handler);
		        return this;
		    };
		    Router.prototype.post = function (url, handler) {
		        this.registerHandler(this.postRouteRecognizer, "POST", url, handler);
		        return this;
		    };
		    Router.prototype.put = function (url, handler) {
		        this.registerHandler(this.putRouteRecognizer, "PUT", url, handler);
		        return this;
		    };
		    Router.prototype.delete = function (url, handler) {
		        this.registerHandler(this.deleteRouteRecognizer, "DELETE", url, handler);
		        return this;
		    };
		    /**
		     * TODO: This method could use some refactoring.  There is conflict of interest between keeping clean separation of test and handle method
		     * Test method only returns boolean indicating if request can be handled, and handle method has opportunity to modify response and return promise of it.
		     * In the case of the router with route-recognizer where handlers are associated with routes, this already guarantees that only one handler is selected and makes the test method feel complicated
		     * Will leave as is an investigate cleaner ways at later time.
		     */
		    Router.prototype.registerHandler = function (routeRecognizer, method, url, handler) {
		        var routeRecognizerHandler = function (request) {
		            var response = new Response();
		            return Promise.resolve(handler(request, response))
		                .then(function (x) { return response; });
		        };
		        routeRecognizer.add([
		            { path: url, handler: routeRecognizerHandler }
		        ]);
		        var internalHandler = {
		            test: function (request) {
		                if (request.method !== method) {
		                    return false;
		                }
		                var matchingRoutes = routeRecognizer.recognize(request.url);
		                if (matchingRoutes === undefined) {
		                    return false;
		                }
		                /**
		                 * Copy parameters from recognized route to the request so they can be used within the handler function
		                 * This isn't ideal because it is side affect which modifies the request instead of strictly testing for true or false
		                 * but I don't see a better place to put this.  If we move it between the call to test and the handle it becomes part of the window post message proxy
		                 * even though it's responsibility is related to routing.
		                 */
		                var route = matchingRoutes[0];
		                request.params = route.params;
		                request.queryParams = matchingRoutes.queryParams;
		                request.handler = route.handler;
		                return true;
		            },
		            handle: function (request) {
		                return request.handler(request);
		            }
		        };
		        this.handlers.addHandler(internalHandler);
		    };
		    return Router;
		}());
		exports.Router = Router;
		var Response = (function () {
		    function Response() {
		        this.statusCode = 200;
		        this.headers = {};
		        this.body = null;
		    }
		    Response.prototype.send = function (statusCode, body) {
		        this.statusCode = statusCode;
		        this.body = body;
		    };
		    return Response;
		}());
		exports.Response = Response;
	
	
	/***/ },
	/* 1 */
	/***/ function(module, exports, __webpack_require__) {
	
		var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {(function() {
		    "use strict";
		    function $$route$recognizer$dsl$$Target(path, matcher, delegate) {
		      this.path = path;
		      this.matcher = matcher;
		      this.delegate = delegate;
		    }
		
		    $$route$recognizer$dsl$$Target.prototype = {
		      to: function(target, callback) {
		        var delegate = this.delegate;
		
		        if (delegate && delegate.willAddRoute) {
		          target = delegate.willAddRoute(this.matcher.target, target);
		        }
		
		        this.matcher.add(this.path, target);
		
		        if (callback) {
		          if (callback.length === 0) { throw new Error("You must have an argument in the function passed to `to`"); }
		          this.matcher.addChild(this.path, target, callback, this.delegate);
		        }
		        return this;
		      }
		    };
		
		    function $$route$recognizer$dsl$$Matcher(target) {
		      this.routes = {};
		      this.children = {};
		      this.target = target;
		    }
		
		    $$route$recognizer$dsl$$Matcher.prototype = {
		      add: function(path, handler) {
		        this.routes[path] = handler;
		      },
		
		      addChild: function(path, target, callback, delegate) {
		        var matcher = new $$route$recognizer$dsl$$Matcher(target);
		        this.children[path] = matcher;
		
		        var match = $$route$recognizer$dsl$$generateMatch(path, matcher, delegate);
		
		        if (delegate && delegate.contextEntered) {
		          delegate.contextEntered(target, match);
		        }
		
		        callback(match);
		      }
		    };
		
		    function $$route$recognizer$dsl$$generateMatch(startingPath, matcher, delegate) {
		      return function(path, nestedCallback) {
		        var fullPath = startingPath + path;
		
		        if (nestedCallback) {
		          nestedCallback($$route$recognizer$dsl$$generateMatch(fullPath, matcher, delegate));
		        } else {
		          return new $$route$recognizer$dsl$$Target(startingPath + path, matcher, delegate);
		        }
		      };
		    }
		
		    function $$route$recognizer$dsl$$addRoute(routeArray, path, handler) {
		      var len = 0;
		      for (var i=0; i<routeArray.length; i++) {
		        len += routeArray[i].path.length;
		      }
		
		      path = path.substr(len);
		      var route = { path: path, handler: handler };
		      routeArray.push(route);
		    }
		
		    function $$route$recognizer$dsl$$eachRoute(baseRoute, matcher, callback, binding) {
		      var routes = matcher.routes;
		
		      for (var path in routes) {
		        if (routes.hasOwnProperty(path)) {
		          var routeArray = baseRoute.slice();
		          $$route$recognizer$dsl$$addRoute(routeArray, path, routes[path]);
		
		          if (matcher.children[path]) {
		            $$route$recognizer$dsl$$eachRoute(routeArray, matcher.children[path], callback, binding);
		          } else {
		            callback.call(binding, routeArray);
		          }
		        }
		      }
		    }
		
		    var $$route$recognizer$dsl$$default = function(callback, addRouteCallback) {
		      var matcher = new $$route$recognizer$dsl$$Matcher();
		
		      callback($$route$recognizer$dsl$$generateMatch("", matcher, this.delegate));
		
		      $$route$recognizer$dsl$$eachRoute([], matcher, function(route) {
		        if (addRouteCallback) { addRouteCallback(this, route); }
		        else { this.add(route); }
		      }, this);
		    };
		
		    var $$route$recognizer$$specials = [
		      '/', '.', '*', '+', '?', '|',
		      '(', ')', '[', ']', '{', '}', '\\'
		    ];
		
		    var $$route$recognizer$$escapeRegex = new RegExp('(\\' + $$route$recognizer$$specials.join('|\\') + ')', 'g');
		
		    function $$route$recognizer$$isArray(test) {
		      return Object.prototype.toString.call(test) === "[object Array]";
		    }
		
		    // A Segment represents a segment in the original route description.
		    // Each Segment type provides an `eachChar` and `regex` method.
		    //
		    // The `eachChar` method invokes the callback with one or more character
		    // specifications. A character specification consumes one or more input
		    // characters.
		    //
		    // The `regex` method returns a regex fragment for the segment. If the
		    // segment is a dynamic of star segment, the regex fragment also includes
		    // a capture.
		    //
		    // A character specification contains:
		    //
		    // * `validChars`: a String with a list of all valid characters, or
		    // * `invalidChars`: a String with a list of all invalid characters
		    // * `repeat`: true if the character specification can repeat
		
		    function $$route$recognizer$$StaticSegment(string) { this.string = string; }
		    $$route$recognizer$$StaticSegment.prototype = {
		      eachChar: function(currentState) {
		        var string = this.string, ch;
		
		        for (var i=0; i<string.length; i++) {
		          ch = string.charAt(i);
		          currentState = currentState.put({ invalidChars: undefined, repeat: false, validChars: ch });
		        }
		
		        return currentState;
		      },
		
		      regex: function() {
		        return this.string.replace($$route$recognizer$$escapeRegex, '\\$1');
		      },
		
		      generate: function() {
		        return this.string;
		      }
		    };
		
		    function $$route$recognizer$$DynamicSegment(name) { this.name = name; }
		    $$route$recognizer$$DynamicSegment.prototype = {
		      eachChar: function(currentState) {
		        return currentState.put({ invalidChars: "/", repeat: true, validChars: undefined });
		      },
		
		      regex: function() {
		        return "([^/]+)";
		      },
		
		      generate: function(params) {
		        return params[this.name];
		      }
		    };
		
		    function $$route$recognizer$$StarSegment(name) { this.name = name; }
		    $$route$recognizer$$StarSegment.prototype = {
		      eachChar: function(currentState) {
		        return currentState.put({ invalidChars: "", repeat: true, validChars: undefined });
		      },
		
		      regex: function() {
		        return "(.+)";
		      },
		
		      generate: function(params) {
		        return params[this.name];
		      }
		    };
		
		    function $$route$recognizer$$EpsilonSegment() {}
		    $$route$recognizer$$EpsilonSegment.prototype = {
		      eachChar: function(currentState) {
		        return currentState;
		      },
		      regex: function() { return ""; },
		      generate: function() { return ""; }
		    };
		
		    function $$route$recognizer$$parse(route, names, specificity) {
		      // normalize route as not starting with a "/". Recognition will
		      // also normalize.
		      if (route.charAt(0) === "/") { route = route.substr(1); }
		
		      var segments = route.split("/");
		      var results = new Array(segments.length);
		
		      // A routes has specificity determined by the order that its different segments
		      // appear in. This system mirrors how the magnitude of numbers written as strings
		      // works.
		      // Consider a number written as: "abc". An example would be "200". Any other number written
		      // "xyz" will be smaller than "abc" so long as `a > z`. For instance, "199" is smaller
		      // then "200", even though "y" and "z" (which are both 9) are larger than "0" (the value
		      // of (`b` and `c`). This is because the leading symbol, "2", is larger than the other
		      // leading symbol, "1".
		      // The rule is that symbols to the left carry more weight than symbols to the right
		      // when a number is written out as a string. In the above strings, the leading digit
		      // represents how many 100's are in the number, and it carries more weight than the middle
		      // number which represents how many 10's are in the number.
		      // This system of number magnitude works well for route specificity, too. A route written as
		      // `a/b/c` will be more specific than `x/y/z` as long as `a` is more specific than
		      // `x`, irrespective of the other parts.
		      // Because of this similarity, we assign each type of segment a number value written as a
		      // string. We can find the specificity of compound routes by concatenating these strings
		      // together, from left to right. After we have looped through all of the segments,
		      // we convert the string to a number.
		      specificity.val = '';
		
		      for (var i=0; i<segments.length; i++) {
		        var segment = segments[i], match;
		
		        if (match = segment.match(/^:([^\/]+)$/)) {
		          results[i] = new $$route$recognizer$$DynamicSegment(match[1]);
		          names.push(match[1]);
		          specificity.val += '3';
		        } else if (match = segment.match(/^\*([^\/]+)$/)) {
		          results[i] = new $$route$recognizer$$StarSegment(match[1]);
		          specificity.val += '1';
		          names.push(match[1]);
		        } else if(segment === "") {
		          results[i] = new $$route$recognizer$$EpsilonSegment();
		          specificity.val += '2';
		        } else {
		          results[i] = new $$route$recognizer$$StaticSegment(segment);
		          specificity.val += '4';
		        }
		      }
		
		      specificity.val = +specificity.val;
		
		      return results;
		    }
		
		    // A State has a character specification and (`charSpec`) and a list of possible
		    // subsequent states (`nextStates`).
		    //
		    // If a State is an accepting state, it will also have several additional
		    // properties:
		    //
		    // * `regex`: A regular expression that is used to extract parameters from paths
		    //   that reached this accepting state.
		    // * `handlers`: Information on how to convert the list of captures into calls
		    //   to registered handlers with the specified parameters
		    // * `types`: How many static, dynamic or star segments in this route. Used to
		    //   decide which route to use if multiple registered routes match a path.
		    //
		    // Currently, State is implemented naively by looping over `nextStates` and
		    // comparing a character specification against a character. A more efficient
		    // implementation would use a hash of keys pointing at one or more next states.
		
		    function $$route$recognizer$$State(charSpec) {
		      this.charSpec = charSpec;
		      this.nextStates = [];
		      this.charSpecs = {};
		      this.regex = undefined;
		      this.handlers = undefined;
		      this.specificity = undefined;
		    }
		
		    $$route$recognizer$$State.prototype = {
		      get: function(charSpec) {
		        if (this.charSpecs[charSpec.validChars]) {
		          return this.charSpecs[charSpec.validChars];
		        }
		
		        var nextStates = this.nextStates;
		
		        for (var i=0; i<nextStates.length; i++) {
		          var child = nextStates[i];
		
		          var isEqual = child.charSpec.validChars === charSpec.validChars;
		          isEqual = isEqual && child.charSpec.invalidChars === charSpec.invalidChars;
		
		          if (isEqual) {
		            this.charSpecs[charSpec.validChars] = child;
		            return child;
		          }
		        }
		      },
		
		      put: function(charSpec) {
		        var state;
		
		        // If the character specification already exists in a child of the current
		        // state, just return that state.
		        if (state = this.get(charSpec)) { return state; }
		
		        // Make a new state for the character spec
		        state = new $$route$recognizer$$State(charSpec);
		
		        // Insert the new state as a child of the current state
		        this.nextStates.push(state);
		
		        // If this character specification repeats, insert the new state as a child
		        // of itself. Note that this will not trigger an infinite loop because each
		        // transition during recognition consumes a character.
		        if (charSpec.repeat) {
		          state.nextStates.push(state);
		        }
		
		        // Return the new state
		        return state;
		      },
		
		      // Find a list of child states matching the next character
		      match: function(ch) {
		        var nextStates = this.nextStates,
		            child, charSpec, chars;
		
		        var returned = [];
		
		        for (var i=0; i<nextStates.length; i++) {
		          child = nextStates[i];
		
		          charSpec = child.charSpec;
		
		          if (typeof (chars = charSpec.validChars) !== 'undefined') {
		            if (chars.indexOf(ch) !== -1) { returned.push(child); }
		          } else if (typeof (chars = charSpec.invalidChars) !== 'undefined') {
		            if (chars.indexOf(ch) === -1) { returned.push(child); }
		          }
		        }
		
		        return returned;
		      }
		    };
		
		    // Sort the routes by specificity
		    function $$route$recognizer$$sortSolutions(states) {
		      return states.sort(function(a, b) {
		        return b.specificity.val - a.specificity.val;
		      });
		    }
		
		    function $$route$recognizer$$recognizeChar(states, ch) {
		      var nextStates = [];
		
		      for (var i=0, l=states.length; i<l; i++) {
		        var state = states[i];
		
		        nextStates = nextStates.concat(state.match(ch));
		      }
		
		      return nextStates;
		    }
		
		    var $$route$recognizer$$oCreate = Object.create || function(proto) {
		      function F() {}
		      F.prototype = proto;
		      return new F();
		    };
		
		    function $$route$recognizer$$RecognizeResults(queryParams) {
		      this.queryParams = queryParams || {};
		    }
		    $$route$recognizer$$RecognizeResults.prototype = $$route$recognizer$$oCreate({
		      splice: Array.prototype.splice,
		      slice:  Array.prototype.slice,
		      push:   Array.prototype.push,
		      length: 0,
		      queryParams: null
		    });
		
		    function $$route$recognizer$$findHandler(state, path, queryParams) {
		      var handlers = state.handlers, regex = state.regex;
		      var captures = path.match(regex), currentCapture = 1;
		      var result = new $$route$recognizer$$RecognizeResults(queryParams);
		
		      result.length = handlers.length;
		
		      for (var i=0; i<handlers.length; i++) {
		        var handler = handlers[i], names = handler.names, params = {};
		
		        for (var j=0; j<names.length; j++) {
		          params[names[j]] = captures[currentCapture++];
		        }
		
		        result[i] = { handler: handler.handler, params: params, isDynamic: !!names.length };
		      }
		
		      return result;
		    }
		
		    function $$route$recognizer$$decodeQueryParamPart(part) {
		      // http://www.w3.org/TR/html401/interact/forms.html#h-17.13.4.1
		      part = part.replace(/\+/gm, '%20');
		      var result;
		      try {
		        result = decodeURIComponent(part);
		      } catch(error) {result = '';}
		      return result;
		    }
		
		    // The main interface
		
		    var $$route$recognizer$$RouteRecognizer = function() {
		      this.rootState = new $$route$recognizer$$State();
		      this.names = {};
		    };
		
		
		    $$route$recognizer$$RouteRecognizer.prototype = {
		      add: function(routes, options) {
		        var currentState = this.rootState, regex = "^",
		            specificity = {},
		            handlers = new Array(routes.length), allSegments = [], name;
		
		        var isEmpty = true;
		
		        for (var i=0; i<routes.length; i++) {
		          var route = routes[i], names = [];
		
		          var segments = $$route$recognizer$$parse(route.path, names, specificity);
		
		          allSegments = allSegments.concat(segments);
		
		          for (var j=0; j<segments.length; j++) {
		            var segment = segments[j];
		
		            if (segment instanceof $$route$recognizer$$EpsilonSegment) { continue; }
		
		            isEmpty = false;
		
		            // Add a "/" for the new segment
		            currentState = currentState.put({ invalidChars: undefined, repeat: false, validChars: "/" });
		            regex += "/";
		
		            // Add a representation of the segment to the NFA and regex
		            currentState = segment.eachChar(currentState);
		            regex += segment.regex();
		          }
		          var handler = { handler: route.handler, names: names };
		          handlers[i] = handler;
		        }
		
		        if (isEmpty) {
		          currentState = currentState.put({ invalidChars: undefined, repeat: false, validChars: "/" });
		          regex += "/";
		        }
		
		        currentState.handlers = handlers;
		        currentState.regex = new RegExp(regex + "$");
		        currentState.specificity = specificity;
		
		        if (name = options && options.as) {
		          this.names[name] = {
		            segments: allSegments,
		            handlers: handlers
		          };
		        }
		      },
		
		      handlersFor: function(name) {
		        var route = this.names[name];
		
		        if (!route) { throw new Error("There is no route named " + name); }
		
		        var result = new Array(route.handlers.length);
		
		        for (var i=0; i<route.handlers.length; i++) {
		          result[i] = route.handlers[i];
		        }
		
		        return result;
		      },
		
		      hasRoute: function(name) {
		        return !!this.names[name];
		      },
		
		      generate: function(name, params) {
		        var route = this.names[name], output = "";
		        if (!route) { throw new Error("There is no route named " + name); }
		
		        var segments = route.segments;
		
		        for (var i=0; i<segments.length; i++) {
		          var segment = segments[i];
		
		          if (segment instanceof $$route$recognizer$$EpsilonSegment) { continue; }
		
		          output += "/";
		          output += segment.generate(params);
		        }
		
		        if (output.charAt(0) !== '/') { output = '/' + output; }
		
		        if (params && params.queryParams) {
		          output += this.generateQueryString(params.queryParams, route.handlers);
		        }
		
		        return output;
		      },
		
		      generateQueryString: function(params, handlers) {
		        var pairs = [];
		        var keys = [];
		        for(var key in params) {
		          if (params.hasOwnProperty(key)) {
		            keys.push(key);
		          }
		        }
		        keys.sort();
		        for (var i = 0; i < keys.length; i++) {
		          key = keys[i];
		          var value = params[key];
		          if (value == null) {
		            continue;
		          }
		          var pair = encodeURIComponent(key);
		          if ($$route$recognizer$$isArray(value)) {
		            for (var j = 0; j < value.length; j++) {
		              var arrayPair = key + '[]' + '=' + encodeURIComponent(value[j]);
		              pairs.push(arrayPair);
		            }
		          } else {
		            pair += "=" + encodeURIComponent(value);
		            pairs.push(pair);
		          }
		        }
		
		        if (pairs.length === 0) { return ''; }
		
		        return "?" + pairs.join("&");
		      },
		
		      parseQueryString: function(queryString) {
		        var pairs = queryString.split("&"), queryParams = {};
		        for(var i=0; i < pairs.length; i++) {
		          var pair      = pairs[i].split('='),
		              key       = $$route$recognizer$$decodeQueryParamPart(pair[0]),
		              keyLength = key.length,
		              isArray = false,
		              value;
		          if (pair.length === 1) {
		            value = 'true';
		          } else {
		            //Handle arrays
		            if (keyLength > 2 && key.slice(keyLength -2) === '[]') {
		              isArray = true;
		              key = key.slice(0, keyLength - 2);
		              if(!queryParams[key]) {
		                queryParams[key] = [];
		              }
		            }
		            value = pair[1] ? $$route$recognizer$$decodeQueryParamPart(pair[1]) : '';
		          }
		          if (isArray) {
		            queryParams[key].push(value);
		          } else {
		            queryParams[key] = value;
		          }
		        }
		        return queryParams;
		      },
		
		      recognize: function(path) {
		        var states = [ this.rootState ],
		            pathLen, i, l, queryStart, queryParams = {},
		            isSlashDropped = false;
		
		        queryStart = path.indexOf('?');
		        if (queryStart !== -1) {
		          var queryString = path.substr(queryStart + 1, path.length);
		          path = path.substr(0, queryStart);
		          queryParams = this.parseQueryString(queryString);
		        }
		
		        path = decodeURI(path);
		
		        if (path.charAt(0) !== "/") { path = "/" + path; }
		
		        pathLen = path.length;
		        if (pathLen > 1 && path.charAt(pathLen - 1) === "/") {
		          path = path.substr(0, pathLen - 1);
		          isSlashDropped = true;
		        }
		
		        for (i=0; i<path.length; i++) {
		          states = $$route$recognizer$$recognizeChar(states, path.charAt(i));
		          if (!states.length) { break; }
		        }
		
		        var solutions = [];
		        for (i=0; i<states.length; i++) {
		          if (states[i].handlers) { solutions.push(states[i]); }
		        }
		
		        states = $$route$recognizer$$sortSolutions(solutions);
		
		        var state = solutions[0];
		
		        if (state && state.handlers) {
		          // if a trailing slash was dropped and a star segment is the last segment
		          // specified, put the trailing slash back
		          if (isSlashDropped && state.regex.source.slice(-5) === "(.+)$") {
		            path = path + "/";
		          }
		          return $$route$recognizer$$findHandler(state, path, queryParams);
		        }
		      }
		    };
		
		    $$route$recognizer$$RouteRecognizer.prototype.map = $$route$recognizer$dsl$$default;
		
		    $$route$recognizer$$RouteRecognizer.VERSION = '0.1.11';
		
		    var $$route$recognizer$$default = $$route$recognizer$$RouteRecognizer;
		
		    /* global define:true module:true window: true */
		    if ("function" === 'function' && __webpack_require__(3)['amd']) {
		      !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return $$route$recognizer$$default; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		    } else if (typeof module !== 'undefined' && module['exports']) {
		      module['exports'] = $$route$recognizer$$default;
		    } else if (typeof this !== 'undefined') {
		      this['RouteRecognizer'] = $$route$recognizer$$default;
		    }
		}).call(this);
		
		//# sourceMappingURL=route-recognizer.js.map
		/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))
	
	/***/ },
	/* 2 */
	/***/ function(module, exports) {
	
		module.exports = function(module) {
			if(!module.webpackPolyfill) {
				module.deprecate = function() {};
				module.paths = [];
				// module.parent = undefined by default
				module.children = [];
				module.webpackPolyfill = 1;
			}
			return module;
		}
	
	
	/***/ },
	/* 3 */
	/***/ function(module, exports) {
	
		module.exports = function() { throw new Error("define cannot be used indirect"); };
	
	
	/***/ }
	/******/ ])
	});
	;
	//# sourceMappingURL=router.js.map

/***/ })
/******/ ])
});
;
//# sourceMappingURL=powerbi.js.map

/***/ })
/******/ ]);
});
//# sourceMappingURL=Library.js.map