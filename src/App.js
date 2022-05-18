import React, { useState, useEffect } from 'react';
import { connector } from './adapters/walletConnect';
import { Button } from '@material-ui/core';
import { depositAlgo } from "./helper/deposit";
import * as IPFS from "ipfs";
import ContractInfo from "./components/ContractInfo";

const App = () => {
    const [wallet, setWallet] = useState("");

    let ipfsClient;

    const createAccount = () => {
        IPFS.create().then(result => { ipfsClient = result });
    }
    useEffect(() => {
        createAccount();
        if (connector.connected) {
            console.log("Current wallet is", connector.accounts[0]);
            setWallet(connector.accounts[0]);
        }
        const escFunction = (event) => {
            if (event.keyCode === 27) QRCodeModal.close();
        };
        document.addEventListener("keydown", escFunction, false);
        return () => {
            document.removeEventListener("keydown", escFunction, false);
        };
    }, []);

    const connectToMobileWallet = () => {
        if (connector.connected) return;
        if (connector.pending) return QRCodeModal.open(connector.uri);
        connector.createSession();
    };

    const disconnectMobileWallet = () => {
        if (!connector.connected) return;
        connector.killSession();
        setWallet("");
    };

    const deposit = () => {
        depositAlgo(88976654, wallet).then((result) => console.log(result));
    }

    connector.on("connect", (error, payload) => {
        try {
            if (error) {
                throw error;
            }
            console.log("Wallet Connected");
            setWallet(connector.accounts[0]);
        } catch (error) {
            console.error(error);
        }
    });

    connector.on("disconnect", (error) => {
        try {
            if (error) {
                throw error;
            }
            console.log("Wallet Disconnected");
            localStorage.clear();
        } catch (error) {
            console.error(error);
        }
    });

    return (
        <div
            style={{
                left: '25%',
                marginTop: '5%',
                marginLeft: '25%',
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                height: "630px",
                width: "50%",
                flexWrap: "nowrap",
                alignItems: "center",
                alignContent: "space-around"
            }}
        >
            <Button color="primary"
                variant="contained"
                disabled={wallet != ""} onClick={() => { connectToMobileWallet() }}
            >
                Connect Wallet
            </Button>
            <Button color="primary"
                variant="contained"
                disabled={wallet == ""} onClick={() => { disconnectMobileWallet() }}
            >
                Disconnect Wallet
            </Button>
            <Button color="primary"
                disabled={wallet == ""}
                variant="contained" onClick={() => { deposit() }}
            >
                Deposit 0.3 algo
            </Button>
            <ContractInfo disabled={wallet == ""} wallet={wallet} />
        </div>
    );
};

export default App;