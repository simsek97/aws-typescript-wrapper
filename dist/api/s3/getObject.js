"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getObject = void 0;
var client_s3_1 = require("@aws-sdk/client-s3");
function streamToString(stream) {
    return __awaiter(this, void 0, void 0, function () {
        var reader, done, decoder, string, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    reader = stream.getReader();
                    done = false;
                    decoder = new TextDecoder();
                    string = "";
                    _a.label = 1;
                case 1: return [4 /*yield*/, reader.read()];
                case 2:
                    result = _a.sent();
                    done = result.done;
                    if (result.value) {
                        string += decoder.decode(result.value, { stream: true });
                    }
                    _a.label = 3;
                case 3:
                    if (!done) return [3 /*break*/, 1];
                    _a.label = 4;
                case 4: return [2 /*return*/, string];
            }
        });
    });
}
/**
 * Reads a json file from S3
 */
function getObject(_a) {
    var accessKey = _a.accessKey, secretKey = _a.secretKey, region = _a.region, bucketName = _a.bucketName, objectKey = _a.objectKey;
    return __awaiter(this, void 0, void 0, function () {
        var cfnClient, params, data, jsonStr, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    cfnClient = new client_s3_1.S3Client({
                        region: region,
                        credentials: {
                            accessKeyId: accessKey,
                            secretAccessKey: secretKey,
                        },
                    });
                    params = {
                        Bucket: bucketName,
                        Key: objectKey,
                        ResponseContentType: "application/json",
                    };
                    return [4 /*yield*/, cfnClient.send(new client_s3_1.GetObjectCommand(params))];
                case 1:
                    data = _b.sent();
                    if (!data.Body)
                        return [2 /*return*/, {}];
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, streamToString(data.Body)];
                case 3:
                    jsonStr = _b.sent();
                    return [2 /*return*/, JSON.parse(jsonStr)];
                case 4:
                    error_1 = _b.sent();
                    throw new Error("Couldn't get or parse the json file at \"".concat(objectKey, "\". Error ").concat(error_1));
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getObject = getObject;
//# sourceMappingURL=getObject.js.map