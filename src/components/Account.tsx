/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import algosdk, { Transaction } from "algosdk";
import { Button, TextField } from "@material-ui/core";

import { connector } from "../adapters/walletConnect";
import {
  getCreateAccountTransaction,
  getAccount,
  getDeleteAccountTransaction,
  proceedTransaction,
  proceedTransactionWithSk,
  createIpfsClient,
  createOrbitDbClient
} from "../algorand-social";
import { ChainType, SocialAccount } from "../algorand-social";

const Accout = (props) => {
  const [txn, setTxn] = useState<Transaction>();
  const [accountInfo, setAccountInfo] = useState<SocialAccount>();
  const {wallet, setWallet} = props;
  const {mnemonic, setMnemonic} = props;
  const {secretKey, setSecretKey} = props;
  const {ipfsClient, setIpfsClient} = props;
  const {orbitClient, setOrbitClient} = props;
  
  useEffect(() => {
    if (connector.connected) {
      console.log("Current wallet is", connector.accounts[0]);
      setWallet(connector.accounts[0]);
    }
  }, []);

  const initializeIpfs = () => {
    if (ipfsClient != null) return;
    createIpfsClient().then((result) => {
      setIpfsClient(result);
    });
  };

  const initializeOrbitDb = () => {
    if (orbitClient != null) return;
    createOrbitDbClient(ipfsClient).then((result) => {
      setOrbitClient(result);
    });
  };
  

  const handleGet = () => {
    getAccount(ChainType.TestNet, ipfsClient, wallet).then((result) => {
      setAccountInfo(result);
    });
  };

  const handleCreate = () => {
    getCreateAccountTransaction(
      ChainType.TestNet,
      ipfsClient,
      wallet,
      "John Doe",
      "john@gmail.com"
    ).then((txn) => {
      setTxn(txn);
      console.log(txn);

      if (secretKey != undefined && secretKey != null) {
        proceedTransactionWithSk(ChainType.TestNet, txn, secretKey).then(() =>
          handleGet()
        );
      } else {
        proceedTransaction(ChainType.TestNet, txn, connector).then(() =>
          handleGet()
        );
      }
    });
  };

  const handleDelete = () => {
    getDeleteAccountTransaction(ChainType.TestNet, wallet).then((txn) => {
      setTxn(txn);
      console.log(txn);
      proceedTransaction(ChainType.TestNet, txn, connector).then(() =>
        handleGet()
      );
    });
  };

  const connectToMobileWallet = () => {
    if (connector.connected) return;
    if (connector.pending) return QRCodeModal.open(connector.uri);
    connector.createSession();
  };

  const disconnectMobileWallet = () => {
    setWallet("");
    setSecretKey();

    if (!connector.connected) return;
    connector.killSession();
  };

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

  const connectWithMnemonic = () => {
    let recoveredAccount = algosdk.mnemonicToSecretKey(mnemonic);
    setWallet(recoveredAccount.addr);
    setSecretKey(recoveredAccount.sk);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <div style={{ width: 1 }}></div>
      <div>
        <div
          style={{
            left: "25%",
            marginTop: "3%",
            paddingLeft: "25%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            height: "500px",
            width: "100%",
            flexWrap: "nowrap",
            alignItems: "stretch",
            alignContent: "space-around",
          }}
        >
          <Button
            color="primary"
            variant="contained"
            disabled={wallet != ""}
            onClick={() => {
              connectToMobileWallet();
            }}
          >
            Connect Wallet
          </Button>
          <TextField
            label="Seed Phrase"
            multiline
            value={mnemonic}
            onChange={(e) => setMnemonic(e.target.value)}
            disabled={wallet != ""}
            minRows={3}
            variant="outlined"
          />
          <Button
            color="primary"
            variant="contained"
            disabled={wallet != ""}
            onClick={() => {
              connectWithMnemonic();
            }}
          >
            Connect With Seed Phrase
          </Button>
          <Button
            color="primary"
            variant="contained"
            disabled={wallet == ""}
            onClick={() => {
              disconnectMobileWallet();
            }}
          >
            Disconnect Wallet
          </Button>

          <Button
            color="primary"
            disabled={ipfsClient != null}
            variant="contained"
            onClick={initializeIpfs}
          >
            Initialize IPFS
          </Button>

          <Button
            color="primary"
            disabled={ipfsClient == null || orbitClient != null}
            variant="contained"
            onClick={initializeOrbitDb}
          >
            Initialize Orbit DB
          </Button>

          <Button
            color="primary"
            disabled={wallet == "" || ipfsClient == null}
            variant="contained"
            onClick={handleGet}
          >
            Get account
          </Button>

          <Button
            color="primary"
            disabled={wallet == "" || ipfsClient == null}
            variant="contained"
            onClick={handleCreate}
          >
            Create account
          </Button>

          <Button
            color="primary"
            disabled={wallet == ""}
            variant="contained"
            onClick={handleDelete}
          >
            Delete account
          </Button>
        </div>
      </div>
      <div style={{ width: 150 }}></div>
      <div>
        <h2>Account Information</h2>
        <h4>Wallet: {wallet}</h4>
        <h4>Name: {accountInfo?.name}</h4>
        <h4>Email: {accountInfo?.email}</h4>
      </div>
    </div>
  );
};

export default Accout;
