"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppId = exports.indexerForChain = exports.clientForChain = void 0;
var algosdk_1 = __importDefault(require("algosdk"));
var types_1 = require("../types");
var config_1 = require("../config");
var mainNetClient = new algosdk_1.default.Algodv2("", "https://algoexplorerapi.io", "");
var mainNetIndexer = new algosdk_1.default.Indexer("", "https://indexer.algosnet.io", "");
var testNetClient = new algosdk_1.default.Algodv2("", "https://node.testnet.algoexplorerapi.io", "");
var testNetIndexer = new algosdk_1.default.Indexer("", "https://algoindexer.testnet.algoexplorerapi.io", "");
function clientForChain(chain) {
    switch (chain) {
        case types_1.ChainType.MainNet:
            return mainNetClient;
        case types_1.ChainType.TestNet:
            return testNetClient;
        default:
            throw new Error("Unknown chain type: ".concat(chain));
    }
}
exports.clientForChain = clientForChain;
function indexerForChain(chain) {
    switch (chain) {
        case types_1.ChainType.MainNet:
            return mainNetIndexer;
        case types_1.ChainType.TestNet:
            return testNetIndexer;
        default:
            throw new Error("Unknown chain type: ".concat(chain));
    }
}
exports.indexerForChain = indexerForChain;
function getAppId(chain) {
    switch (chain) {
        case types_1.ChainType.MainNet:
            return config_1.appIdMainNet;
        case types_1.ChainType.TestNet:
            return config_1.appIdTestNet;
        default:
            throw new Error("Unknown chain type: ".concat(chain));
    }
}
exports.getAppId = getAppId;
