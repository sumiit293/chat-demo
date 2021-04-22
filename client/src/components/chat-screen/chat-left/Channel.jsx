import React, { useState ,useEffect } from 'react';
import { connect } from 'react-redux';
import {JOIN_ROOM, JOINED_TO_ROOM,LEAVE_ROOM,YOU_JOINED_THE_ROOM,NOTIFICATION_MSG} from './../../../Events';
import {updateChat} from './../chat-store/action';


export const Channel = (props)=> {

  const {channelName,members} = props.channel;
  const [localMember,setLocalMember] = useState(members);
  const {socket,userInfo,setChatState} = props;
  const [activeUsers,setActiveUsers] = useState([]);

  function initSocket (socket) {
    const channel_id = props.channel._id
    if(!!socket && !!userInfo){
      // emitting the event to join the room
      const infoForRoomJoin = {
        channel_id: channel_id,
        name: props.userInfo.name,
        id: props.userInfo.id,
        socket_id: socket.id
      }
      socket.emit(JOIN_ROOM,infoForRoomJoin);
      //confirmation that you have joined the room
      socket.on(YOU_JOINED_THE_ROOM,(info)=>{
        // to do
        //eslint-disable-next-line
        if(info.id == userInfo.id && channel_id == info.channel_id){
          console.log(info);
        setActiveUsers([...new Set(info.userInChannel)])
        }
      })

      //when someone joins the room
      socket.on(JOINED_TO_ROOM,(value)=>{
        if(value.channel_id === channel_id){
          const newUsers = activeUsers;
          newUsers.push(value.id);
          setActiveUsers([...new Set(newUsers)]);
        }
      })

      //when somene joins channel for first time
      socket.on(NOTIFICATION_MSG,(msg)=>{
        //eslint-disable-next-line
         if(msg.channel_id == channel_id && !localMember.includes(msg.sender)){
           setChatState(msg.channel_id,msg)
           setLocalMember([...localMember,{_id: "BOT",name: msg.senderName}])
         }
      })

      //when someone leaves the room
      socket.on(LEAVE_ROOM,(value)=>{
        const newActiveUsers = activeUsers.delete(value.id);
        setActiveUsers(newActiveUsers);
      })

    }}

    useEffect(()=>{
      console.log("socked intilaized ", socket === null);
      initSocket(socket);
      //eslint-disable-next-line
    },[socket === null,userInfo === null]);

  return (
      <div className="d-flex-sp-between light-theme rel"
        onClick = {()=>props.setCurrentChannel(props.channel)}
      > {/* current-selected */}
        <div className="icons-info d-flex-sp-start">
            <div className="image-part d-flex-sp-center"> <img src="/image/sample-profile.jpg" alt="404 NA"/></div>
            <div className="details">
                <div className="title">{channelName}</div>
                <div className="subtitle"> msg... </div>
            </div>
        </div>
        {/* <div className="top-left"> 11:00</div> */}
      </div>
  )
}


const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch)=>({
  setChatState: (key,value)=> dispatch(updateChat(key,value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Channel)

