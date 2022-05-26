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
exports.leaveChannel = exports.joinChannel = exports.sendMessage = exports.createChannel = exports.getChannelName = exports.addChannelInfo = exports.getChannelInfos = exports.createChannelDb = exports.getChannelDbAddress = exports.createOrbitDbClient = exports.initializeIPFSPubSub = void 0;
var OrbitDB = require("orbit-db");
var IPFSPubsub = require("orbit-db-pubsub");
// import Store from "orbit-db-store";
var initializeIPFSPubSub = function (ipfsClient, id) {
    if (ipfsClient == undefined || ipfsClient == null)
        throw new Error("IPFS instance is empty");
    if (id == "")
        throw new Error("Id of IPFS Pub sub is empty");
    return new IPFSPubsub(ipfsClient, id);
};
exports.initializeIPFSPubSub = initializeIPFSPubSub;
var createOrbitDbClient = function (ipfsClient) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, OrbitDB.createInstance(ipfsClient)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.createOrbitDbClient = createOrbitDbClient;
var getChannelDbAddress = function (address) {
    return "".concat(address, "/channelInfo");
};
exports.getChannelDbAddress = getChannelDbAddress;
var createChannelDb = function (address, orbitDb) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, orbitDb.create((0, exports.getChannelDbAddress)(address), "feed", {
                    accessController: {
                        write: ["*"],
                    },
                    overwrite: true,
                    replicate: false,
                })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.createChannelDb = createChannelDb;
var getChannelInfos = function (address, orbitDb) { return __awaiter(void 0, void 0, void 0, function () {
    var channelDb, channelInfos;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                channelDb = orbitDb.feed((0, exports.getChannelDbAddress)(address));
                return [4 /*yield*/, channelDb.load()];
            case 1:
                _a.sent();
                channelInfos = channelDb
                    .iterator({ limit: -1 })
                    .collect()
                    .map(function (e) { return e.payload.value; })
                    .filter(function (e) { return e !== undefined; });
                return [2 /*return*/, channelInfos];
        }
    });
}); };
exports.getChannelInfos = getChannelInfos;
var addChannelInfo = function (address, orbitDb, channelOwner, channelName) { return __awaiter(void 0, void 0, void 0, function () {
    var channelDb, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                channelDb = orbitDb.feed((0, exports.getChannelDbAddress)(address));
                return [4 /*yield*/, channelDb.load()];
            case 1:
                _a.sent();
                return [4 /*yield*/, channelDb.add({ owner: channelOwner, name: channelName })];
            case 2:
                _a.sent();
                return [2 /*return*/, true];
            case 3:
                e_1 = _a.sent();
                console.log("Error occurred in addChannelInfo : ", e_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/, false];
        }
    });
}); };
exports.addChannelInfo = addChannelInfo;
var getChannelName = function (address, name) {
    return "".concat(address, " - ").concat(name);
};
exports.getChannelName = getChannelName;
var createChannel = function (ipfsPubsubClient, address, name) { return __awaiter(void 0, void 0, void 0, function () {
    var firstLine;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (ipfsPubsubClient == undefined || ipfsPubsubClient == null)
                    throw new Error("IPFS Pub Sub instance is empty");
                firstLine = "A new channel has been created.";
                if ((0, exports.getChannelName)(address, name) == "")
                    throw new Error("Channel name shouldn't be empty");
                return [4 /*yield*/, ipfsPubsubClient.publish((0, exports.getChannelName)(address, name), firstLine)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.createChannel = createChannel;
var sendMessage = function (ipfsPubsubClient, address, name, message) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (ipfsPubsubClient == undefined || ipfsPubsubClient == null)
                    throw new Error("IPFS Pub Sub instance is empty");
                if ((0, exports.getChannelName)(address, name) == "")
                    throw new Error("Channel name shouldn't be empty");
                return [4 /*yield*/, ipfsPubsubClient.publish((0, exports.getChannelName)(address, name), message)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.sendMessage = sendMessage;
var joinChannel = function (ipfsPubsubClient, address, name, onMessageHandler, onNewPeerHandler) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (ipfsPubsubClient == undefined || ipfsPubsubClient == null)
            throw new Error("IPFS Pub Sub instance is empty");
        if ((0, exports.getChannelName)(address, name) == "")
            throw new Error("Channel name shouldn't be empty");
        ipfsPubsubClient.subscribe((0, exports.getChannelName)(address, name), onMessageHandler, onNewPeerHandler);
        return [2 /*return*/];
    });
}); };
exports.joinChannel = joinChannel;
var leaveChannel = function (ipfsPubsubClient, address, name) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ipfsPubsubClient.unsubscribe((0, exports.getChannelName)(address, name))];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.leaveChannel = leaveChannel;
