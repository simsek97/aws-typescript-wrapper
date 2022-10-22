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
exports.deleteUser = void 0;
var client_iam_1 = require("@aws-sdk/client-iam");
var deleteAccessKey_1 = require("./deleteAccessKey");
var listAccessKeys_1 = require("./listAccessKeys");
var listUserGroups_1 = require("./listUserGroups");
var listUserInlinePolicies_1 = require("./listUserInlinePolicies");
var listUserPolicies_1 = require("./listUserPolicies");
/**
 * Deletes an IAM user. The full logic involved when deleting a user is discussed here:
 *
 * https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-iam/classes/deleteusercommand.html
 * https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_manage.html#id_users_deleting
 * https://docs.aws.amazon.com/IAM/latest/APIReference/API_DeleteUser.html
 *
 * For this application, we only address the following:
 *
 * - login profile
 * - access keys
 * - inline policies
 * - attached policies
 * - group memberships
 *
 */
function deleteUser(_a) {
    var accessKey = _a.accessKey, secretKey = _a.secretKey, region = _a.region, userName = _a.userName;
    return __awaiter(this, void 0, void 0, function () {
        var client, error_1, policyNames, _i, policyNames_1, policyName, policies, _b, policies_1, policy, groups, _c, groups_1, group, accessKeys, _d, accessKeys_1, userAccessKey;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    client = new client_iam_1.IAMClient({
                        region: region,
                        credentials: {
                            accessKeyId: accessKey,
                            secretAccessKey: secretKey,
                        },
                    });
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, client.send(new client_iam_1.DeleteLoginProfileCommand({ UserName: userName }))];
                case 2:
                    _e.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _e.sent();
                    if (error_1 instanceof client_iam_1.IAMServiceException && error_1.name === "NoSuchEntity") {
                        // expected if there was no login profile, so this is normal, no need to throw an exception
                    }
                    else {
                        throw error_1;
                    }
                    return [3 /*break*/, 4];
                case 4: return [4 /*yield*/, (0, listUserInlinePolicies_1.listUserInlinePolicies)({
                        accessKey: accessKey,
                        secretKey: secretKey,
                        region: region,
                        userName: userName,
                    })];
                case 5:
                    policyNames = _e.sent();
                    _i = 0, policyNames_1 = policyNames;
                    _e.label = 6;
                case 6:
                    if (!(_i < policyNames_1.length)) return [3 /*break*/, 9];
                    policyName = policyNames_1[_i];
                    return [4 /*yield*/, client.send(new client_iam_1.DeleteUserPolicyCommand({
                            UserName: userName,
                            PolicyName: policyName,
                        }))];
                case 7:
                    _e.sent();
                    _e.label = 8;
                case 8:
                    _i++;
                    return [3 /*break*/, 6];
                case 9: return [4 /*yield*/, (0, listUserPolicies_1.listUserPolicies)({
                        accessKey: accessKey,
                        secretKey: secretKey,
                        region: region,
                        userName: userName,
                    })];
                case 10:
                    policies = _e.sent();
                    _b = 0, policies_1 = policies;
                    _e.label = 11;
                case 11:
                    if (!(_b < policies_1.length)) return [3 /*break*/, 14];
                    policy = policies_1[_b];
                    return [4 /*yield*/, client.send(new client_iam_1.DetachUserPolicyCommand({
                            UserName: userName,
                            PolicyArn: policy.PolicyArn,
                        }))];
                case 12:
                    _e.sent();
                    _e.label = 13;
                case 13:
                    _b++;
                    return [3 /*break*/, 11];
                case 14: return [4 /*yield*/, (0, listUserGroups_1.listUserGroups)({
                        accessKey: accessKey,
                        secretKey: secretKey,
                        region: region,
                        userName: userName,
                    })];
                case 15:
                    groups = _e.sent();
                    _c = 0, groups_1 = groups;
                    _e.label = 16;
                case 16:
                    if (!(_c < groups_1.length)) return [3 /*break*/, 19];
                    group = groups_1[_c];
                    return [4 /*yield*/, client.send(new client_iam_1.RemoveUserFromGroupCommand({
                            UserName: userName,
                            GroupName: group.GroupName,
                        }))];
                case 17:
                    _e.sent();
                    _e.label = 18;
                case 18:
                    _c++;
                    return [3 /*break*/, 16];
                case 19: return [4 /*yield*/, (0, listAccessKeys_1.listAccessKeys)({
                        accessKey: accessKey,
                        secretKey: secretKey,
                        region: region,
                        userName: userName,
                    })];
                case 20:
                    accessKeys = _e.sent();
                    _d = 0, accessKeys_1 = accessKeys;
                    _e.label = 21;
                case 21:
                    if (!(_d < accessKeys_1.length)) return [3 /*break*/, 24];
                    userAccessKey = accessKeys_1[_d];
                    return [4 /*yield*/, (0, deleteAccessKey_1.deleteAccessKey)({
                            accessKey: accessKey,
                            secretKey: secretKey,
                            region: region,
                            userName: userName,
                            accessKeyId: userAccessKey.AccessKeyId,
                        })];
                case 22:
                    _e.sent();
                    _e.label = 23;
                case 23:
                    _d++;
                    return [3 /*break*/, 21];
                case 24: 
                // Finally, we are ready to delete the user
                return [4 /*yield*/, client.send(new client_iam_1.DeleteUserCommand({ UserName: userName }))];
                case 25:
                    // Finally, we are ready to delete the user
                    _e.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.deleteUser = deleteUser;
//# sourceMappingURL=deleteUser.js.map