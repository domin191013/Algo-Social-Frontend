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
exports.proceedTransaction = exports.getCloseOutTransaction = exports.getTransaction = void 0;
var algosdk_1 = __importDefault(require("algosdk"));
var utils_1 = require("@json-rpc-tools/utils");
var index_1 = require("./index");
function getTransaction(chain, accountId, apiParam) {
    return __awaiter(this, void 0, void 0, function () {
        var client, txnParams, txn;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = (0, index_1.clientForChain)(chain);
                    return [4 /*yield*/, client.getTransactionParams().do()];
                case 1:
                    txnParams = _a.sent();
                    return [4 /*yield*/, algosdk_1.default.makeApplicationOptInTxn(accountId, txnParams, (0, index_1.getAppId)(chain), apiParam, undefined, undefined, undefined, undefined, undefined, algosdk_1.default.getApplicationAddress((0, index_1.getAppId)(chain)))];
                case 2:
                    txn = _a.sent();
                    return [2 /*return*/, txn];
            }
        });
    });
}
exports.getTransaction = getTransaction;
function getCloseOutTransaction(chain, accountId, apiParam) {
    return __awaiter(this, void 0, void 0, function () {
        var client, txnParams, txn;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = (0, index_1.clientForChain)(chain);
                    return [4 /*yield*/, client.getTransactionParams().do()];
                case 1:
                    txnParams = _a.sent();
                    return [4 /*yield*/, algosdk_1.default.makeApplicationCloseOutTxn(accountId, txnParams, (0, index_1.getAppId)(chain), apiParam, undefined, undefined, undefined, undefined, undefined, algosdk_1.default.getApplicationAddress((0, index_1.getAppId)(chain)))];
                case 2:
                    txn = _a.sent();
                    return [2 /*return*/, txn];
            }
        });
    });
}
exports.getCloseOutTransaction = getCloseOutTransaction;
function proceedTransaction(chain, txn, connector) {
    return __awaiter(this, void 0, void 0, function () {
        var txnsToSign, requestParams, request, result, decodedResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getSigningTransaction(txn)];
                case 1:
                    txnsToSign = _a.sent();
                    requestParams = [txnsToSign];
                    request = (0, utils_1.formatJsonRpcRequest)("algo_signTxn", requestParams);
                    return [4 /*yield*/, connector.sendCustomRequest(request)];
                case 2:
                    result = _a.sent();
                    decodedResult = result.map(function (element) {
                        var txId = 111;
                        if (element == null) {
                            throw new Error("Transaction ".concat(txId, ": was not signed when it should have been"));
                        }
                        return new Uint8Array(Buffer.from(element, "base64"));
                    });
                    return [4 /*yield*/, apiSubmitTransactions(chain, decodedResult)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.proceedTransaction = proceedTransaction;
function getSigningTransaction(txn) {
    return __awaiter(this, void 0, void 0, function () {
        var txns, txnsToSign;
        return __generator(this, function (_a) {
            txns = [txn];
            txnsToSign = txns.map(function (txn) {
                var encodedTxn = Buffer.from(algosdk_1.default.encodeUnsignedTransaction(txn)).toString("base64");
                return {
                    txn: encodedTxn,
                    message: "Description of transaction being signed",
                    // Note: if the transaction does not need to be signed (because it's part of an atomic group
                    // that will be signed by another party), specify an empty singers array like so:
                    // signers: [],
                };
            });
            return [2 /*return*/, txnsToSign];
        });
    });
}
function apiSubmitTransactions(chain, stxns) {
    return __awaiter(this, void 0, void 0, function () {
        var txId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, index_1.clientForChain)(chain).sendRawTransaction(stxns).do()];
                case 1:
                    txId = (_a.sent()).txId;
                    return [4 /*yield*/, waitForTransaction(chain, txId)];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function waitForTransaction(chain, txId) {
    return __awaiter(this, void 0, void 0, function () {
        var client, lastStatus, lastRound, status;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = (0, index_1.clientForChain)(chain);
                    return [4 /*yield*/, client.status().do()];
                case 1:
                    lastStatus = _a.sent();
                    lastRound = lastStatus["last-round"];
                    _a.label = 2;
                case 2:
                    if (!true) return [3 /*break*/, 5];
                    return [4 /*yield*/, client.pendingTransactionInformation(txId).do()];
                case 3:
                    status = _a.sent();
                    if (status["pool-error"]) {
                        throw new Error("Transaction Pool Error: ".concat(status["pool-error"]));
                    }
                    if (status["confirmed-round"]) {
                        return [2 /*return*/, status["confirmed-round"]];
                    }
                    return [4 /*yield*/, client.statusAfterBlock(lastRound + 1).do()];
                case 4:
                    lastStatus = _a.sent();
                    lastRound = lastStatus["last-round"];
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/];
            }
        });
    });
}
