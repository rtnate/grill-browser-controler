/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/index.ts","vendors~main"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/BasicEventEmitter.ts":
/*!**********************************!*\
  !*** ./src/BasicEventEmitter.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.BasicEventEmitter = void 0;\r\nclass BasicEventEmitter {\r\n    constructor() {\r\n        this.listeners = new Array();\r\n    }\r\n    emit(arg) {\r\n        this.listeners.forEach((listener) => listener(arg));\r\n    }\r\n    subscribe(handler) {\r\n        this.listeners.push(handler);\r\n    }\r\n}\r\nexports.BasicEventEmitter = BasicEventEmitter;\r\n\n\n//# sourceURL=webpack:///./src/BasicEventEmitter.ts?");

/***/ }),

/***/ "./src/BasicTempController.ts":
/*!************************************!*\
  !*** ./src/BasicTempController.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.BasicTempController = void 0;\r\nclass BasicTempController {\r\n    constructor(comms) {\r\n        this.comms = comms;\r\n        this.fanOnSpeed = 100;\r\n        this.controlTargetTemp = 100;\r\n        this.fanDuty = 25;\r\n        this.fanCycle = 60;\r\n        this.updateListeners = Array();\r\n        this.active = false;\r\n        this.manualMode = false;\r\n        this.posH = 0;\r\n        this.negH = 0;\r\n        this.curTemp = 0;\r\n        this.lastTemp = 0;\r\n        this.setPoint = 0;\r\n    }\r\n    enable() {\r\n        this.active = true;\r\n        this.manualMode = false;\r\n        this.updated();\r\n    }\r\n    ;\r\n    disable() {\r\n        this.active = false;\r\n        this.manualMode = false;\r\n        this.updated();\r\n    }\r\n    ;\r\n    manual() {\r\n        this.active = false;\r\n        this.manualMode = true;\r\n        this.updated();\r\n    }\r\n    get positiveHys() { return this.posH; }\r\n    ;\r\n    set positiveHys(val) {\r\n        this.posH = val;\r\n        this.updated();\r\n    }\r\n    get negativeHys() { return this.negH; }\r\n    ;\r\n    set negativeHys(val) {\r\n        this.negH = val;\r\n        this.updated();\r\n    }\r\n    get enabled() { return this.active; }\r\n    ;\r\n    get isManual() { return this.manualMode; }\r\n    ;\r\n    set fanSpeed(speed) {\r\n        let numSpeed = speed;\r\n        if (numSpeed === NaN)\r\n            return;\r\n        if (numSpeed <= 0)\r\n            numSpeed = 0;\r\n        if (numSpeed >= 1000)\r\n            numSpeed = 1000;\r\n        this.fanOnSpeed = numSpeed;\r\n        this.updated();\r\n    }\r\n    get fanSpeed() { return this.fanOnSpeed; }\r\n    ;\r\n    set targetTemp(temp) {\r\n        if (temp === NaN)\r\n            return;\r\n        if (temp <= 0)\r\n            temp = 0;\r\n        if (temp >= 400)\r\n            temp = 400;\r\n        this.controlTargetTemp = temp;\r\n        this.updated();\r\n    }\r\n    get targetTemp() { return this.controlTargetTemp; }\r\n    ;\r\n    set onTime(time) {\r\n        if (time === NaN)\r\n            return;\r\n        if (time <= 0)\r\n            time = 0;\r\n        if (time >= this.fanCycle) {\r\n            this.fanDuty = 100;\r\n            return;\r\n        }\r\n        let fract = time / this.fanCycle;\r\n        this.fanDuty = fract * 100;\r\n        this.updated();\r\n    }\r\n    get onTime() { return this.fanDuty / 100 * this.fanCycle; }\r\n    ;\r\n    set cycleTime(time) {\r\n        if (time === NaN)\r\n            return;\r\n        if (time <= 0)\r\n            time = 0;\r\n        if (time >= 600)\r\n            time = 600;\r\n        this.fanCycle = time;\r\n        this.updated();\r\n    }\r\n    get cycleTime() { return this.fanCycle; }\r\n    ;\r\n    onSetButtonClick(event) {\r\n        let id = event.id;\r\n        switch (id) {\r\n            case 'ControlTempSelection':\r\n                this.targetTemp = parseFloat(event.value);\r\n                break;\r\n            case 'ControlFanSpeedSelection':\r\n                this.fanSpeed = parseFloat(event.value);\r\n                break;\r\n            case 'ControlDutyCycleSelectionOn':\r\n                let dutyOn = parseFloat(event.value);\r\n                let ip = document.getElementById('ControlDutyCycleSelectionCycle');\r\n                if (ip) {\r\n                    let value = ip.value;\r\n                    this.cycleTime = parseFloat(value);\r\n                }\r\n                this.onTime = dutyOn;\r\n                break;\r\n            case 'ControlPositiveHSetting':\r\n                this.positiveHys = parseFloat(event.value);\r\n                break;\r\n            case 'ControlNegativeHSetting':\r\n                this.negativeHys = parseFloat(event.value);\r\n                break;\r\n        }\r\n        if (this.manualMode == true) {\r\n            this.turnOnFan();\r\n        }\r\n    }\r\n    onUpdate(handler) {\r\n        this.updateListeners.push(handler);\r\n    }\r\n    newTemperature(temp) {\r\n        this.curTemp = temp;\r\n        if (this.active)\r\n            this.control(temp);\r\n        this.lastTemp = temp;\r\n    }\r\n    control(currentTemp) {\r\n        let change = currentTemp - this.lastTemp;\r\n        var setPoint = this.targetTemp;\r\n        //IF TEMPERATURE IS INCREASING\r\n        if (change > 0) {\r\n            //Set Point is the target less positive going hysteresis\r\n            this.setPoint = this.targetTemp - this.posH;\r\n        }\r\n        //IF TEMPERATURE IS DECREASING \r\n        else if (change < 0) {\r\n            //Set Point is the target less negative going hysteresis\r\n            this.setPoint = this.targetTemp + this.negH;\r\n        }\r\n        //IF TEMPERATURE IS NOT CHANGING, SET POINT DOES NOT MOVE\r\n        else { }\r\n        if (currentTemp < setPoint)\r\n            this.turnOnFan();\r\n        else\r\n            this.turnOffFan();\r\n    }\r\n    turnOnFan() {\r\n        if (this.comms.connectionActive)\r\n            this.comms.setFan(this.fanSpeed, this.fanDuty, this.fanCycle);\r\n    }\r\n    turnOffFan() {\r\n        if (this.comms.connectionActive)\r\n            this.comms.setFan(0, this.fanDuty, this.fanCycle);\r\n    }\r\n    updated() {\r\n        this.updateListeners.forEach((listener) => listener(this));\r\n    }\r\n    getState() {\r\n        let val = {\r\n            fanOnSpeed: this.fanOnSpeed,\r\n            controlTargetTemp: this.controlTargetTemp,\r\n            fanDuty: this.fanDuty,\r\n            fanCycle: this.fanCycle,\r\n            active: this.active,\r\n            manualMode: this.manualMode,\r\n            posH: this.posH,\r\n            negH: this.negH,\r\n            curTemp: this.curTemp,\r\n            lastTemp: this.lastTemp,\r\n        };\r\n        return val;\r\n    }\r\n    loadState(state) {\r\n        if (state.hasOwnProperty('fanOnSpeed'))\r\n            this.fanOnSpeed = state.fanOnSpeed;\r\n        if (state.hasOwnProperty('controlTargetTemp'))\r\n            this.controlTargetTemp = state.controlTargetTemp;\r\n        if (state.hasOwnProperty('fanDuty'))\r\n            this.fanDuty = state.fanDuty;\r\n        if (state.hasOwnProperty('fanCycle'))\r\n            this.fanCycle = state.fanCycle;\r\n        if (state.hasOwnProperty('active'))\r\n            this.active = state.active;\r\n        if (state.hasOwnProperty('manualMode'))\r\n            this.manualMode = state.manualMode;\r\n        if (state.hasOwnProperty('posH'))\r\n            this.posH = state.posH;\r\n        if (state.hasOwnProperty('negH'))\r\n            this.negH = state.negH;\r\n        if (state.hasOwnProperty('curTemp'))\r\n            this.curTemp = state.curTemp;\r\n        if (state.hasOwnProperty('lastTemp'))\r\n            this.lastTemp = state.lastTemp;\r\n        this.updated();\r\n    }\r\n}\r\nexports.BasicTempController = BasicTempController;\r\n\n\n//# sourceURL=webpack:///./src/BasicTempController.ts?");

/***/ }),

