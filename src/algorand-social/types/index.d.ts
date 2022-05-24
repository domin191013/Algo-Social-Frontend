export interface IAssetData {
    id: number;
    amount: bigint;
    creator: string;
    frozen: boolean;
    decimals: number;
    name?: string;
    unitName?: string;
    url?: string;
}
export interface AccInfo {
    Registered: boolean;
    Url: string;
}
export declare enum ChainType {
    MainNet = "mainnet",
    TestNet = "testnet"
}
export interface SocialAccount {
    address: string;
    name: string;
    email: string;
}
