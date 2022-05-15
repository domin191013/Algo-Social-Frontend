import algosdk, { Indexer } from "algosdk";
import { ChainType } from "../types";
export declare function clientForChain(chain: ChainType): algosdk.Algodv2;
export declare function indexerForChain(chain: ChainType): Indexer;