/***/ "./src/Elements/EventEmitter.ts":
/*!**************************************!*\
  !*** ./src/Elements/EventEmitter.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.EventEmitter = void 0;\r\nclass EventEmitter {\r\n    constructor() {\r\n        this.callbacks = {};\r\n    }\r\n    on(event, callback) {\r\n        if (!this.callbacks[event])\r\n            this.callbacks[event] = [];\r\n        this.callbacks[event].push(callback);\r\n    }\r\n    emit(event, data) {\r\n        let cbs = this.callbacks[event];\r\n        if (cbs) {\r\n            cbs.forEach((cb) => {\r\n                cb(data);\r\n            });\r\n        }\r\n    }\r\n}\r\nexports.EventEmitter = EventEmitter;\r\n\n\n//# sourceURL=webpack:///./src/Elements/EventEmitter.ts?");

/***/ }),

/***/ "./src/GrillCommunicator.ts":
/*!**********************************!*\
  !*** ./src/GrillCommunicator.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.GrillCommunicator = void 0;\r\nclass GrillCommunicator {\r\n    constructor() {\r\n        this.ip = \"\";\r\n        this.successfulConnection = false;\r\n        this.hasConnected = false;\r\n        this.failCount = 0;\r\n    }\r\n    onSetButtonClick(event) {\r\n        let id = event.id;\r\n        if (id == 'StatusGrillIPSelection')\r\n            this.setIP(event.value);\r\n    }\r\n    get connectionActive() {\r\n        return this.successfulConnection;\r\n    }\r\n    setFan(speed, duty = 100, cycle_rate = 60) {\r\n        if (!this.connectionActive)\r\n            return Promise.reject('No Active Connection');\r\n        return this.reqFanSpeed(speed, duty, cycle_rate);\r\n        // return new Promise((resolve, reject) => {\r\n        //     rthis.reqFanSpeed(speed);\r\n        // });\r\n    }\r\n    getGrillStatus() {\r\n        if (!this.successfulConnection)\r\n            return Promise.reject(\"Grill communcation not established\");\r\n        return new Promise((resolve, reject) => {\r\n            this.reqGrillStatus().then((data) => {\r\n                resolve(data);\r\n            }).catch((error) => {\r\n                this.failCount++;\r\n                if (this.failCount > 5) {\r\n                    console.error(\"Status Update Failed: \", error);\r\n                    this.commsFailed(this.ip);\r\n                    reject(error);\r\n                }\r\n                else\r\n                    resolve(null);\r\n            });\r\n        });\r\n    }\r\n    reqFanSpeed(speed, duty = 100, cycle_rate = 60) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            let body = {\r\n                speed: speed,\r\n                duty_cycle: duty,\r\n                cycle_rate: cycle_rate\r\n            };\r\n            return this.makeRequest('fan', 'POST', body);\r\n        });\r\n    }\r\n    reqGrillStatus() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            let response = yield this.makeRequest('status');\r\n            return response.json();\r\n        });\r\n    }\r\n    setIP(ip) {\r\n        this.ip = ip;\r\n        this.testRequest().then(() => this.commsSuccessful(ip)).catch(() => this.commsFailed(ip));\r\n    }\r\n    updateMessage(message) {\r\n        let el = document.getElementById('StatusGrillConnection');\r\n        if (!el)\r\n            return;\r\n        if (this.successfulConnection) {\r\n            el.classList.remove(\"connection-failed\");\r\n            el.classList.add(\"connection-successful\");\r\n        }\r\n        else {\r\n            el.classList.remove(\"connection-failed\");\r\n            el.classList.add(\"connection-successful\");\r\n        }\r\n        el.innerHTML = message;\r\n    }\r\n    updateStatus(message) {\r\n        let el = document.getElementById('StatusGrillConnectionState');\r\n        if (!el)\r\n            return;\r\n        let ip = el;\r\n        ip.value = message;\r\n        if (message == 'CONNECTED') {\r\n            ip.classList.add('text-success');\r\n            ip.classList.remove('text-danger');\r\n        }\r\n        else if (message == 'DISCONNECTED') {\r\n            ip.classList.remove('text-success');\r\n            ip.classList.remove('text-danger');\r\n        }\r\n        else {\r\n            ip.classList.remove('text-success');\r\n            ip.classList.add('text-danger');\r\n        }\r\n    }\r\n    commsSuccessful(ip) {\r\n        this.failCount = 0;\r\n        this.successfulConnection = true;\r\n        if (!this.hasConnected)\r\n            this.hasConnected = true;\r\n        this.updateMessage((\"Grill Connected at \" + ip));\r\n        this.updateStatus('CONNECTED');\r\n    }\r\n    commsFailed(ip) {\r\n        this.successfulConnection = false;\r\n        if (this.hasConnected) {\r\n            this.updateMessage('Grill Connection to' + ip + 'lost!');\r\n            this.updateStatus('LOST');\r\n        }\r\n        else {\r\n            this.updateMessage((\"Grill failed to connect at \" + ip));\r\n            this.updateStatus('DISCONNECTED');\r\n        }\r\n    }\r\n    testRequest() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            let response = yield this.makeRequest('');\r\n            return response.status;\r\n        });\r\n    }\r\n    makeRequest(endpoint, method = null, body = null) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            let opts = {};\r\n            if (body)\r\n                opts.body = JSON.stringify(body);\r\n            if (method)\r\n                opts.method = method;\r\n            if (endpoint === '/')\r\n                endpoint = '';\r\n            let url = `http://${this.ip}/${endpoint}`;\r\n            return fetch(url, opts);\r\n        });\r\n    }\r\n}\r\nexports.GrillCommunicator = GrillCommunicator;\r\n\n\n//# sourceURL=webpack:///./src/GrillCommunicator.ts?");

/***/ }),

