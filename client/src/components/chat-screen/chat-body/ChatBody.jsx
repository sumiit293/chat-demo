import React,{useState} from 'react';
import ChatInputField from './ChatInputField';
import ChatMsgBody from './ChatMsgBody';
import LinkIcon from '@material-ui/icons/Link';
import { toast } from 'react-toastify';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';


const ChatBody = (props) => {

    const {currentChannel,chats,id,handleMsg,logoutUser} = props;
    const[viewMode,setViewMode] = useState('message');

    const copyToClipBoard = (value)=>{
        navigator
        .clipboard
        .writeText(`https://chat-demo-e7cr.onrender.com/chat?channel_id=${value}`);
        toast.info('Link copied to clipboard');
    }

    return (
        <div className="chat-body">
            <div className="chat-body-header d-flex-sp-between">
               <div className="main">
                   {!! currentChannel ? currentChannel.channelName : ''}
            </div>
               <div className="d-flex-sp-between">
                   {!!currentChannel
                    && <div 
                        className={`pd-10 pdx-20 cursor-pointer ${viewMode === 'message'? 'active': ''}`}
                        onClick={()=>setViewMode('message')}
                        >
                        Message
                   </div>}
                   {!!currentChannel 
                   &&  <div 
                        className={`pd-10 pdx-20 cursor-pointer ${viewMode === 'participants'? 'active': ''}`}
                        onClick={()=>setViewMode('participants')}
                        >
                        Participants
                   </div>}
                   {!!currentChannel && <div className="pd-10 cursor-pointer pdx-20">
                        <LinkIcon onClick={()=>copyToClipBoard(currentChannel._id)} /> 
                   </div>}
                   <div className="pd-10 cursor-pointer pdx-20">
                        <PowerSettingsNewIcon onClick={()=>logoutUser()} /> 
                   </div>
               </div>
            </div>
            <ChatMsgBody
                 viewMode={viewMode}
                 msg={chats}
                 currentChannel={currentChannel}
                id={id}
            />
            <ChatInputField  handleMsg={handleMsg}/>
            <div/>
        </div>
    )
}

export default ChatBody;
