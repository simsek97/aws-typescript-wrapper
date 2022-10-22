"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sns = exports.sfn = exports.secretsmanager = exports.s3 = exports.iam = exports.cloudwatch = exports.cloudformation = exports.appflow = void 0;
var appflow = __importStar(require("./api/appflow"));
exports.appflow = appflow;
var cloudformation = __importStar(require("./api/cloudformation"));
exports.cloudformation = cloudformation;
var cloudwatch = __importStar(require("./api/cloudwatch"));
exports.cloudwatch = cloudwatch;
var iam = __importStar(require("./api/iam"));
exports.iam = iam;
var s3 = __importStar(require("./api/s3"));
exports.s3 = s3;
var secretsmanager = __importStar(require("./api/secretsmanager"));
exports.secretsmanager = secretsmanager;
var sfn = __importStar(require("./api/sfn"));
exports.sfn = sfn;
var sns = __importStar(require("./api/sns"));
exports.sns = sns;
//# sourceMappingURL=main.js.map