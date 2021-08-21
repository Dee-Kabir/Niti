import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  setConnectOnlyWithAudio,
  setIdentity,
  setRoomId,
} from "../store/actions";
import JoinRoomButtons from "./JoinRoomButtons";
import JoinRoomInput from "./JoinRoomInput";
import OnlyWithAudioCheckbox from "./OnlyWithAudioCheckbox";
import RoomNotFoundMessage from "./RoomNotFoundMessage";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { checkIfRoomExists } from "../utils/twilioUtils";
import {setRoomIdOfHostInFirebase,getRoomId} from "../actions/firebaseapi"
const JoinRoomContent = (props) => {
  const {
    isRoomHost,
    setConnectOnlyWithAudioAction,
    connectOnlyWithAudio,
    setRoomIdAction,
    setIdentityAction,
    setShowLoadingOverlay,
  } = props;
  const [roomIdValue, setRoomIdValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [showRoomNotFoundMessage, setShowRoomNotFoundMessage] = useState(false);
  useEffect(()=>{
    setNameValue(props.name)
    
  },[props.name])
  const history = useHistory();
  useEffect(()=>{
    if(isRoomHost==="false" || isRoomHost===false){
      console.log("isRoomHost",isRoomHost)
      if(props.userId){
        getRoomId(props.userId).then((data)=>{
          if(data){
            console.log(data)
            setRoomIdValue(data)
          }
        })
      }
      
    }
  },[props.userId]);
  const handleJoinToRoom = async () => {
    setIdentityAction(nameValue);
    if (isRoomHost==="false" || isRoomHost===false) {
      setShowLoadingOverlay(true);
      const roomExists = await checkIfRoomExists(roomIdValue);
      setShowLoadingOverlay(false);
      if (roomExists) {
        setRoomIdAction(roomIdValue);
        history.push("/room");
      } else {
        setShowRoomNotFoundMessage(true);
      }
    } else {
      const uuidV4ForHost = uuidv4()
      setRoomIdOfHostInFirebase(uuidV4ForHost,props.userId).then(()=>{
        setRoomIdAction(uuidV4ForHost);
        history.push("/room");
      })
      
    }
  };

  return (
    <>
      <JoinRoomInput
        roomId={roomIdValue}
        setRoomIdValue={setRoomIdValue}
        nameValue={nameValue}
        setNameValue={setNameValue}
        isRoomHost={isRoomHost}
      />
      <OnlyWithAudioCheckbox
        setConnectOnlyWithAudio={setConnectOnlyWithAudioAction}
        connectOnlyWithAudio={connectOnlyWithAudio}
      />
      <RoomNotFoundMessage showRoomNotFoundMessage={showRoomNotFoundMessage} />
      <JoinRoomButtons
        isRoomHost={isRoomHost}
        handleJoinToRoom={handleJoinToRoom}
      />
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setConnectOnlyWithAudioAction: (onlyWithAudio) =>
      dispatch(setConnectOnlyWithAudio(onlyWithAudio)),
    setIdentityAction: (identity) => dispatch(setIdentity(identity)),
    setRoomIdAction: (id) => dispatch(setRoomId(id)),
  };
};

const mapStoreStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(
  mapStoreStateToProps,
  mapDispatchToProps
)(JoinRoomContent);
