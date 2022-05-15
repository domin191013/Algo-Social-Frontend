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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialAlgoApi = void 0;
var algosdk_1 = __importDefault(require("algosdk"));
var utils_1 = require("@json-rpc-tools/utils");
var types_1 = require("./types");
var config_1 = require("./config");
var utils_2 = require("./utils");
var ipfs_1 = require("./utils/ipfs");
var text_encoding_1 = require("text-encoding");
var SocialAlgoApi = /** @class */ (function () {
    function SocialAlgoApi() {
        this.chain = types_1.ChainType.TestNet;
        this.ipfsService = new ipfs_1.IpfsService();
    }
    SocialAlgoApi.prototype.initialize = function (chainType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log("SocialAlgoApi -> initialize");
                this.chain = chainType == "testnet" ? types_1.ChainType.TestNet : types_1.ChainType.MainNet;
                return [2 /*return*/];
            });
        });
    };
    SocialAlgoApi.prototype.apiGetAccountAssets = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var indexer, accountInfo, algoBalance, assetsFromRes, assets;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        indexer = (0, utils_2.indexerForChain)(this.chain);
                        return [4 /*yield*/, indexer.lookupAccountByID(address).do()];
                    case 1:
                        accountInfo = _a.sent();
                        console.log("accountInfo: ", accountInfo);
                        algoBalance = accountInfo.amount;
                        assetsFromRes = accountInfo.assets;
                        assets = assetsFromRes.map(function (_a) {
                            var id = _a["asset-id"], amount = _a.amount, creator = _a.creator, frozen = _a.frozen;
                            return ({
                                id: Number(id),
                                amount: amount,
                                creator: creator,
                                frozen: frozen,
                                decimals: 0,
                            });
                        });
                        assets.sort(function (a, b) { return a.id - b.id; });
                        return [4 /*yield*/, Promise.all(assets.map(function (asset) { return __awaiter(_this, void 0, void 0, function () {
                                var params;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, indexer.lookupAssetByID(asset.id).do()];
                                        case 1:
                                            params = (_a.sent()).params;
                                            asset.name = params.name;
                                            asset.unitName = params["unit-name"];
                                            asset.url = params.url;
                                            asset.decimals = params.decimals;
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 2:
                        _a.sent();
                        assets.unshift({
                            id: 0,
                            amount: algoBalance,
                            creator: "",
                            frozen: false,
                            decimals: 6,
                            name: "Algo",
                            unitName: "Algo",
                        });
                        return [2 /*return*/, assets];
                }
            });
        });
    };
    SocialAlgoApi.prototype.apiGetTxnParams = function () {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, utils_2.clientForChain)(this.chain).getTransactionParams().do()];
                    case 1:
                        params = _a.sent();
                        return [2 /*return*/, params];
                }
            });
        });
    };
    /**
     * Checks if an account is registered or not
     * @returns Account Info
     */
    SocialAlgoApi.prototype.isAccountRegistered = function (accountId) {
        return __awaiter(this, void 0, void 0, function () {
            var indexer, accInfo, accountInfo, localStates, i, assetId, assetInfo, url, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        indexer = (0, utils_2.indexerForChain)(this.chain);
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
                        if (!(localStates[i].id === config_1.APP_ID && !localStates[i].deleted)) return [3 /*break*/, 5];
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
    };
    /**
     * Creates a new account from the selected address
     * @returns True if successful. False Otherwise.
     */
    SocialAlgoApi.prototype.createAccount = function (accountId, connector, name, email) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var client, accountInfo, results, url, enc, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        client = (0, utils_2.clientForChain)(this.chain);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, , 6]);
                        if (!accountId) return [3 /*break*/, 4];
                        accountInfo = {
                            address: accountId,
                            name: name,
                            email: email,
                        };
                        return [4 /*yield*/, this.ipfsService.addAccount(accountInfo)];
                    case 2:
                        results = _b.sent();
                        url = (_a = results.path) === null || _a === void 0 ? void 0 : _a.toString();
                        enc = new text_encoding_1.TextEncoder();
                        return [4 /*yield*/, this.apiTransaction(connector, accountId, [
                                enc.encode("create_account"),
                                enc.encode(url),
                            ])];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, true];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_2 = _b.sent();
                        console.log("create an account error === ", e_2);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/, false];
                }
            });
        });
    };
    /**
     * Deletes an account from the selected address
     * @returns True if successful. False Otherwise.
     */
    SocialAlgoApi.prototype.deleteAccount = function (connector, address) {
        return __awaiter(this, void 0, void 0, function () {
            var client, deleteAccountAppTxnargs, enc, txnParams, txn, txnsToSign, requestParams, request, result, decodedResult, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("SocialAlgoApi -> deleteAccount");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        client = (0, utils_2.clientForChain)(this.chain);
                        deleteAccountAppTxnargs = [];
                        deleteAccountAppTxnargs.push(new Uint8Array(Buffer.from("delete_account")));
                        enc = new text_encoding_1.TextEncoder();
                        return [4 /*yield*/, client.getTransactionParams().do()];
                    case 2:
                        txnParams = _a.sent();
                        return [4 /*yield*/, algosdk_1.default.makeApplicationCloseOutTxn(address, txnParams, config_1.APP_ID, [enc.encode("delete_account")])];
                    case 3:
                        txn = _a.sent();
                        return [4 /*yield*/, this.getSigningTransaction(txn)];
                    case 4:
                        txnsToSign = _a.sent();
                        requestParams = [txnsToSign];
                        request = (0, utils_1.formatJsonRpcRequest)("algo_signTxn", requestParams);
                        return [4 /*yield*/, connector.sendCustomRequest(request)];
                    case 5:
                        result = _a.sent();
                        decodedResult = result.map(function (element) {
                            return new Uint8Array(Buffer.from(element, "base64"));
                        });
                        return [4 /*yield*/, this.apiSubmitTransactions(decodedResult)];
                    case 6:
                        _a.sent();
                        /*
                        // create unsigned transaction
                        let params = await client.getTransactionParams().do();
                  
                        let txn = algosdk.makeApplicationCloseOutTxn(
                          address,
                          params,
                          APP_ID,
                          deleteAccountAppTxnargs
                        );
                        let txnsToSign = await this.getSigningTransaction(txn);
                        const requestParams = [txnsToSign];
                        const request = formatJsonRpcRequest("algo_signTxn", requestParams);
                        await connector.sendCustomRequest(request);*/
                        return [2 /*return*/, true];
                    case 7:
                        e_3 = _a.sent();
                        console.log("deleteAccount error == ", e_3);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/, false];
                }
            });
        });
    };
    /**
     * Gets the account information from the given address
     * @returns Account Information in JSON format if successful. Null Otherwise.
     */
    SocialAlgoApi.prototype.getAccount = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var accInfo, accInfoJson, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("SocialAlgoApi -> getAccount");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, this.isAccountRegistered(address)];
                    case 2:
                        accInfo = _a.sent();
                        if (!accInfo.Registered) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.fetchIPFS(accInfo.Url)];
                    case 3:
                        accInfoJson = _a.sent();
                        return [2 /*return*/, accInfoJson];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_4 = _a.sent();
                        console.log("get accountinfo error === ", e_4);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/, null];
                }
            });
        });
    };
    /**
     * Fetchs IPFS
     * @returns IPFS data if successful. Null Otherwise.
     */
    SocialAlgoApi.prototype.fetchIPFS = function (url) {
        var e_5, _a;
        return __awaiter(this, void 0, void 0, function () {
            var chunks, _b, _c, chunk, e_5_1, content, jsonData, e_6;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        console.log("SocialAlgoApi -> fetchIPFS");
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 15, , 16]);
                        chunks = [];
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 8, 9, 14]);
                        return [4 /*yield*/, this.ipfsService.get(url)];
                    case 3:
                        _b = __asyncValues.apply(void 0, [_d.sent()]);
                        _d.label = 4;
                    case 4: return [4 /*yield*/, _b.next()];
                    case 5:
                        if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 7];
                        chunk = _c.value;
                        chunks.push(chunk);
                        _d.label = 6;
                    case 6: return [3 /*break*/, 4];
                    case 7: return [3 /*break*/, 14];
                    case 8:
                        e_5_1 = _d.sent();
                        e_5 = { error: e_5_1 };
                        return [3 /*break*/, 14];
                    case 9:
                        _d.trys.push([9, , 12, 13]);
                        if (!(_c && !_c.done && (_a = _b.return))) return [3 /*break*/, 11];
                        return [4 /*yield*/, _a.call(_b)];
                    case 10:
                        _d.sent();
                        _d.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        if (e_5) throw e_5.error;
                        return [7 /*endfinally*/];
                    case 13: return [7 /*endfinally*/];
                    case 14:
                        content = Buffer.concat(chunks);
                        jsonData = content.toString();
                        return [2 /*return*/, jsonData];
                    case 15:
                        e_6 = _d.sent();
                        console.log("fetchIPFS error == ", e_6);
                        return [3 /*break*/, 16];
                    case 16: return [2 /*return*/, null];
                }
            });
        });
    };
    SocialAlgoApi.prototype.apiTransaction = function (connector, accountId, apiParam) {
        return __awaiter(this, void 0, void 0, function () {
            var txn, txnsToSign, requestParams, request, result, decodedResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTransaction(accountId, apiParam)];
                    case 1:
                        txn = _a.sent();
                        return [4 /*yield*/, this.getSigningTransaction(txn)];
                    case 2:
                        txnsToSign = _a.sent();
                        requestParams = [txnsToSign];
                        request = (0, utils_1.formatJsonRpcRequest)("algo_signTxn", requestParams);
                        return [4 /*yield*/, connector.sendCustomRequest(request)];
                    case 3:
                        result = _a.sent();
                        decodedResult = result.map(function (element) {
                            return new Uint8Array(Buffer.from(element, "base64"));
                        });
                        return [4 /*yield*/, this.apiSubmitTransactions(decodedResult)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SocialAlgoApi.prototype.getSigningTransaction = function (txn) {
        return __awaiter(this, void 0, void 0, function () {
            var txns, txnsToSign;
            return __generator(this, function (_a) {
                console.log("SocialAlgoApi -> getSigningTransaction");
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
    };
    SocialAlgoApi.prototype.getTransaction = function (accountId, apiParam) {
        return __awaiter(this, void 0, void 0, function () {
            var client, txnParams, createAccountAppTxn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("SocialAlgoApi -> getTransaction");
                        client = (0, utils_2.clientForChain)(this.chain);
                        return [4 /*yield*/, client.getTransactionParams().do()];
                    case 1:
                        txnParams = _a.sent();
                        return [4 /*yield*/, algosdk_1.default.makeApplicationOptInTxn(accountId, txnParams, config_1.APP_ID, apiParam, undefined, undefined, undefined, undefined, undefined, algosdk_1.default.getApplicationAddress(config_1.APP_ID))];
                    case 2:
                        createAccountAppTxn = _a.sent();
                        return [2 /*return*/, createAccountAppTxn];
                }
            });
        });
    };
    SocialAlgoApi.prototype.apiSubmitTransactions = function (stxns) {
        return __awaiter(this, void 0, void 0, function () {
            var txId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("SocialAlgoApi -> apiSubmitTransactions");
                        return [4 /*yield*/, (0, utils_2.clientForChain)(this.chain)
                                .sendRawTransaction(stxns)
                                .do()];
                    case 1:
                        txId = (_a.sent()).txId;
                        return [4 /*yield*/, this.waitForTransaction(this.chain, txId)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SocialAlgoApi.prototype.waitForTransaction = function (chain, txId) {
        return __awaiter(this, void 0, void 0, function () {
            var client, lastStatus, lastRound, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("SocialAlgoApi -> waitForTransaction");
                        client = (0, utils_2.clientForChain)(chain);
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
    };
    return SocialAlgoApi;
}());
exports.SocialAlgoApi = SocialAlgoApi;
