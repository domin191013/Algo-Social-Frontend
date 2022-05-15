import algosdk from "algosdk";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import { encodeUint64, getApplicationAddress, makeApplicationNoOpTxn, } from "algosdk";
import { connector } from "../adapters/walletConnect";

export const algoProvider = new algosdk.Algodv2('', 'https://testnet-api.algonode.cloud/', 443);

export const depositAlgo = (appId, user) => {
    return new Promise(resolve => {
        algoProvider.getTransactionParams()
            .do()
            .then((params) => getTransaction(appId, user, params))
            .then(txn => transact(txn))
            .then(() => resolve())
    });
}

const transact = (txn) => {
    return new Promise((resolve => {
        getTransactionRequest(txn)
            .then(request => connector.sendCustomRequest(request))
            .then(result => Promise.resolve(result.map((element, idx) => {
                return element ? {
                    txID: txn.txID(),
                    blob: new Uint8Array(Buffer.from(element, "base64"))
                } : {
                        txID: txn.txID(),
                        blob: new Uint8Array()
                    };
            })))
            .then(result => {
                algoProvider
                    .sendRawTransaction(result.map((t) => { return t.blob }))
                    .do()
                    .then(txId => Promise.resolve(txId))
            })
            .then(txId => {
                algosdk.waitForConfirmation(algoProvider, txId, 3).then((result) => {
                    console.log("Result of waitForConfirmation", result);
                    resolve();
                });
            })
    }));
}

const getTransaction = (appId, user, params) => {
    console.log("getTransaction", appId, user, params);
    return new Promise((resolve) => {
        const enc = new TextEncoder();
        const depositAmount = 3 * 1e5; //0.3 Algo

        let opTxn = makeApplicationNoOpTxn(
            user,
            { ...params, flatFee: true, fee: 2000 }, // must pay for inner transaction
            appId,
            [enc.encode("deposit"), encodeUint64(depositAmount)],
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            getApplicationAddress(appId), // rekey to application address
        );
        resolve(opTxn);
    });
}

const getTransactionRequest = (txn) => {
    console.log("getTransactionRequest", txn);
    return new Promise((resolve) => {
        const txnToSign = [
            {
                txn: Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64"),
            },
        ];

        const request = formatJsonRpcRequest("algo_signTxn", [txnToSign]);
        resolve(request);
    });
}