/***/ "./src/GrillController.ts":
/*!********************************!*\
  !*** ./src/GrillController.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.GrillController = void 0;\r\nconst EventEmitter_1 = __webpack_require__(/*! ./Elements/EventEmitter */ \"./src/Elements/EventEmitter.ts\");\r\nconst GrillStatus_1 = __webpack_require__(/*! ./GrillStatus */ \"./src/GrillStatus.ts\");\r\nconst GrillCommunicator_1 = __webpack_require__(/*! ./GrillCommunicator */ \"./src/GrillCommunicator.ts\");\r\nconst BasicTempController_1 = __webpack_require__(/*! ./BasicTempController */ \"./src/BasicTempController.ts\");\r\nconst TempLogger_1 = __webpack_require__(/*! ./TempLogger */ \"./src/TempLogger.ts\");\r\nconst GrillPIDController_1 = __webpack_require__(/*! ./GrillPIDController */ \"./src/GrillPIDController.ts\");\r\n;\r\nclass GrillController {\r\n    constructor() {\r\n        this.setEvents = new EventEmitter_1.EventEmitter();\r\n        this.grillComms = new GrillCommunicator_1.GrillCommunicator;\r\n        this.status = new GrillStatus_1.GrillStatus(this.grillComms);\r\n        this.basicController = new BasicTempController_1.BasicTempController(this.grillComms);\r\n        this.pidController = new GrillPIDController_1.GrillPIDController(this.grillComms);\r\n        this.logger = new TempLogger_1.TempLogger;\r\n        this.status.onUpdate((status) => this.updateStatus(status));\r\n        this.basicController.onUpdate((controller) => this.updateControllerStatus(controller));\r\n        this.pidController.onChange((event) => this.pidValueChanged(event));\r\n        this.setEvents.on('set', (event) => this.basicController.onSetButtonClick(event));\r\n        this.setEvents.on('set', (event) => this.grillComms.onSetButtonClick(event));\r\n        this.setEvents.on('set', (event) => this.onSetButtonClick(event));\r\n        this.setEvents.on('set', (event) => this.pidController.onSetButtonClick(event));\r\n    }\r\n    boot() {\r\n        console.log(\"Grill Controller Booting....\");\r\n        let buttons = document.querySelectorAll('.set-button');\r\n        buttons.forEach((button) => {\r\n            if (!button)\r\n                return;\r\n            if (button.tagName === \"BUTTON\") {\r\n                button.onclick = (event) => this.setButtonClicked(button, event);\r\n            }\r\n        });\r\n        this.loadControllerStatus();\r\n        this.status.enableAutoUpdate(2000);\r\n        console.log(\"Grill Controller Booted.\");\r\n    }\r\n    setButtonClicked(button, event) {\r\n        var target = button.dataset.target;\r\n        if (!target)\r\n            return;\r\n        var ip = document.getElementById(target);\r\n        if (!ip)\r\n            return;\r\n        let input;\r\n        if (ip.tagName == \"INPUT\") {\r\n            input = ip;\r\n        }\r\n        else if (ip.tagName == \"SELECT\") {\r\n            input = ip;\r\n        }\r\n        else\r\n            return;\r\n        var val = input.value;\r\n        this.setEvents.emit('set', {\r\n            button: button,\r\n            input: input,\r\n            event: event,\r\n            id: target,\r\n            value: val\r\n        });\r\n    }\r\n    onSetButtonClick(event) {\r\n        if (event.id == 'ControlModeSelection') {\r\n            let val = parseInt(event.value);\r\n            switch (val) {\r\n                case 0:\r\n                    this.basicController.disable();\r\n                    this.pidController.disable();\r\n                    break;\r\n                case 1:\r\n                    this.basicController.manual();\r\n                    this.pidController.disable();\r\n                    break;\r\n                case 2:\r\n                    this.basicController.enable();\r\n                    this.pidController.disable();\r\n                    break;\r\n                case 3:\r\n                    this.basicController.disable();\r\n                    this.pidController.enable();\r\n                    break;\r\n            }\r\n            let state = this.getControllerStateDisplay();\r\n            this.setInputValueById('ControlCurrentMode', state);\r\n        }\r\n    }\r\n    getTemperatureString(value) {\r\n        if (value <= -20)\r\n            return '---';\r\n        else if (value >= 750)\r\n            return 'MAX';\r\n        else\r\n            return value + \" °F\";\r\n    }\r\n    updateStatus(status) {\r\n        console.log(\"Updated\");\r\n        let temp = status.currentTemp;\r\n        this.updateTemperatures(temp);\r\n        let tempString = this.getTemperatureString(temp);\r\n        let fanSpeed = status.fanSpeed ? status.fanSpeed.toString() : 'OFF';\r\n        let fanStatus = status.fanStatus ? 'ON' : 'OFF';\r\n        this.updateFanGraphicDisplay(status.fanStatus, status.fanSpeed);\r\n        let dutyCycle = `${status.fanOnTime.toString()}s per ${status.fanCycleTime.toString()}s`;\r\n        this.updateMainTempDisplay(temp, tempString);\r\n        this.setInputValueById('StatusCurrentTemp', tempString);\r\n        this.setInputValueById('StatusFanState', fanStatus);\r\n        this.setInputValueById('StatusFanSpeed', fanSpeed);\r\n        this.setInputValueById('StatusFanDutyCycle', dutyCycle);\r\n    }\r\n    updateMainTempDisplay(temp, display) {\r\n        let el = document.getElementById('MainTempDisplay');\r\n        if (!el)\r\n            return;\r\n        let ip = el;\r\n        let target = this.basicController.targetTemp;\r\n        if (this.pidController.isEnabled)\r\n            target = this.pidController.target;\r\n        if (temp > target) {\r\n            ip.classList.add('text-danger');\r\n            ip.classList.remove('text-success');\r\n        }\r\n        else {\r\n            ip.classList.add('text-success');\r\n            ip.classList.remove('text-danger');\r\n        }\r\n        ip.value = display;\r\n    }\r\n    updateTemperatures(newTemp) {\r\n        this.basicController.newTemperature(newTemp);\r\n        this.pidController.processTemperature(newTemp);\r\n        let target = this.basicController.targetTemp;\r\n        if (this.pidController.isEnabled)\r\n            target = this.pidController.target;\r\n        this.logger.logGrillTemp(newTemp, target);\r\n        this.logger.plotData('Logger');\r\n    }\r\n    updateFanGraphicDisplay(fanStatus, fanSpeed) {\r\n        if (fanSpeed) {\r\n            let animationSpeed = (fanSpeed - 0) * (.25 - .8) / (1023 - 0) + .25;\r\n            let el = document.getElementById('StatusFanImage');\r\n            if (el) {\r\n                el.classList.add('fan-on');\r\n                el.style.animationDuration = animationSpeed.toString() + 's';\r\n                if (!fanStatus)\r\n                    el.style.animationDuration = '3s';\r\n            }\r\n        }\r\n        else {\r\n            let el = document.getElementById('StatusFanImage');\r\n            if (el) {\r\n                el.classList.remove('fan-on');\r\n                el.style.animationDuration = '0s';\r\n            }\r\n        }\r\n    }\r\n    updateControllerStatus(controller) {\r\n        let targetTemp = controller.targetTemp;\r\n        let fanSpeed = controller.fanSpeed;\r\n        let dutyOn = controller.onTime;\r\n        let dutyCycle = controller.cycleTime;\r\n        let dutyString = dutyOn.toString() + 's per ' + dutyCycle.toString() + 's';\r\n        let tempString = targetTemp.toString() + \" °F\";\r\n        let state = this.getControllerStateDisplay();\r\n        this.setInputValueById('ControlCurrentMode', state);\r\n        this.setInputValueById('MainTargetDisplay', tempString);\r\n        this.setInputValueById('ControlCurrentTargetTemp', tempString);\r\n        this.setInputValueById('ControlCurrentFanSpeed', fanSpeed.toString());\r\n        this.setInputValueById('ControlCurrentDutyCycle', dutyString);\r\n        this.setInputValueById('ControlCurrentPositiveH', controller.positiveHys.toString());\r\n        this.setInputValueById('ControlCurrentNegativeH', controller.negativeHys.toString());\r\n        this.storeControllerStatus();\r\n    }\r\n    storeControllerStatus() {\r\n        let status = this.basicController.getState();\r\n        let data = {\r\n            basicController: status\r\n        };\r\n        let dataString = JSON.stringify(data);\r\n        localStorage.setItem('bbq-data', dataString);\r\n    }\r\n    loadControllerStatus() {\r\n        let dataString = localStorage.getItem('bbq-data');\r\n        if (dataString) {\r\n            try {\r\n                let data = JSON.parse(dataString);\r\n                if (data.hasOwnProperty('basicController')) {\r\n                    this.basicController.loadState(data.basicController);\r\n                }\r\n            }\r\n            catch (e) {\r\n                console.error(\"Couldn't load controller state.\", e);\r\n            }\r\n        }\r\n    }\r\n    getControllerStateDisplay() {\r\n        if (this.basicController.enabled)\r\n            return 'STANDARD';\r\n        else if (this.pidController.isEnabled)\r\n            return 'PID';\r\n        else if (this.basicController.isManual)\r\n            return 'MANUAL';\r\n        else\r\n            return 'DISABLED';\r\n    }\r\n    controllerUpdate() {\r\n    }\r\n    setInputValueById(id, newValue) {\r\n        let el = document.getElementById(id);\r\n        if (!el)\r\n            return;\r\n        if (el.tagName === 'INPUT') {\r\n            let input = el;\r\n            input.value = newValue;\r\n        }\r\n    }\r\n    pidValueChanged(event) {\r\n        var display = '';\r\n        switch (event.parameter) {\r\n            case 'P':\r\n            case 'I':\r\n            case 'D':\r\n                display = 'P: ' + this.pidController.P.toPrecision(2) + ' ';\r\n                display += 'I: ' + this.pidController.I.toPrecision(2) + ' ';\r\n                display += 'D: ' + this.pidController.D.toPrecision(2);\r\n                this.setInputValueById('PidCurrentGains', display);\r\n                return;\r\n            case 'fanSpeedMin':\r\n            case 'fanSpeedMax':\r\n                display = 'Min: ' + this.pidController.fanSpeedMin.toString() + ' ';\r\n                display += 'Max: ' + this.pidController.fanSpeedMax.toString();\r\n                this.setInputValueById('PidCurrentFanSpeeds', display);\r\n                return;\r\n            case 'Output':\r\n                display = 'P: ' + this.pidController.PState.toPrecision(2) + ' ';\r\n                display += 'I: ' + this.pidController.IState.toPrecision(2) + ' ';\r\n                display += 'D: ' + this.pidController.DState.toPrecision(2);\r\n                this.setInputValueById('PidCurrentState', display);\r\n                var output = this.pidController.output;\r\n                this.setInputValueById('PidCurrentOutput', output.toString());\r\n                return;\r\n            case 'fanSpeedOut':\r\n                var speed = this.pidController.fanSpeedOut;\r\n                this.setInputValueById('PidOutputFanSpeed', speed.toString());\r\n                var dutyOn = this.pidController.fanCycleOn;\r\n                var dutyOff = this.pidController.fanCycleOut;\r\n                var dutyString = dutyOn.toString() + 's per' + dutyOff.toString() + 's';\r\n                this.setInputValueById('PidOutputFanDuty', dutyString);\r\n                return;\r\n        }\r\n    }\r\n}\r\nexports.GrillController = GrillController;\r\n\n\n//# sourceURL=webpack:///./src/GrillController.ts?");

