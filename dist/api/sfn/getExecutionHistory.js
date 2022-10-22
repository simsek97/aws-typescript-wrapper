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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExecutionHistory = exports.getExecutionFailureInfo = exports.isExecutionFailureEvent = void 0;
var includes_1 = __importDefault(require("lodash/includes"));
var isEmpty_1 = __importDefault(require("lodash/isEmpty"));
var client_sfn_1 = require("@aws-sdk/client-sfn");
// NOTE: AWS SFN SDK does not have these types as enumerations :(
// We consider any of these types as an execution failure event
// For all event types, see https://docs.aws.amazon.com/step-functions/latest/apireference/API_HistoryEvent.html
var executionFailureTypes = [
    "ExecutionAborted",
    "ExecutionFailed",
    "ExecutionTimedOut",
];
var isExecutionFailureEvent = function (event) {
    // We want to check if this event is a failure event that represents the whole execution.
    return (0, includes_1.default)(executionFailureTypes, event.type);
};
exports.isExecutionFailureEvent = isExecutionFailureEvent;
var getExecutionFailureInfo = function (event) {
    // AWS SFN SDK has a property per event type
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-sfn/modules/historyevent.html
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    var cause = "Unknown";
    var error = "Unknown";
    switch (event.type) {
        case "ExecutionAborted":
            cause = (_b = (_a = event.executionAbortedEventDetails) === null || _a === void 0 ? void 0 : _a.cause) !== null && _b !== void 0 ? _b : cause;
            error = (_d = (_c = event.executionAbortedEventDetails) === null || _c === void 0 ? void 0 : _c.error) !== null && _d !== void 0 ? _d : error;
            break;
        case "ExecutionFailed":
            cause = (_f = (_e = event.executionFailedEventDetails) === null || _e === void 0 ? void 0 : _e.cause) !== null && _f !== void 0 ? _f : cause;
            error = (_h = (_g = event.executionFailedEventDetails) === null || _g === void 0 ? void 0 : _g.error) !== null && _h !== void 0 ? _h : error;
            break;
        case "ExecutionTimedOut":
            cause = (_k = (_j = event.executionTimedOutEventDetails) === null || _j === void 0 ? void 0 : _j.cause) !== null && _k !== void 0 ? _k : cause;
            error = (_m = (_l = event.executionTimedOutEventDetails) === null || _l === void 0 ? void 0 : _l.error) !== null && _m !== void 0 ? _m : error;
            break;
    }
    return {
        cause: cause,
        error: error,
    };
};
exports.getExecutionFailureInfo = getExecutionFailureInfo;
/**
 * Get the history of the execution of a step functions state machine
 */
function getExecutionHistory(_a) {
    var _b;
    var accessKey = _a.accessKey, secretKey = _a.secretKey, region = _a.region, executionArn = _a.executionArn;
    return __awaiter(this, void 0, void 0, function () {
        var cfnClient, params, events, data;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    cfnClient = new client_sfn_1.SFNClient({
                        region: region,
                        credentials: {
                            accessKeyId: accessKey,
                            secretAccessKey: secretKey,
                        },
                    });
                    params = {
                        executionArn: executionArn,
                        includeExecutionData: false,
                        maxResults: 1000,
                        reverseOrder: true,
                    };
                    events = [];
                    _c.label = 1;
                case 1: return [4 /*yield*/, cfnClient.send(new client_sfn_1.GetExecutionHistoryCommand(params))];
                case 2:
                    data = _c.sent();
                    params.nextToken = data.nextToken;
                    if (!(0, isEmpty_1.default)(data.events)) {
                        events.push.apply(events, ((_b = data.events) !== null && _b !== void 0 ? _b : []));
                    }
                    _c.label = 3;
                case 3:
                    if (params.nextToken) return [3 /*break*/, 1];
                    _c.label = 4;
                case 4: return [2 /*return*/, events];
            }
        });
    });
}
exports.getExecutionHistory = getExecutionHistory;
//# sourceMappingURL=getExecutionHistory.js.map