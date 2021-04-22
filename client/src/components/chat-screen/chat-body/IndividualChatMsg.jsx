import React from 'react';

const IndividualChatMsg = (props) => {
    const {msg, id} = props;
    return <div className={`d-flex-sp-start pd-10 ${msg.sender === id  ? 'row-reverse': ''}`}>
            {msg.sender !== id ? <div className="profile-pic">
                <img src="image/sample-profile.jpg" alt="404 NA" />
            </div>: null}
            {msg.sender !== "BOT" ? <div className="msg-box">
                <div className={msg.sender === id? 'msg-info ml-5 mb-5':'msg-info ml-5 mb-5 align-right'}>
                 {msg.sender === id ? 'You': msg.senderName + ' ' + msg.time}
                </div>
                <div className={msg.sender === id ? 'self-last-msg': 'last-msg'}>
                    {msg.message} 
                </div>
                </div>:<div className="d-flex-sp-center"><div className="green-theme m-5">{msg.message}</div></div>}
        </div>
}
export default IndividualChatMsg;