/***/ }),

/***/ "./src/GrillPIDController.ts":
/*!***********************************!*\
  !*** ./src/GrillPIDController.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.GrillPIDController = void 0;\r\nconst PIDController_1 = __webpack_require__(/*! ./PIDController */ \"./src/PIDController.ts\");\r\nclass GrillPIDController extends PIDController_1.PIDControler {\r\n    constructor(comms) {\r\n        super();\r\n        this.comms = comms;\r\n        this.controlMasterScale = 0.5;\r\n        this.maxSpeed = 400;\r\n        this.minSpeed = 100;\r\n        this.maxCycle = 30;\r\n        this.enabled = false;\r\n        this.outputSpeed = 0;\r\n        this.outputDuty = 0;\r\n        this.outputCycle = 0;\r\n    }\r\n    enable() {\r\n        this.enabled = true;\r\n    }\r\n    disable() {\r\n        this.enabled = false;\r\n    }\r\n    get isEnabled() { return this.enabled; }\r\n    ;\r\n    get fanSpeedMax() {\r\n        return this.maxSpeed;\r\n    }\r\n    set fanSpeedMax(value) {\r\n        this.maxSpeed = value;\r\n        this.changed('fanSpeedMax', value);\r\n    }\r\n    get fanSpeedMin() {\r\n        return this.minSpeed;\r\n    }\r\n    set fanSpeedMin(value) {\r\n        this.minSpeed = value;\r\n        this.changed('fanSpeedMax', value);\r\n    }\r\n    get fanSpeedOut() { return this.outputSpeed; }\r\n    ;\r\n    get fanDutyOut() { return this.outputDuty; }\r\n    ;\r\n    get fanCycleOn() { return (this.fanDutyOut / 100) * this.fanCycleOut; }\r\n    ;\r\n    get fanCycleOut() { return this.outputCycle; }\r\n    ;\r\n    processTemperature(newTemp) {\r\n        let controlVal = this.calculate(newTemp);\r\n        controlVal = this.mapControlVal(controlVal);\r\n        this.outputSpeed = this.mapFanSpeed(controlVal);\r\n        let cycleOn = this.mapDutyCycle(controlVal);\r\n        this.outputCycle = 60;\r\n        this.outputDuty = (cycleOn / this.outputCycle) * 100;\r\n        this.changed('fanSpeedOut', this.outputSpeed);\r\n        if (this.isEnabled)\r\n            this.comms.setFan(this.outputSpeed, this.outputDuty, this.outputCycle);\r\n    }\r\n    mapControlVal(value) {\r\n        value *= this.controlMasterScale;\r\n        if (value >= 1)\r\n            value = 1;\r\n        if (value <= 0)\r\n            value = 0;\r\n        return value;\r\n    }\r\n    mapFanSpeed(value) {\r\n        const in_min = 0;\r\n        const in_max = 1;\r\n        const out_min = this.fanSpeedMin;\r\n        const out_max = this.fanSpeedMax;\r\n        return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;\r\n    }\r\n    mapDutyCycle(value) {\r\n        const in_min = 0;\r\n        const in_max = 1;\r\n        const out_min = 10;\r\n        const out_max = 30;\r\n        return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;\r\n    }\r\n    onSetButtonClick(event) {\r\n        let id = event.id;\r\n        switch (id) {\r\n            case 'PidGainSelection':\r\n                this.P = parseFloat(event.value);\r\n                return;\r\n            case 'PidResetSelection':\r\n                this.I = parseFloat(event.value);\r\n                return;\r\n            case 'PidRateSelection':\r\n                this.D = parseFloat(event.value);\r\n                return;\r\n            case 'PidMinFanSpeedSelection':\r\n                this.fanSpeedMin = parseFloat(event.value);\r\n                return;\r\n            case 'PidMaxFanSpeedSelection':\r\n                this.fanSpeedMax = parseFloat(event.value);\r\n                return;\r\n            case 'ControlTempSelection':\r\n                this.target = parseFloat(event.value);\r\n            default:\r\n                return;\r\n        }\r\n    }\r\n}\r\nexports.GrillPIDController = GrillPIDController;\r\n\n\n//# sourceURL=webpack:///./src/GrillPIDController.ts?");

