export declare const appIdTestNet = 73658774;
export declare const appIdMainNet = 73658774;
export declare const server = "https://testnet-algorand.api.purestake.io/ps2";
export declare const token: {
    "X-API-Key": string;
};
export declare const port = "";
export declare const indexerServer = "https://testnet-algorand.api.purestake.io/idx2";
export declare const indexerPort = "";
export declare const ipfsOptions: {
    repo: string;
    start: boolean;
    EXPERIMENTAL: {
        pubsub: boolean;
    };
    config: {
        Addresses: {
            Swarm: string[];
        };
    };
    relay: {
        enabled: boolean;
        hop: {
            enabled: boolean;
        };
    };
    pubsub: boolean;
};
