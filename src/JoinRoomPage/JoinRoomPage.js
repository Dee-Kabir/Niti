import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { setIsRoomHost } from "../store/actions";
import JoinRoomContent from "./JoinRoomContent";
import "./JoinRoomPage.css";
import JoinRoomTitle from "./JoinRoomTitle";
import LoadingOverlay from "./LoadingOverlay";

const JoinRoomPage = (props) => {
  const { setIsRoomHostAction, isRoomHost } = props;
  const [name, setName] = useState("")
  const [userId, setUserId] = useState("")
  const search = useLocation().search;
  useEffect(()=>{
    const hostName = new URLSearchParams(search).get("name");
    setName(hostName)
  },[])
  useEffect(() => {
    const isRoomHost = new URLSearchParams(search).get("host");
    console.log("isRoomHost",isRoomHost)
    if (isRoomHost==="true" || isRoomHost===true) {
      const userId = new URLSearchParams(search).get("userId");
      setUserId(userId);
      setIsRoomHostAction(true);
    }else{
      const doctorId = new URLSearchParams(search).get("doctorId")
      console.log(doctorId)
      setUserId(doctorId);
      setIsRoomHostAction(false);
    }
  }, [search, setIsRoomHostAction]);

  const [showLoadingOverlay, setShowLoadingOverlay] = useState(false);

  return (
    <div className="join_room_page_container">
      <div className="join_room_page_panel">
        <JoinRoomTitle isRoomHost={isRoomHost} />
        <JoinRoomContent setShowLoadingOverlay={setShowLoadingOverlay} name={name} userId={userId} />
        {showLoadingOverlay && <LoadingOverlay />}
      </div>
    </div>
  );
};

const mapStoreStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setIsRoomHostAction: (isRoomHost) => dispatch(setIsRoomHost(isRoomHost)),
  };
};

export default connect(mapStoreStateToProps, mapDispatchToProps)(JoinRoomPage);