/***/ }),

/***/ "./src/GrillStatus.ts":
/*!****************************!*\
  !*** ./src/GrillStatus.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.GrillStatus = void 0;\r\nconst TempatureConverter_1 = __webpack_require__(/*! ./TempatureConverter */ \"./src/TempatureConverter.ts\");\r\nclass GrillStatus {\r\n    constructor(comms) {\r\n        this.comms = comms;\r\n        this.currentCycleTime = 0;\r\n        this.currentOnTime = 0;\r\n        this.currentFanSpeed = 0;\r\n        this.currentFanState = false;\r\n        this.grillTemp = 0;\r\n        this.dummyTemp = 0;\r\n        this.auto = 0;\r\n        this.updateHandlers = Array();\r\n    }\r\n    get currentTemp() {\r\n        let temp = this.grillTemp.toFixed(2);\r\n        return parseFloat(temp);\r\n    }\r\n    get fanStatus() {\r\n        return this.currentFanState;\r\n    }\r\n    get fanSpeed() {\r\n        return this.currentFanSpeed;\r\n    }\r\n    get fanOnTime() {\r\n        return this.currentOnTime / 100;\r\n    }\r\n    get fanCycleTime() {\r\n        return this.currentCycleTime;\r\n    }\r\n    onUpdate(handler) {\r\n        this.updateHandlers.push(handler);\r\n    }\r\n    enableAutoUpdate(timeout) {\r\n        this.auto = setInterval(() => this.update(), timeout);\r\n    }\r\n    disableAutoUpdate() {\r\n        if (this.auto)\r\n            clearInterval(this.auto);\r\n    }\r\n    update() {\r\n        if (!this.comms.connectionActive)\r\n            return;\r\n        this.comms.getGrillStatus().then((data) => {\r\n            if (data) {\r\n                this.loadNewStatus(data);\r\n                this.updated();\r\n            }\r\n        });\r\n    }\r\n    loadNewStatus(data) {\r\n        if (data.hasOwnProperty('fan_duty') && data.hasOwnProperty('fan_cycle')) {\r\n            this.currentCycleTime = data.fan_cycle;\r\n            this.currentOnTime = data.fan_cycle * data.fan_duty;\r\n        }\r\n        if (data.hasOwnProperty('fan_speed')) {\r\n            this.currentFanSpeed = data.fan_speed;\r\n        }\r\n        if (data.hasOwnProperty('fan_status')) {\r\n            this.currentFanState = data.fan_status;\r\n        }\r\n        if (data.hasOwnProperty('temp_probe_raw')) {\r\n            let adc = data.temp_probe_raw;\r\n            let temp = TempatureConverter_1.GetTemperatureFromADCValue(adc, 'F');\r\n            this.grillTemp = temp;\r\n        }\r\n    }\r\n    updated() {\r\n        this.updateHandlers.forEach((handler) => handler(this));\r\n    }\r\n}\r\nexports.GrillStatus = GrillStatus;\r\n\n\n//# sourceURL=webpack:///./src/GrillStatus.ts?");

/***/ }),

