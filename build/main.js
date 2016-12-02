module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint max-len: [2, 500, 4] */


	var _lodash = __webpack_require__(1);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _mongodb = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var dbClient = void 0;

	var MongoUtil = function () {
	  function MongoUtil(connectionString) {
	    _classCallCheck(this, MongoUtil);

	    this.connectionString = connectionString;
	  }

	  _createClass(MongoUtil, [{
	    key: 'openConnection',
	    value: function openConnection() {
	      var _this = this;

	      return new Promise(function (resolve, reject) {
	        if (!dbClient) {
	          _mongodb.MongoClient.connect(_this.connectionString, function (err, db) {
	            if (err) {
	              reject({ status: false, message: err });
	            } else {
	              dbClient = db;
	              resolve({ status: true });
	            }
	          });
	        } else {
	          reject({ status: false, message: 'DB cant be open' });
	        }
	      });
	    }
	  }, {
	    key: 'insert',
	    value: function insert(collectionName, data) {
	      return new Promise(function (resolve, reject) {
	        if (dbClient) {
	          var collection = dbClient.collection(collectionName);
	          collection.insert(data, function (err, result) {
	            if (err) {
	              reject({ status: false, message: err });
	            } else {
	              resolve({ status: true, data: result.result });
	            }
	          });
	        } else {
	          reject({ status: false, message: 'DB must be open' });
	        }
	      });
	    }
	  }, {
	    key: 'update',
	    value: function update(collectionName, data, filter, options) {
	      return new Promise(function (resolve, reject) {
	        if (dbClient) {
	          var collection = dbClient.collection(collectionName);
	          var newData = _lodash2.default.omit(data, '_id');
	          collection.update(filter || {}, { $set: newData }, options || { upsert: true }, function (err, result) {
	            if (err) {
	              resolve({ status: false, message: err });
	            } else {
	              resolve({ status: true, data: result.result });
	            }
	          });
	        } else {
	          reject({ status: false, message: 'DB must be open' });
	        }
	      });
	    }
	  }, {
	    key: 'find',
	    value: function find(collectionName, filter, options, skip, limit) {
	      return new Promise(function (resolve, reject) {
	        if (dbClient) {
	          var collection = dbClient.collection(collectionName);
	          collection.find(filter || {}, options || {}).skip(skip || 0).limit(limit || 0).toArray(function (err, documents) {
	            if (err) {
	              reject(err);
	            } else {
	              resolve(documents);
	            }
	          });
	        } else {
	          reject({ status: false, message: 'DB must be open' });
	        }
	      });
	    }
	  }, {
	    key: 'closeConnection',
	    value: function closeConnection() {
	      dbClient.close();
	    }
	  }]);

	  return MongoUtil;
	}();

	exports.default = MongoUtil;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("lodash");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("mongodb");

/***/ }
/******/ ]);