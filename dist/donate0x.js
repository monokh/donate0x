/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

const APP_PREFIX = 'data-d0x';
const DEFAULT_PROPS = {
  value: 1,
  title: 'Donate'
};

function getD0xElements() {
  return document.querySelectorAll('[' + APP_PREFIX + ']');
}

function parseProperties(el) {
  const props = {};
  for (var i = 0, atts = el.attributes, n = atts.length, arr = []; i < n; i++){
    const attr = atts[i];
    if(attr.name.indexOf(APP_PREFIX + '-') !== -1) {
      props[attr.name.split(APP_PREFIX + '-')[1]] = attr.value;
    }
  }
  if(!props.address) {
    throw new Error('[Donate0x]: data-d0x-address attribute is required');
  }
  return Object.assign({}, DEFAULT_PROPS, props);
}

function clickHandler(props) {
  console.log(props);
  web3.eth.sendTransaction({
    to: props.address,
    value: web3.toWei(props.value, 'ether')
  }, (err, tx) => {
    console.log(tx);
  });
}

function renderDonateButton(el) {
  const props = parseProperties(el);
  const button = document.createElement('button');
  button.innerText = props.title;
  button.onclick = clickHandler.bind(null, props);
  el.appendChild(button);
}

function setup() {
  const elements = getD0xElements();
  elements.forEach(renderDonateButton);
}

setup();

/***/ })
/******/ ]);