"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipfsOptions = exports.indexerPort = exports.indexerServer = exports.port = exports.token = exports.server = exports.appIdMainNet = exports.appIdTestNet = void 0;
// Network Configuration
exports.appIdTestNet = 73658774;
exports.appIdMainNet = 73658774;
exports.server = 'https://testnet-algorand.api.purestake.io/ps2';
exports.token = { 'X-API-Key': 'SxyeYnXjIi7sydMnmi85L8mqXypdroBv1ZdTcBmp ' };
exports.port = '';
// Test Network Indexer
exports.indexerServer = 'https://testnet-algorand.api.purestake.io/idx2';
exports.indexerPort = '';
exports.ipfsOptions = {
    EXPERIMENTAL: {
        pubsub: true,
    },
    config: {
        Addresses: {
            Swarm: [
                // Use IPFS dev signal server
                // Websocket:
                // '/dns4/ws-star-signal-1.servep2p.com/tcp/443/wss/p2p-websocket-star',
                // '/dns4/ws-star-signal-2.servep2p.com/tcp/443/wss/p2p-websocket-star',
                // '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star',
                // WebRTC:
                // '/dns4/star-signal.cloud.ipfs.team/wss/p2p-webrtc-star',
                "/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star/",
                "/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star/",
                "/dns4/webrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star/",
                // Use local signal server
                // '/ip4/0.0.0.0/tcp/9090/wss/p2p-webrtc-star',
            ],
        },
    },
};
