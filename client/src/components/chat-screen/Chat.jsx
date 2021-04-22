import React,{Component} from 'react';
import styled from 'styled-components';
import ChatBody from './chat-body/ChatBody';
import ChatLeft from './chat-left/ChatLeft';
import ChatRight from './chat-right/ChatRight';
import { withRouter } from 'react-router-dom';
import {updateChat} from './chat-store/action';
import {fetchChatData,addUserToChannel} from './action';
import {logout} from './../login/action';
import io from 'socket.io-client';
import {connect} from 'react-redux';
import {createMessage} from './../../Factory';
import {SEND_MESSAGE,MESSAGE_RECIEVE,JOINED_FOR_FIRST_TIME,LEAVE_ROOM} from './../../Events';
import Base from './../common/Base';
import {createChannel} from './action';

const ChatWrapper = styled.div`
   display: flex;
   justify-content: center;
   box-sizing: border-box;
   height: calc(100vh - 100px);
   align-item: center;
   overflow-y: hidden;
`;

export class Chat extends Component {
    constructor(props){
        super(props)
        this.state = {
          currentInputValue: null,
          socket: null,
          currentChannel:null,
          width: window.innerWidth,
          leftExpand: window.innerWidth >= 1000 ? true: false,
          rightExpand: window.innerWidth >= 1000 ? true: false, 
        }
    }

    componentDidMount = ()=>{

        //adding the resize listner
        window.addEventListener('resize',()=>{
            this.setState({width:window.innerWidth});
        });

        // initializing the socket
        const socket = io();

        //looking if the url have serach params
        const query = new URLSearchParams(this.props.location.search);
        const channelId = query.get("channel_id");
        if(channelId){
            this.props.addMembers(channelId,localStorage.getItem("token")).then(()=>{
            const {user} = this.props;
            if(user){
            const info = createMessage(`${user.name} Joined the channel`,"BOT",channelId,user.name)
            socket.emit(JOINED_FOR_FIRST_TIME,info);
            this.props.history.push("/chat");
            this.props.fetchChatData(localStorage.getItem("token"))
            }
            })
        }else{
            this.props.fetchChatData(localStorage.getItem("token"))
        }

        this.setState({socket},()=>{
            //saving the msg to local state when msg is received 
            const {socket} = this.state;
              socket.on(MESSAGE_RECIEVE,(msg)=>{
              this.props.setChatState(msg.channel_id,msg)
              });
        });

    }

    onClickLeftExpand = ()=>{
        const {leftExpand,rightExpand,width} = this.state;
        if(!leftExpand && rightExpand && (width <= 1000)){
            this.setState({rightExpand:!rightExpand});
        }
        this.setState({leftExpand:!leftExpand}); 
    }

    onClickRightExpand = ()=>{
        const {leftExpand,rightExpand,width} = this.state;
        if(!rightExpand && leftExpand && (width <= 1000)){
            this.setState({leftExpand:!leftExpand}); 
        }
        this.setState({rightExpand:!rightExpand});
    }
    //when unmounting 
    beforeLogout = async ()=> {
        const {socket} = this.state;
        const {chats} = this.props;
        const listOfAllChannels = !!chats.data ? chats.data.channels.map((channel)=>channel._id): []
        const id = !!chats.data  ? chats.data._id: ''
        socket.emit(LEAVE_ROOM,{_id: id,room: listOfAllChannels});
    }
    // for loging out the user
    logoutUser = async ()=>{
        await this.beforeLogout();
        this.props.logoutUser();
    }

    //set the current channel
    setCurrentChannel = (value)=>{
        this.setState({currentChannel: value});
    }

    // handle the emit msg to server
    handleMsg = (newMsg)=>{
        const {currentChannel,socket} = this.state;
        const {user} = this.props;
        if(!!newMsg && !!currentChannel){
            //creating the msg 
            const msg = createMessage(newMsg,user.id,currentChannel._id,user.name);
            this.props.setChatState(currentChannel._id,msg);
            console.log(msg,user);
            //emitting to server
            !!socket && socket.emit(SEND_MESSAGE,msg);
        }
    }