/***/ "./src/PIDController.ts":
/*!******************************!*\
  !*** ./src/PIDController.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.PIDControler = void 0;\r\nconst BasicEventEmitter_1 = __webpack_require__(/*! ./BasicEventEmitter */ \"./src/BasicEventEmitter.ts\");\r\nclass PIDControler {\r\n    constructor() {\r\n        this.lastError = 0;\r\n        this.cumError = 0;\r\n        this.gP = 0.0;\r\n        this.gI = 0.0;\r\n        this.gD = 0.0;\r\n        this.setPoint = 0;\r\n        this.lastControlVal = 0;\r\n        this.lastRateError = 0;\r\n        this.startTime = new Date;\r\n        this.previousTime = new Date;\r\n        this.changedEvent = new BasicEventEmitter_1.BasicEventEmitter();\r\n    }\r\n    get P() {\r\n        return this.gP;\r\n    }\r\n    set P(value) {\r\n        this.gP = value;\r\n        this.changed('P', value);\r\n    }\r\n    get I() {\r\n        return this.gI;\r\n    }\r\n    set I(value) {\r\n        this.gI = value;\r\n        this.changed('I', value);\r\n    }\r\n    get D() {\r\n        return this.gD;\r\n    }\r\n    set D(value) {\r\n        this.gD = value;\r\n        this.changed('D', value);\r\n    }\r\n    get target() {\r\n        return this.setPoint;\r\n    }\r\n    set target(value) {\r\n        this.setPoint = value;\r\n        this.changed('target', value);\r\n    }\r\n    get PState() { return this.lastError; }\r\n    ;\r\n    get IState() { return this.cumError; }\r\n    ;\r\n    get DState() { return this.lastRateError; }\r\n    ;\r\n    get output() { return this.lastControlVal; }\r\n    ;\r\n    calculate(input) {\r\n        let now = new Date().getTime();\r\n        let elapsedTime = (now - this.previousTime.getTime()) / 1000;\r\n        let error = this.setPoint - input;\r\n        let cumError = error * elapsedTime;\r\n        this.cumError += cumError;\r\n        let rateError = (error - this.lastError) / elapsedTime;\r\n        let output = error * this.gP + this.cumError * this.gI + rateError * this.gD;\r\n        this.lastError = error;\r\n        this.lastControlVal = output;\r\n        this.lastRateError = rateError;\r\n        this.changed('IState', this.cumError);\r\n        this.changed('PState', error);\r\n        this.changed('DState', this.lastRateError);\r\n        this.changed('Output', this.lastControlVal);\r\n        return output;\r\n    }\r\n    onChange(handler) {\r\n        this.changedEvent.subscribe(handler);\r\n    }\r\n    changed(parameter, value) {\r\n        this.changedEvent.emit({ parameter: parameter, value: value });\r\n    }\r\n}\r\nexports.PIDControler = PIDControler;\r\n\n\n//# sourceURL=webpack:///./src/PIDController.ts?");

/***/ }),

/***/ "./src/TempLogger.ts":
/*!***************************!*\
  !*** ./src/TempLogger.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\r\n}) : (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    o[k2] = m[k];\r\n}));\r\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\r\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\r\n}) : function(o, v) {\r\n    o[\"default\"] = v;\r\n});\r\nvar __importStar = (this && this.__importStar) || function (mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\r\n    __setModuleDefault(result, mod);\r\n    return result;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.TempLogger = exports.TempDataTrace = void 0;\r\nconst Plotly = __importStar(__webpack_require__(/*! plotly.js */ \"./node_modules/plotly.js/lib/index.js\"));\r\nclass TempDataTrace {\r\n    constructor() {\r\n        this.timestamps = Array();\r\n        this.temperatures = Array();\r\n        this.target = Array();\r\n    }\r\n    add(temp, target) {\r\n        this.timestamps.push(new Date);\r\n        this.target.push(target);\r\n        this.temperatures.push(temp);\r\n    }\r\n}\r\nexports.TempDataTrace = TempDataTrace;\r\nclass TempLogger {\r\n    constructor() {\r\n        this.startTime = new Date;\r\n        this.grillTempData = new TempDataTrace;\r\n        this.targetTempData = new TempDataTrace;\r\n        this.dataRevision = 0;\r\n        this.timer = 0;\r\n    }\r\n    logGrillTemp(temp, target) {\r\n        this.grillTempData.add(temp, target);\r\n    }\r\n    plotData(target) {\r\n        let trace = this.grillTempData;\r\n        this.dataRevision++;\r\n        let rev = this.dataRevision;\r\n        let layout = { title: 'Temperature', datarevision: rev };\r\n        if (this.timer == 0) {\r\n            let traceA = {\r\n                x: this.grillTempData.timestamps,\r\n                y: this.grillTempData.temperatures,\r\n                type: 'scatter',\r\n                name: 'Grill Temperature'\r\n            };\r\n            let traceB = {\r\n                x: this.grillTempData.timestamps,\r\n                y: this.grillTempData.target,\r\n                type: 'scatter',\r\n                name: 'Target Temperature'\r\n            };\r\n            Plotly.react(target, [traceA, traceB], layout, { responsive: true });\r\n        }\r\n        this.timer = (this.timer + 1) % 8;\r\n    }\r\n}\r\nexports.TempLogger = TempLogger;\r\n\n\n//# sourceURL=webpack:///./src/TempLogger.ts?");

/***/ }),

