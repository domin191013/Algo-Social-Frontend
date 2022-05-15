import React, { useState, useEffect } from 'react';
import { SocialAlgoApi } from "../social-algo-api";
import { connector } from '../adapters/walletConnect';
import { Button } from '@material-ui/core';

const ContractInfo = ({ wallet, chain }) => {
    const [accountInfo, setAccountInfo] = useState();
    let socialAlgoApiInstance = new SocialAlgoApi();

    useEffect(() => {
        socialAlgoApiInstance.initialize("testnet");
    }, []);

    useEffect(() => {
        handleGet();
    }, [wallet]);

    const handleGet = () => {
        if (wallet) {
            socialAlgoApiInstance.getAccount(wallet).then(result => setAccountInfo(result));
        }
    }

    const handleCreate = () => {
        socialAlgoApiInstance.createAccount(wallet, connector, "John Doe", "john@gmail.com").then(result => {
            handleGet();
        });
    }

    const handleDelete = () => {
        socialAlgoApiInstance.deleteAccount(connector, wallet).then(result => {
            handleGet();
        });
    }

    return (
        <div>
            <h2>Account Info</h2>
            <p>Account Info: {JSON.stringify(accountInfo)}</p>
            <Button color="primary"
                disabled={wallet == ""}
                variant="contained" onClick={handleCreate}
            >
                Create account
            </Button>
            <br />
            <Button color="primary"
                disabled={wallet == ""}
                variant="contained" onClick={handleDelete}
            >
                Delete account
            </Button>

        </div >
    );
};

export default ContractInfo;
