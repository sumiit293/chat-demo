import React,{useState} from 'react';
import SendIcon from '@material-ui/icons/Send';
import AttachmentIcon from '@material-ui/icons/Attachment';
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';

const ChatInputField = (props) => {
    const[text,setText]= useState('');
    const send = () => {
        if(text!== ''){
            console.log(text);
            props.handleMsg(text);
        }
        setText('');
    }
    return (
        <div className="msg-input-box d-flex-sp-between">
            <div className="msg-input-box-input">
                <input type="text" placeholder="Write your msg..." value={text} onChange={(e)=>setText(e.target.value)}/>
            </div>
            <div className="d-flex-sp-between icons-div">
                <div className="btn">
                    <SentimentSatisfiedOutlinedIcon />
                </div>
                <div className="btn">
                    <AttachmentIcon />
                </div>
                <div className="btn btn-filled" onClick={send}>
                    <SendIcon  style={{color: 'white', fontSize:'small'}}/>
                </div>
            </div>
        </div>
    )
}
export default ChatInputField;
