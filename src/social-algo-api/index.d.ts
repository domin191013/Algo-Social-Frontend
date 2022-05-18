import algosdk from "algosdk";
import { IAssetData, ChainType, AccInfo } from "./types";
export declare function apiGetAccountAssets(chain: ChainType, address: string): Promise<IAssetData[]>;
export declare function apiGetTxnParams(chain: ChainType): Promise<algosdk.SuggestedParams>;
/**
 * Checks if an account is registered or not
 * @returns Account Info
 */
export declare function isAccountRegistered(chain: ChainType, accountId: string): Promise<AccInfo>;
/**
 * Creates a new account from the selected address
 * @returns True if successful. False Otherwise.
 */
export declare function getCreateAccountTransaction(chain: ChainType, ipfsClient: any, wallet: string, name: string, email: string): Promise<algosdk.Transaction | null>;
/**
 * Deletes an account from the selected address
 * @returns True if successful. False Otherwise.
 */
export declare function getDeleteAccountTransaction(chain: ChainType, wallet: string): Promise<algosdk.Transaction | null>;
/**
 * Gets the account information from the given address
 * @returns Account Information in JSON format if successful. Null Otherwise.
 */
export declare function getAccount(chain: ChainType, ipfsClient: any, address: string): Promise<any>;
export { ChainType } from "./types";
export type { AccInfo } from "./types";
export { proceedTransaction } from "./utils/algo";
