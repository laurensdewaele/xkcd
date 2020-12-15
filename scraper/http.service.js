"use strict";
exports.__esModule = true;
exports.httpService = void 0;
var axios_1 = require("axios");
var constants_1 = require("./constants");
var instance = axios_1["default"].create({
  timeout: constants_1.MAX_TIMEOUT_MS,
});
var get = function (URL, config) {
  return instance.get(URL, config);
};
exports.httpService = {
  get: get,
};
