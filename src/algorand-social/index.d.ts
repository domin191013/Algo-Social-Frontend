import { ChainType } from "./types";
import { IPFS } from "ipfs-core-types";
/**
 * Creates a new account from the selected address
 * @returns True if successful. False Otherwise.
 */
export declare function getCreateAccountTransaction(chain: ChainType, ipfsClient: IPFS, wallet: string, name: string, email: string): Promise<import("algosdk").Transaction | null>;
/**
 * Deletes an account from the selected address
 * @returns True if successful. False Otherwise.
 */
export declare function getDeleteAccountTransaction(chain: ChainType, wallet: string): Promise<import("algosdk").Transaction | null>;
/**
 * Gets the account information from the given address
 * @returns Account Information in JSON format if successful. Null Otherwise.
 */
export declare function getAccount(chain: ChainType, ipfsClient: IPFS, address: string): Promise<object | null>;
export { ChainType } from "./types";
export type { AccInfo } from "./types";
export { proceedTransaction } from "./utils/algo";
