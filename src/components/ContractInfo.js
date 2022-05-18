import React, { useState, useEffect } from 'react';
import {
    getCreateAccountTransaction,
    getAccount,
    getDeleteAccountTransaction,
    proceedTransaction,
    proceedCloseOutTransaction
}
    from "../social-algo-api";
import { ChainType } from "../social-algo-api";
import { connector } from '../adapters/walletConnect';
import { Button } from '@material-ui/core';
import { create } from "ipfs";

const ContractInfo = ({ wallet }) => {
    const [txn, setTxn] = useState();
    const [accountInfo, setAccountInfo] = useState();
    const [ipfsClient, setIpfsClient] = useState(null);

    useEffect(() => {
        initializeIpfs();
    }, []);

    useEffect(() => {
        initializeIpfs();
    }, [wallet]);

    const initializeIpfs = () => {
        if (ipfsClient != null)
            return;
        create({ repo: "ok" + Math.random() }).then(result => {
            console.log("IPFS, ", result);
            setIpfsClient(result);
            handleGet(result);
        }).catch(e => console.log("Error in ipfs : " + e.toString()));
    }

    const handleGet = (_ipfsClient) => {
        if (wallet) {
            getAccount(ChainType.TestNet, _ipfsClient, wallet).then(result => {
                setAccountInfo(result);
            }).catch(e => initializeIpfs());
        }
    }

    const handleCreate = () => {
        getCreateAccountTransaction(ChainType.TestNet, ipfsClient, wallet, "John Doe", "john@gmail.com").then(txn => {
            setTxn(txn);
            console.log(txn);
            proceedTransaction(ChainType.TestNet, txn, connector).then(() => handleGet(ipfsClient));
        });
    }

    const handleDelete = () => {
        getDeleteAccountTransaction(ChainType.TestNet, wallet).then(txn => {
            setTxn(txn);
            console.log(txn);
            proceedTransaction(ChainType.TestNet, txn, connector).then(() => handleGet(ipfsClient));
        });
    }

    return (
        <div>
            <h2>Account Info</h2>
            <p>Account Info: {JSON.stringify(accountInfo)}</p>
            <br />
            <Button color="primary"
                disabled={wallet == ""}
                variant="contained" onClick={handleGet}
            >
                Get account
            </Button>
            <br />
            <Button color="primary"
                style={{
                    marginTop: '5%',
                }}
                disabled={wallet == ""}
                variant="contained" onClick={handleCreate}
            >
                Create account
            </Button>
            <br />
            <Button color="primary"
                style={{
                    marginTop: '5%',
                }}
                disabled={wallet == ""}
                variant="contained" onClick={handleDelete}
            >
                Delete account
            </Button>

        </div >
    );
};

export default ContractInfo;
