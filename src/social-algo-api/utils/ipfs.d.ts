import { SocialAccount } from "../types";
export declare class IpfsService {
    ipfsClient: any;
    initialize(): Promise<void>;
    addAccount(accountInfo: SocialAccount): Promise<any>;
    get(url: string): Promise<any>;
}