/***/ "./src/TempatureConverter.ts":
/*!***********************************!*\
  !*** ./src/TempatureConverter.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.GetTemperatureFromADCValue = void 0;\r\nconst adc_table = [736.8, 564.2, 441.7, 386.7, 353.1, 329.7, 312.1, 298.1,\r\n    286.6, 276.9, 268.6, 261.4, 254.9, 249.2, 244.1, 239.4,\r\n    235.1, 231.1, 227.5, 224.1, 220.9, 218, 215.2, 212.6,\r\n    210.1, 207.8, 205.6, 203.5, 201.5, 199.6, 197.7, 196,\r\n    194.3, 192.7, 191.2, 189.7, 188.2, 186.9, 185.5, 184.2,\r\n    183, 181.8, 180.6, 179.5, 178.4, 177.3, 176.3, 175.2,\r\n    174.3, 173.3, 172.4, 171.5, 170.6, 169.7, 168.9, 168,\r\n    167.2, 166.5, 165.7, 164.9, 164.2, 163.5, 162.8, 162.1,\r\n    161.4, 160.7, 160.1, 159.5, 158.8, 158.2, 157.6, 157,\r\n    156.4, 155.9, 155.3, 154.8, 154.2, 153.7, 153.2, 152.6,\r\n    152.1, 151.6, 151.1, 150.6, 150.2, 149.7, 149.2, 148.8,\r\n    148.3, 147.9, 147.4, 147, 146.6, 146.2, 145.8, 145.3,\r\n    144.9, 144.5, 144.1, 143.8, 143.4, 143, 142.6, 142.3,\r\n    141.9, 141.5, 141.2, 140.8, 140.5, 140.1, 139.8, 139.5,\r\n    139.1, 138.8, 138.5, 138.1, 137.8, 137.5, 137.2, 136.9,\r\n    136.6, 136.3, 136, 135.7, 135.4, 135.1, 134.8, 134.5,\r\n    134.2, 134, 133.7, 133.4, 133.1, 132.9, 132.6, 132.3,\r\n    132.1, 131.8, 131.6, 131.3, 131.1, 130.8, 130.6, 130.3,\r\n    130.1, 129.8, 129.6, 129.4, 129.1, 128.9, 128.7, 128.4,\r\n    128.2, 128, 127.7, 127.5, 127.3, 127.1, 126.9, 126.6,\r\n    126.4, 126.2, 126, 125.8, 125.7, 125.5, 125.3, 125.1,\r\n    125, 124.8, 124.6, 124.5, 124.2, 123.9, 123.7, 123.4,\r\n    123.2, 122.9, 122.7, 122.4, 122.2, 121.9, 121.7, 121.4,\r\n    121.2, 120.9, 120.7, 120.5, 120.2, 120, 119.7, 119.5,\r\n    119.3, 119.1, 118.8, 118.6, 118.4, 118.1, 117.9, 117.7,\r\n    117.5, 117.3, 117, 116.8, 116.6, 116.4, 116.2, 116,\r\n    115.7, 115.5, 115.3, 115.1, 114.9, 114.7, 114.5, 114.3,\r\n    114.1, 113.9, 113.7, 113.5, 113.3, 113.1, 112.9, 112.7,\r\n    112.5, 112.3, 112.1, 111.9, 111.7, 111.5, 111.3, 111.2,\r\n    111, 110.8, 110.6, 110.4, 110.2, 110, 109.9, 109.7,\r\n    109.5, 109.3, 109.1, 109, 108.8, 108.6, 108.4, 108.2,\r\n    108.1, 107.9, 107.7, 107.5, 107.4, 107.2, 107, 106.9,\r\n    106.7, 106.5, 106.4, 106.2, 103, 102.8, 102.6, 102.4,\r\n    102.2, 102, 101.8, 101.6, 101.4, 101.3, 101.1, 100.9,\r\n    100.7, 100.5, 100.3, 100.1, 99.9, 99.8, 99.6, 99.4,\r\n    99.2, 99, 98.8, 98.7, 98.5, 98.3, 98.1, 97.9,\r\n    97.8, 97.6, 97.4, 97.2, 97.1, 96.9, 96.7, 96.5,\r\n    96.4, 96.2, 96, 95.8, 95.7, 95.5, 95.3, 95.2,\r\n    95, 94.8, 94.6, 94.5, 94.3, 94.1, 94, 93.8,\r\n    93.6, 93.5, 93.3, 93.2, 93, 92.8, 92.7, 92.5,\r\n    92.3, 92.2, 92, 91.9, 91.7, 91.5, 91.4, 91.2,\r\n    91.1, 90.9, 90.7, 90.6, 90.4, 90.3, 90.1, 90,\r\n    89.8, 89.7, 89.5, 89.4, 89.2, 89, 88.9, 88.7,\r\n    88.6, 88.4, 88.3, 88.1, 88, 87.8, 87.7, 87.5,\r\n    87.4, 87.2, 87.1, 86.9, 86.8, 86.7, 86.5, 86.4,\r\n    86.2, 86.1, 85.9, 85.8, 85.6, 85.5, 85.3, 85.2,\r\n    85.1, 84.9, 84.8, 84.6, 84.5, 84.3, 84.2, 84.1,\r\n    83.9, 83.8, 83.6, 83.5, 83.4, 83.2, 83.1, 83,\r\n    82.8, 82.7, 82.5, 82.4, 82.3, 82.1, 82, 81.9,\r\n    81.7, 81.6, 81.4, 81.3, 81.2, 81, 80.9, 80.8,\r\n    80.6, 80.5, 80.4, 80.2, 80.1, 80, 79.8, 79.7,\r\n    79.6, 79.4, 79.3, 79.2, 79, 78.9, 78.8, 78.7,\r\n    78.5, 78.4, 78.3, 78.1, 78, 77.9, 77.7, 77.6,\r\n    77.5, 77.4, 77.2, 77.1, 77, 76.9, 76.7, 76.6,\r\n    76.5, 76.3, 76.2, 76.1, 76, 75.8, 75.7, 75.6,\r\n    75.5, 75.3, 75.2, 75.1, 75, 74.8, 74.7, 74.6,\r\n    74.5, 74.3, 74.2, 74.1, 74, 73.9, 73.7, 73.6,\r\n    73.5, 73.4, 73.2, 73.1, 73, 72.9, 72.8, 72.6,\r\n    72.5, 72.4, 72.3, 72.1, 72, 71.9, 71.8, 71.7,\r\n    71.5, 71.4, 71.3, 71.2, 71.1, 71, 70.8, 70.7,\r\n    70.6, 70.5, 70.4, 70.2, 70.1, 70, 69.9, 69.8,\r\n    69.6, 69.5, 69.4, 69.3, 69.2, 69.1, 68.9, 68.8,\r\n    68.7, 68.6, 68.5, 68.4, 68.2, 68.1, 68, 67.9,\r\n    67.8, 67.7, 67.6, 67.4, 67.3, 67.2, 67.1, 67,\r\n    66.9, 66.7, 66.6, 66.5, 66.4, 66.3, 66.2, 66.1,\r\n    65.9, 65.8, 65.7, 65.6, 65.5, 65.4, 65.3, 65.2,\r\n    65, 64.9, 64.8, 64.7, 64.6, 64.5, 64.4, 64.2,\r\n    64.1, 64, 63.9, 63.8, 63.7, 63.6, 63.5, 63.3,\r\n    63.2, 63.1, 63, 62.9, 62.8, 62.7, 62.6, 62.5,\r\n    62.3, 62.2, 62.1, 62, 61.9, 61.8, 61.7, 61.6,\r\n    61.5, 61.3, 61.2, 61.1, 61, 60.9, 60.8, 60.7,\r\n    60.6, 60.5, 60.4, 60.2, 60.1, 60, 59.9, 59.8,\r\n    59.7, 59.6, 59.5, 59.4, 59.2, 59.1, 59, 58.9,\r\n    58.8, 58.7, 58.6, 58.5, 58.4, 58.3, 58.2, 58,\r\n    57.9, 57.8, 57.7, 57.6, 57.5, 57.4, 57.3, 57.2,\r\n    57.1, 57, 56.8, 56.7, 56.6, 56.5, 56.4, 56.3,\r\n    56.2, 56.1, 56, 55.9, 55.8, 55.6, 55.5, 55.4,\r\n    55.3, 55.2, 55.1, 55, 54.9, 54.8, 54.7, 54.6,\r\n    54.4, 54.3, 54.2, 54.1, 54, 53.9, 53.8, 53.7,\r\n    53.6, 53.5, 53.4, 53.2, 53.1, 53, 52.9, 52.8,\r\n    52.7, 52.6, 52.5, 52.4, 52.3, 52.2, 52, 51.9,\r\n    51.8, 51.7, 51.6, 51.5, 51.4, 51.3, 51.2, 51.1,\r\n    51, 50.8, 50.7, 50.6, 50.5, 50.4, 50.3, 50.2,\r\n    50.1, 50, 49.9, 49.8, 49.6, 49.5, 49.4, 49.3,\r\n    49.2, 49.1, 49, 48.9, 48.8, 48.7, 48.5, 48.4,\r\n    48.3, 48.2, 48.1, 48, 47.9, 47.8, 47.7, 47.6,\r\n    47.4, 47.3, 47.2, 47.1, 47, 46.9, 46.8, 46.7,\r\n    46.6, 46.4, 46.3, 46.2, 46.1, 46, 45.9, 45.8,\r\n    45.7, 45.6, 45.4, 45.3, 45.2, 45.1, 45, 44.9,\r\n    44.8, 44.7, 44.5, 44.4, 44.3, 44.2, 44.1, 44,\r\n    43.9, 43.8, 43.6, 43.5, 43.4, 43.3, 43.2, 43.1,\r\n    43, 42.9, 42.7, 42.6, 42.5, 42.4, 42.3, 42.2,\r\n    42, 41.9, 41.8, 41.7, 41.6, 41.5, 41.4, 41.2,\r\n    41.1, 41, 40.9, 40.8, 40.7, 40.5, 40.4, 40.3,\r\n    40.2, 40.1, 40, 39.8, 39.7, 39.6, 39.5, 39.4,\r\n    39.3, 39.1, 39, 38.9, 38.8, 38.7, 38.5, 38.4,\r\n    38.3, 38.2, 38.1, 37.9, 37.8, 37.7, 37.6, 37.5,\r\n    37.3, 37.2, 37.1, 37, 36.9, 36.7, 36.6, 36.5,\r\n    36.4, 36.2, 36.1, 36, 35.9, 35.8, 35.6, 35.5,\r\n    35.4, 35.3, 35.1, 35, 34.9, 34.8, 34.6, 34.5,\r\n    34.4, 34.3, 34.1, 34, 33.9, 33.7, 33.6, 33.5,\r\n    33.4, 33.2, 33.1, 33, 32.8, 32.7, 32.6, 32.5,\r\n    32.3, 32.2, 32.1, 31.9, 31.8, 31.7, 31.5, 31.4,\r\n    31.3, 31.1, 31, 30.9, 30.7, 30.6, 30.5, 30.3,\r\n    30.2, 30.1, 29.9, 29.8, 29.7, 29.5, 29.4, 29.2,\r\n    29.1, 29, 28.8, 28.7, 28.5, 28.4, 28.3, 28.1,\r\n    28, 27.8, 27.7, 27.5, 27.4, 27.3, 27.1, 27,\r\n    26.8, 26.7, 26.5, 26.4, 26.2, 26.1, 25.9, 25.8,\r\n    25.6, 25.5, 25.3, 25.2, 25, 24.9, 24.7, 24.6,\r\n    24.4, 24.3, 24.1, 24, 23.8, 23.6, 23.5, 23.3,\r\n    23.2, 23, 22.9, 22.7, 22.5, 22.4, 22.2, 22,\r\n    21.9, 21.7, 21.5, 21.4, 21.2, 21, 20.9, 20.7,\r\n    20.5, 20.4, 20.2, 20, 19.8, 19.7, 19.5, 19.3,\r\n    19.1, 19, 18.8, 18.6, 18.4, 18.2, 18.1, 17.9,\r\n    17.7, 17.5, 17.3, 17.1, 16.9, 16.7, 16.5, 16.4,\r\n    16.2, 16, 15.8, 15.6, 15.4, 15.2, 15, 14.8,\r\n    14.6, 14.4, 14.1, 13.9, 13.7, 13.5, 13.3, 13.1,\r\n    12.9, 12.6, 12.4, 12.2, 12, 11.8, 11.5, 11.3,\r\n    11.1, 10.8, 10.6, 10.4, 10.1, 9.9, 9.6, 9.4,\r\n    9.1, 8.9, 8.6, 8.4, 8.1, 7.8, 7.6, 7.3,\r\n    7, 6.8, 6.5, 6.2, 5.9, 5.6, 5.3, 5,\r\n    4.7, 4.4, 4.1, 3.8, 3.5, 3.2, 2.9, 2.5,\r\n    2.2, 1.9, 1.5, 1.2, 0.8, 0.5, 0.1, -0.3,\r\n    -0.7, -1.1, -1.5, -1.9, -2.3, -2.7, -3.1, -3.6,\r\n    -4, -4.5, -5, -5.5, -6, -6.5, -7, -7.5,\r\n    -8.1, -8.7, -9.3, -9.9, -10.6, -11.2, -11.9, -12.7,\r\n    -13.4, -14.3, -15.1, -16, -17, -18, -19.2, -20.4,\r\n    -21.7, -23.2, -24.9, -26.9, -29.2, -32.3, -36.7, -44.9,\r\n];\r\nfunction GetTemperatureFromADCValue(value, units = 'C') {\r\n    if (value <= 0)\r\n        value = 0;\r\n    if (value >= 1023)\r\n        value = 1023;\r\n    let temp = adc_table[value];\r\n    if (units == 'F')\r\n        return (temp * 9 / 5) + 32;\r\n    else if (units == 'K')\r\n        return temp + 273.15;\r\n    else if (units == 'C')\r\n        return temp;\r\n    else\r\n        return NaN;\r\n}\r\nexports.GetTemperatureFromADCValue = GetTemperatureFromADCValue;\r\n\n\n//# sourceURL=webpack:///./src/TempatureConverter.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst GrillController_1 = __webpack_require__(/*! ./GrillController */ \"./src/GrillController.ts\");\r\nlet controller = new GrillController_1.GrillController;\r\ncontroller.boot();\r\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ 0:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///buffer_(ignored)?");

/***/ })

/******/ });