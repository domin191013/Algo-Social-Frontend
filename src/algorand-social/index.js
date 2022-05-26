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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
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
exports.proceedTransactionWithSk = exports.proceedTransaction = exports.ChainType = exports.getAccount = exports.getDeleteAccountTransaction = exports.getCreateAccountTransaction = void 0;
var text_encoding_1 = require("text-encoding");
var ipfs_1 = require("./utils/ipfs");
var algo_1 = require("./utils/algo");
var utils_1 = require("./utils");
/**
 * Checks if an account is registered or not
 * @returns Account Info
 */
function isAccountRegistered(chain, accountId) {
    return __awaiter(this, void 0, void 0, function () {
        var indexer, accInfo, accountInfo, localStates, i, assetId, assetInfo, url, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    indexer = (0, utils_1.indexerForChain)(chain);
                    accInfo = {
                        Registered: false,
                        Url: "",
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    return [4 /*yield*/, indexer.lookupAccountByID(accountId).do()];
                case 2:
                    accountInfo = _a.sent();
                    localStates = accountInfo.account["apps-local-state"];
                    if (!localStates) return [3 /*break*/, 6];
                    i = 0;
                    _a.label = 3;
                case 3:
                    if (!(i < localStates.length)) return [3 /*break*/, 6];
                    if (!(localStates[i].id === (0, utils_1.getAppId)(chain) && !localStates[i].deleted)) return [3 /*break*/, 5];
                    assetId = localStates[i]["key-value"][0].value.uint;
                    return [4 /*yield*/, indexer.lookupAssetByID(assetId).do()];
                case 4:
                    assetInfo = _a.sent();
                    url = assetInfo.asset.params.url;
                    accInfo.Registered = true;
                    accInfo.Url = url;
                    _a.label = 5;
                case 5:
                    i++;
                    return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 8];
                case 7:
                    e_1 = _a.sent();
                    console.log("is account registered error == ", e_1);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/, accInfo];
            }
        });
    });
}
/**
 * Creates a new account from the selected address
 * @returns True if successful. False Otherwise.
 */
function getCreateAccountTransaction(chain, ipfsClient, wallet, name, email) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var accountInfo, results, url, enc, txn, e_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    if (!wallet) return [3 /*break*/, 3];
                    accountInfo = {
                        address: wallet,
                        name: name,
                        email: email,
                    };
                    return [4 /*yield*/, (0, ipfs_1.addAccount)(ipfsClient, accountInfo)];
                case 1:
                    results = _b.sent();
                    url = (_a = results.path) === null || _a === void 0 ? void 0 : _a.toString();
                    enc = new text_encoding_1.TextEncoder();
                    return [4 /*yield*/, (0, algo_1.getTransaction)(chain, wallet, [
                            enc.encode("create_account"),
                            enc.encode(url),
                        ])];
                case 2:
                    txn = _b.sent();
                    return [2 /*return*/, txn];
                case 3: throw "Wallet is empty";
                case 4:
                    e_2 = _b.sent();
                    console.log("create an account error === ", e_2);
                    throw e_2;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getCreateAccountTransaction = getCreateAccountTransaction;
/**
 * Deletes an account from the selected address
 * @returns True if successful. False Otherwise.
 */
function getDeleteAccountTransaction(chain, wallet) {
    return __awaiter(this, void 0, void 0, function () {
        var enc, txn, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    if (!wallet) return [3 /*break*/, 2];
                    enc = new text_encoding_1.TextEncoder();
                    return [4 /*yield*/, (0, algo_1.getCloseOutTransaction)(chain, wallet, [
                            enc.encode("delete_account"),
                        ])];
                case 1:
                    txn = _a.sent();
                    return [2 /*return*/, txn];
                case 2: throw "Wallet is empty";
                case 3:
                    e_3 = _a.sent();
                    console.log("deleteAccount error == ", e_3);
                    throw e_3;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getDeleteAccountTransaction = getDeleteAccountTransaction;
/**
 * Gets the account information from the given address
 * @returns Account Information in JSON format if successful. Null Otherwise.
 */
function getAccount(chain, ipfsClient, address) {
    return __awaiter(this, void 0, void 0, function () {
        var accInfo, accInfoJson, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, isAccountRegistered(chain, address)];
                case 1:
                    accInfo = _a.sent();
                    if (!accInfo.Registered) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0, ipfs_1.fetchIPFS)(ipfsClient, accInfo.Url)];
                case 2:
                    accInfoJson = _a.sent();
                    return [2 /*return*/, accInfoJson];
                case 3: throw "Account isn't registered";
                case 4:
                    e_4 = _a.sent();
                    console.log("get accountinfo error === ", e_4);
                    throw e_4;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getAccount = getAccount;
var types_1 = require("./types");
Object.defineProperty(exports, "ChainType", { enumerable: true, get: function () { return types_1.ChainType; } });
var algo_2 = require("./utils/algo");
Object.defineProperty(exports, "proceedTransaction", { enumerable: true, get: function () { return algo_2.proceedTransaction; } });
Object.defineProperty(exports, "proceedTransactionWithSk", { enumerable: true, get: function () { return algo_2.proceedTransactionWithSk; } });
__exportStar(require("./utils/orbitdb"), exports);
__exportStar(require("./utils/ipfs"), exports);