    render() {
        const {leftExpand,rightExpand,width,socket,currentChannel} = this.state;
        const {user,chats,createChannel} = this.props;
        return (
            <Base>
                {!!user ? <ChatWrapper>
                    <ChatLeft 
                        leftExpand = {leftExpand}
                        onClickLeftExpand = {this.onClickLeftExpand}
                        width={width}
                        setCurrentChannel={this.setCurrentChannel} 
                        socket={socket}
                        channelId = {!!currentChannel ? currentChannel._id : null}
                        createChannel={createChannel}
                    />
                    <ChatBody
                        leftExpand={leftExpand}
                        rightExpand={rightExpand}
                        onClickLeftExpand = {this.onClickLeftExpand}
                        onClickRightExpand={this.onClickRightExpand}
                        currentChannel = {!!currentChannel ? currentChannel: null}
                        chats={chats}
                        id={user.id}
                        handleMsg={this.handleMsg}
                        logoutUser={this.logoutUser}
                    />
                    <ChatRight
                        rightExpand = {rightExpand}
                        onClickRightExpand={this.onClickRightExpand}
                        width={width}
                        currentChannel={currentChannel}
                    />
                </ChatWrapper>: <p>Loading...</p>}
            </Base>
        );
    }
}

const mapDispatchToProps = (dispatch)=>({
    logoutUser: (value)=> dispatch(logout(value)),
    fetchChatData: (token)=> dispatch(fetchChatData(token)),
    addMembers: (value,token)=>dispatch(addUserToChannel(value,token)),
    setChatState: (key,value)=> dispatch(updateChat(key,value)),
    createChannel: async (value,token)=>dispatch(createChannel(value,token)),
});
  
const mapStateToProps = (state)=>({
user: state.loginReducer.user.user,
chats: state.chatStateSReducer

})

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Chat))


// const Chat = () => {

//     const [width,setWidth] = useState(window.innerWidth);
//     const [leftExpand,setLeftExpanded] = useState(width>= 1000 ? true: false);
//     const [rightExpand,setRightExpanded] = useState(width>= 1000 ? true: false);

//     useEffect(()=>{
//         window.addEventListener('resize',()=>{
//             setWidth(window.innerWidth);
//         })
//         //eslint-disable-next-line
//     },[]);

//     const onClickLeftExpand = ()=>{
//         if(!leftExpand && rightExpand && (width <= 1000)){
//             setRightExpanded(!rightExpand);
//         }
//         setLeftExpanded(!leftExpand); 
//     }
//     const onClickRightExpand = ()=>{
//         if(!rightExpand && leftExpand && (width <= 1000)){
//             setLeftExpanded(!leftExpand);
//         }
//         setRightExpanded(!rightExpand);
        
//     }

//     const messages = [
//                         {self: false, msg: "Hi There !" , from: 'Akash' ,time: '4 Julay 8:40 am'},
//                         {self: true, msg: "dolor sit. dolor sit. Lorem ipsum dolor sit. Lorem ipsum dolor sit." , from: '' ,time: '4 July 8:40 am'},
//                         {self: false, msg: "lorem ipsum bcnxbxhs loiujk bzxcv" , from: 'Akash' ,time: '4 July 8:40 am'},
//                         {self: true, msg: "dolor sit. dolor sit. Lorem ipsum dolor sit. Lorem ipsum dolor sit." , from: '' ,time: '4 July 8:40 am'},
//                         {self: false, msg: "dolor sit. dolor sit. Lorem ipsum dolor sit. Lorem ipsum dolor sit." , from: 'Rishab' ,time: '4 July 8:40 am'},
//                         {self: true, msg: "dolor sit. dolor sit. Lorem ipsum dolor sit. Lorem ipsum dolor sit." , from: '' ,time: '4 July 8:40 am'},
//                         {self: false, msg: "dolor sit. dolor sit. Lorem ipsum dolor sit. Lorem ipsum dolor sit." , from: 'Ravi' ,time: '4 July 8:40 am'},
//                         {self: true, msg: "dolor sit. dolor sit. Lorem ipsum dolor sit. Lorem ipsum dolor sit." , from: '' ,time: '4 July 8:40 am'}
//                     ];
//     return (
//         <ChatWrapper>
//             <ChatLeft 
//                 leftExpand = {leftExpand}
//                 onClickLeftExpand = {onClickLeftExpand}
//                 width={width}
//             />
//             <ChatBody
//                  msg={messages}
//                  leftExpand={leftExpand}
//                  rightExpand={rightExpand}
//                  onClickLeftExpand = {onClickLeftExpand}
//                  onClickRightExpand={onClickRightExpand}
//             />
//             <ChatRight
//                 rightExpand = {rightExpand}
//                 onClickRightExpand={onClickRightExpand}
//                 width={width}
//             />
//         </ChatWrapper>
//     )
// }

// export default Chat;
