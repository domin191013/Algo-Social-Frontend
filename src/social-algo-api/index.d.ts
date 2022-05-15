import algosdk from "algosdk";
import { IAssetData, ChainType } from "./types";
import { IpfsService } from "./utils/ipfs";
export interface AccInfo {
    Registered: boolean;
    Url: string;
}
export declare class SocialAlgoApi {
    chain: ChainType;
    ipfsService: IpfsService;
    constructor();
    initialize(chainType: string): Promise<void>;
    apiGetAccountAssets(address: string): Promise<IAssetData[]>;
    apiGetTxnParams(): Promise<algosdk.SuggestedParams>;
    /**
     * Checks if an account is registered or not
     * @returns Account Info
     */
    isAccountRegistered(accountId: string): Promise<AccInfo>;
    /**
     * Creates a new account from the selected address
     * @returns True if successful. False Otherwise.
     */
    createAccount(accountId: string, connector: any, name: string, email: string): Promise<boolean>;
    /**
     * Deletes an account from the selected address
     * @returns True if successful. False Otherwise.
     */
    deleteAccount(connector: any, address: string): Promise<boolean>;
    /**
     * Gets the account information from the given address
     * @returns Account Information in JSON format if successful. Null Otherwise.
     */
    getAccount(address: string): Promise<string | null>;
    /**
     * Fetchs IPFS
     * @returns IPFS data if successful. Null Otherwise.
     */
    fetchIPFS(url: string): Promise<string | null>;
    apiTransaction(connector: any, accountId: string, apiParam: any): Promise<void>;
    getSigningTransaction(txn: any): Promise<{
        txn: string;
        message: string;
    }[]>;
    getTransaction(accountId: string, apiParam: any): Promise<algosdk.Transaction>;
    apiSubmitTransactions(stxns: Uint8Array[]): Promise<number>;
    waitForTransaction(chain: ChainType, txId: string): Promise<number>;
}
