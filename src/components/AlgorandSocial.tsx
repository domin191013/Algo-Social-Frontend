/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import { connector } from "../adapters/walletConnect";
import { Button } from "@material-ui/core";
import {
  getCreateAccountTransaction,
  getAccount,
  getDeleteAccountTransaction,
  proceedTransaction,
} from "../algorand-social";
import { ChainType, SocialAccount } from "../algorand-social";
import { create } from "ipfs";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import { Transaction } from "algosdk";

const AlgorandSocial = () => {
  const [wallet, setWallet] = useState("");
  const [txn, setTxn] = useState<Transaction>();
  const [accountInfo, setAccountInfo] = useState<SocialAccount>();
  const [ipfsClient, setIpfsClient] = useState<IPFS>(null);

  useEffect(() => {
    if (connector.connected) {
      console.log("Current wallet is", connector.accounts[0]);
      setWallet(connector.accounts[0]);
    }
  }, []);

  const initializeIpfs = () => {
    if (ipfsClient != null) return;
    create({ repo: "ok" + Math.random() }).then((result) => {
      console.log("IPFS, ", result);
      setIpfsClient(result);
    });
  };

  const handleGet = () => {
    if (wallet) {
      getAccount(ChainType.TestNet, ipfsClient, wallet).then((result) => {
        setAccountInfo(result);
      });
    }
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
      proceedTransaction(ChainType.TestNet, txn, connector).then(() =>
        handleGet()
      );
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
    if (!connector.connected) return;
    connector.killSession();
    setWallet("");
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

  return (
    <div
      style={{
        left: "25%",
        marginTop: "5%",
        marginLeft: "25%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        height: "630px",
        width: "50%",
        flexWrap: "nowrap",
        alignItems: "center",
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

      <h2>Account Info</h2>
      <p>Account Info: {JSON.stringify(accountInfo)}</p>

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
  );
};

export default AlgorandSocial;
