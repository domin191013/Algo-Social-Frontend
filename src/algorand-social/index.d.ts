import { ChainType, SocialAccount } from "./types";
import { IPFS } from "ipfs-core-types";
import { Transaction } from "algosdk";
/**
 * Creates a new account from the selected address
 * @returns True if successful. False Otherwise.
 */
export declare function getCreateAccountTransaction(chain: ChainType, ipfsClient: IPFS, wallet: string, name: string, email: string): Promise<Transaction>;
/**
 * Deletes an account from the selected address
 * @returns True if successful. False Otherwise.
 */
export declare function getDeleteAccountTransaction(chain: ChainType, wallet: string): Promise<Transaction>;
/**
 * Gets the account information from the given address
 * @returns Account Information in JSON format if successful. Null Otherwise.
 */
export declare function getAccount(chain: ChainType, ipfsClient: IPFS, address: string): Promise<SocialAccount>;
export { ChainType } from "./types";
export type { AccInfo } from "./types";
export type { SocialAccount } from "./types";
export { proceedTransaction } from "./utils/algo";
