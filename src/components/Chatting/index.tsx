/* eslint-disable prettier/prettier */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import { Typography, TextField, Button } from "@material-ui/core";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import SendLine from "./SendLine";
import {
  createChannel,
  joinChannel,
  initializeIPFSPubSub,
  sendMessage,
} from "../../utils";
import { TextDecoder } from "text-decoding";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
    minWidth: 350,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

export default function InteractiveList(props) {
  const classes = useStyles();
  const { wallet } = props;
  const { ipfsClient } = props;
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const [ipfsPubsub, setIpfsPubsub] = React.useState(null);
  const [chats, setChats] = React.useState([]);
  const [channelName, setChannelName] = React.useState("");

  const initializeOrbitPubSub = () => {
    let pubInstance = initializeIPFSPubSub(ipfsClient, "test1");
    setIpfsPubsub(pubInstance);
  };
  const createNewChannel = () => {
    createChannel(ipfsPubsub, "", channelName);
  };

  const MessageHandler = (topic, data) => {
    let dataStr = new TextDecoder().decode(data);
    let newChats = chats;
    console.log(newChats);
    newChats.push(dataStr);
    console.log(newChats);
    setChats(newChats);
  };

  const PeerHandler = (topic, peer) => {
    console.log(peer);
  };

  const joinToChannel = () => {
    joinChannel(ipfsPubsub, "", channelName, MessageHandler, PeerHandler);
  };

  const publishMessage = (message) => {
    sendMessage(ipfsPubsub, "", channelName, message);
  };

  const ChannelManage = () => {
    return (
      <div
        style={{
          left: "25%",
          marginTop: "3%",
          paddingLeft: "25%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          height: "500px",
          width: "100%",
          flexWrap: "nowrap",
          alignItems: "stretch",
          alignContent: "space-around",
        }}
      >
        <br />
        <br />
        <Button
          color="primary"
          variant="contained"
          onClick={initializeOrbitPubSub}
          disabled={ipfsPubsub != null}
        >
          Initialize OrbitDb Pubsub
        </Button>
        <br />
        <TextField
          label="Name of channel"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
          variant="outlined"
        />
        <br />
        <Button color="primary" variant="contained" onClick={createNewChannel}>
          Create a new channel
        </Button>
        <br />
        {/* <TextField
          label="Address of the channel owner"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
          variant="outlined"
        />
        <br />
        <TextField
          label="Name of the channel"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
          variant="outlined"
        /> */}
        {/* <br /> */}
        <Button color="primary" variant="contained" onClick={joinToChannel}>
          Join to a channel
        </Button>
      </div>
    );
  };

  const ChatItem = ({ message }) => {
    return <div>{message}</div>;
  };

  const ChattingPanel = () => {
    return (
      <div>
        <Typography variant="h6" className={classes.title}>
          Chat History
        </Typography>
        <div
          style={{
            height: "calc(100vh - 100px)",
            border: "1px solid #cccccc",
            marginBottom: 3,
          }}
        >
          {console.log(chats)}
          {chats.map((e, index) => (
            <ChatItem message={e} key={index} />
          ))}
        </div>
        <SendLine publishMessage={publishMessage} />
      </div>
    );
  };

  const ChannelList = () => {
    return (
      <div>
        <List dense={dense}>
          <Typography variant="h6" className={classes.title}>
            Channels
          </Typography>

          {generate(
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Single-line item"
                secondary={secondary ? "Secondary text" : null}
              />
            </ListItem>
          )}
        </List>
      </div>
    );
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
      {/* <div
        style={{
          left: "25%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          height: "500px",
          flexWrap: "nowrap",
          alignItems: "stretch",
          alignContent: "space-around",
        }}
      >
        <ChannelList />
      </div> */}
      <div style={{ width: 50 }}></div>
      <div>
        <ChattingPanel />
      </div>
      <div style={{ width: 50 }}></div>
      <div>
        <ChannelManage />
      </div>
    </div>
  );
}
