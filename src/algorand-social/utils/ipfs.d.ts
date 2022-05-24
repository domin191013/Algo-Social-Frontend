import { SocialAccount } from "../types";
import { IPFS } from "ipfs-core-types";
export declare function addAccount(ipfsClient: IPFS, accountInfo: SocialAccount): Promise<import("ipfs-core-types/src/root").AddResult>;
export declare function get(ipfsClient: IPFS, url: string): Promise<AsyncIterable<Uint8Array>>;
/**
 * Fetchs IPFS
 * @returns IPFS data if successful. {} Otherwise.
 */
export declare function fetchIPFS(ipfsClient: IPFS, url: string): Promise<object>;
