"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __spreadArrays =
  (this && this.__spreadArrays) ||
  function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++)
      s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
        r[k] = a[j];
    return r;
  };
exports.__esModule = true;
var fs = require("fs");
var api_1 = require("./api");
var constants_1 = require("./constants");
var mapper_1 = require("./mapper");
var fetchMissingComicDTOs = function (savedComicNos, latestComicNo) {
  return __awaiter(void 0, void 0, void 0, function () {
    var comicsToFetch,
      missingComicDTOs,
      failedComicFetchNos,
      promises,
      _loop_1,
      comicNoToFetch;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          comicsToFetch =
            latestComicNo -
            savedComicNos.length -
            constants_1.UNAVAILABLE_COMIC_NOS.length;
          missingComicDTOs = [];
          failedComicFetchNos = [];
          promises = [];
          console.log("fetching " + comicsToFetch + " comics...");
          _loop_1 = function (comicNoToFetch) {
            if (
              !savedComicNos.includes(comicNoToFetch) &&
              !constants_1.UNAVAILABLE_COMIC_NOS.includes(comicNoToFetch)
            ) {
              // In case a single http call fails, we still want to save that data.
              // Therefore we're not using Promise.all
              var promise = new Promise(function (resolve) {
                api_1.api
                  .getSpecificComicDTO(comicNoToFetch)
                  .then(function (comicDTO) {
                    missingComicDTOs.push(comicDTO);
                    resolve();
                  })
                  ["catch"](function (e) {
                    failedComicFetchNos.push(comicNoToFetch);
                    console.log(
                      "Could not fetch comic no " + comicNoToFetch,
                      e.message
                    );
                    resolve();
                  });
              });
              promises.push(promise);
            }
          };
          for (
            comicNoToFetch = 1;
            comicNoToFetch < latestComicNo;
            comicNoToFetch++
          ) {
            _loop_1(comicNoToFetch);
          }
          return [4 /*yield*/, Promise.all(promises)];
        case 1:
          _a.sent();
          if (failedComicFetchNos.length > 0) {
            console.log(
              "Failed comics to fetch:",
              failedComicFetchNos.toString()
            );
            console.log(
              "Failed percentage: " +
                (failedComicFetchNos.length / comicsToFetch) * 100 +
                "%"
            );
            // TODO: Implement retry
          }
          return [2 /*return*/, missingComicDTOs];
      }
    });
  });
};
var readComicsJSON = function () {
  var comics = [];
  try {
    comics = JSON.parse(
      fs.readFileSync(constants_1.COMICS_JSON_PATH, {
        encoding: "utf8",
      })
    );
  } catch (e) {
    console.log("Error in parsing comics.json, fetching all comics...");
  }
  return comics;
};
var saveComicsToJSON = function (comics) {
  try {
    fs.writeFileSync(constants_1.COMICS_JSON_PATH, JSON.stringify(comics), {
      encoding: "utf8",
    });
  } catch (e) {
    console.log(
      "There was an error in writing the new comics to the JSON file",
      e
    );
  }
};
var scrape = function () {
  return __awaiter(void 0, void 0, void 0, function () {
    var comics,
      latestComicDTO,
      e_1,
      savedComicNos,
      missingComicDTOs,
      missingComics,
      latestComic;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          comics = readComicsJSON();
          _a.label = 1;
        case 1:
          _a.trys.push([1, 3, , 4]);
          return [4 /*yield*/, api_1.api.getLatestComicDTO()];
        case 2:
          latestComicDTO = _a.sent();
          return [3 /*break*/, 4];
        case 3:
          e_1 = _a.sent();
          // TODO: Implement retry
          console.log("Error in fetching the latest comic, exiting...");
          process.exit(1);
          return [3 /*break*/, 4];
        case 4:
          savedComicNos = comics.map(function (comic) {
            return comic.no;
          });
          return [
            4 /*yield*/,
            fetchMissingComicDTOs(savedComicNos, latestComicDTO.num),
          ];
        case 5:
          missingComicDTOs = _a.sent();
          missingComics = missingComicDTOs.map(function (comicDTO) {
            return mapper_1.mapComicDTOtoModel(comicDTO);
          });
          latestComic = mapper_1.mapComicDTOtoModel(latestComicDTO);
          comics.push.apply(
            comics,
            __spreadArrays(missingComics, [latestComic])
          );
          comics.sort(function (a, b) {
            return a.no - b.no;
          });
          saveComicsToJSON(comics);
          return [2 /*return*/];
      }
    });
  });
};
scrape();
