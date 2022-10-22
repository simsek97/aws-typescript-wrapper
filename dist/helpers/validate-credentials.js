"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.validateCredentials = exports.CredentialsValidationException = exports.CredentialsValidationErrorCode = void 0;
var last_1 = __importDefault(require("lodash/last"));
var trim_1 = __importDefault(require("lodash/trim"));
var some_1 = __importDefault(require("lodash/some"));
var client_sts_1 = require("@aws-sdk/client-sts");
var client_iam_1 = require("@aws-sdk/client-iam");
var CredentialsValidationErrorCode;
(function (CredentialsValidationErrorCode) {
    CredentialsValidationErrorCode["NotAdmin"] = "NOT_ADMIN";
    CredentialsValidationErrorCode["InvalidKeys"] = "INVALID_KEYS";
    CredentialsValidationErrorCode["AccountMismatch"] = "ACCOUNT_MISMATCH";
    CredentialsValidationErrorCode["Unknown"] = "UNKNOWN";
})(CredentialsValidationErrorCode = exports.CredentialsValidationErrorCode || (exports.CredentialsValidationErrorCode = {}));
var CredentialsValidationException = /** @class */ (function (_super) {
    __extends(CredentialsValidationException, _super);
    function CredentialsValidationException(code, rootCause) {
        var _this = _super.call(this, rootCause ? "".concat(code, " - rootCause.message") : "".concat(code)) || this;
        _this.name = "ValidationError";
        _this.code = code;
        _this.rootCause = rootCause;
        return _this;
    }
    return CredentialsValidationException;
}(Error));
exports.CredentialsValidationException = CredentialsValidationException;
/**
 * Validates if the credentials are for an admin. If not, an exception is thrown.
 * Validating the credentials includes the following steps:
 * - Get the account id and user arn by calling caller identity
 * - Get the managed policies attached to the principal and ensure that one of them is AdministratorAccess
 *
 * If all checks out, this function returns the account id and the user name
 */
function validateCredentials(_a) {
    var accessKey = _a.accessKey, secretKey = _a.secretKey, region = _a.region;
    return __awaiter(this, void 0, void 0, function () {
        var stsClient, iamClient, userName, accountId, arn, stsData, Account, Arn, err_1, code, params, found, iamData, err_2, code;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    accessKey = (0, trim_1.default)(accessKey);
                    secretKey = (0, trim_1.default)(secretKey);
                    stsClient = new client_sts_1.STSClient({
                        region: region,
                        credentials: {
                            accessKeyId: accessKey,
                            secretAccessKey: secretKey,
                        },
                    });
                    iamClient = new client_iam_1.IAMClient({
                        region: region,
                        credentials: {
                            accessKeyId: accessKey,
                            secretAccessKey: secretKey,
                        },
                    });
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, stsClient.send(new client_sts_1.GetCallerIdentityCommand({}))];
                case 2:
                    stsData = _b.sent();
                    Account = stsData.Account, Arn = stsData.Arn;
                    accountId = Account;
                    arn = Arn;
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _b.sent();
                    code = CredentialsValidationErrorCode.Unknown;
                    // InvalidClientTokenId => incorrectly copied, or inactive or deleted
                    if (err_1 instanceof client_sts_1.STSServiceException) {
                        if (err_1.name === "InvalidClientTokenId" ||
                            err_1.name === "SignatureDoesNotMatch")
                            code = CredentialsValidationErrorCode.InvalidKeys;
                    }
                    throw new CredentialsValidationException(code, err_1);
                case 4:
                    if (arn === "arn:aws:iam::".concat(accountId, ":root")) {
                        // For now, we consider the root credentials as valid, although it is not a good idea for the
                        // user to provide root credentials
                        return [2 /*return*/, { accountId: accountId, userArn: arn }];
                    }
                    if (!(arn === null || arn === void 0 ? void 0 : arn.startsWith("arn:aws:iam::".concat(accountId, ":user/")))) {
                        // We don't know what the principal is so we consider the credentials invalid
                        throw new CredentialsValidationException(CredentialsValidationErrorCode.Unknown);
                    }
                    _b.label = 5;
                case 5:
                    _b.trys.push([5, 10, , 11]);
                    // Get the managed policies attached to the principal and ensure that one of them is AdministratorAccess
                    userName = (0, last_1.default)(arn.split("/"));
                    params = {
                        UserName: userName,
                        MaxItems: 999,
                    };
                    found = false;
                    iamData = void 0;
                    _b.label = 6;
                case 6: return [4 /*yield*/, iamClient.send(new client_iam_1.ListAttachedUserPoliciesCommand(params))];
                case 7:
                    iamData = _b.sent();
                    found = (0, some_1.default)(iamData.AttachedPolicies, {
                        PolicyArn: "arn:aws:iam::aws:policy/AdministratorAccess",
                    });
                    params.Marker = iamData.Marker;
                    _b.label = 8;
                case 8:
                    if (!found && iamData.IsTruncated) return [3 /*break*/, 6];
                    _b.label = 9;
                case 9:
                    if (!found) {
                        throw new CredentialsValidationException(CredentialsValidationErrorCode.NotAdmin);
                    }
                    return [2 /*return*/, { accountId: accountId, userArn: arn, userName: userName }];
                case 10:
                    err_2 = _b.sent();
                    code = CredentialsValidationErrorCode.Unknown;
                    if (err_2 instanceof client_iam_1.IAMServiceException) {
                        if (err_2.name === "AccessDenied")
                            code = CredentialsValidationErrorCode.NotAdmin;
                    }
                    if (err_2 instanceof CredentialsValidationException) {
                        throw err_2;
                    }
                    throw new CredentialsValidationException(code, err_2);
                case 11: return [2 /*return*/];
            }
        });
    });
}
exports.validateCredentials = validateCredentials;
//# sourceMappingURL=validate-credentials.js.map