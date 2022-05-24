import { Transaction } from "algosdk";
import WalletConnect from "@walletconnect/client";
import { ChainType } from "../types";
export declare function getTransaction(chain: ChainType, accountId: string, apiParam: Array<Uint8Array>): Promise<Transaction>;
export declare function getCloseOutTransaction(chain: ChainType, accountId: string, apiParam: Array<Uint8Array>): Promise<Transaction>;
export declare function proceedTransaction(chain: ChainType, txn: Transaction, connector: WalletConnect): Promise<number>;
