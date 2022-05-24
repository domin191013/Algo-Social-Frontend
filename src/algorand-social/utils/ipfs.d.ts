import { SocialAccount } from "../types";
export declare function addAccount(ipfsClient: any, accountInfo: SocialAccount): Promise<any>;
export declare function get(ipfsClient: any, url: string): Promise<any>;
/**
 * Fetchs IPFS
 * @returns IPFS data if successful. Null Otherwise.
 */
export declare function fetchIPFS(ipfsClient: any, url: string): Promise<any>;
