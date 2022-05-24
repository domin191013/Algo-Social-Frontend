import algosdk from "algosdk";
import { ChainType } from "../types";
export declare function getTransaction(chain: ChainType, accountId: string, apiParam: any): Promise<algosdk.Transaction>;
export declare function getCloseOutTransaction(chain: ChainType, accountId: string, apiParam: any): Promise<algosdk.Transaction>;
export declare function proceedTransaction(chain: ChainType, txn: any, connector: any): Promise<void>;
