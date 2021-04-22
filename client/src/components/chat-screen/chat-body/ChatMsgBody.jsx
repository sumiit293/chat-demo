import React, { useEffect , useRef} from 'react';
import IndividualChatMsg from './IndividualChatMsg';
import Participants from './Participants';

export const ChatMsgBody =(props)=> {
        const messageEl = useRef();
        useEffect(() => {
          console.log(messageEl.current)
            if (messageEl) {
              messageEl.current.addEventListener('DOMNodeInserted', event => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
              });
            }
            messageEl.current.scrollTop = messageEl.current.scrollHeight;
          }, [])
          const {msg,id,currentChannel,viewMode} = props;
          !!currentChannel && console.log(msg,currentChannel);
          !!currentChannel && console.log(msg[currentChannel._id]);
        return (
            <div className="pd-10 msg-body" ref={messageEl}>
              {!!currentChannel
               && viewMode === 'message'
               && !!msg[currentChannel._id]
               && msg[currentChannel._id].length > 0 
               && msg[currentChannel._id].map((msgi,i)=><IndividualChatMsg msg={msgi} id={id} key={i}/>)}
               {!!currentChannel
               && viewMode === 'participants'
               && <Participants participants={currentChannel.members} />}
            </div>
        )
    
}
export default ChatMsgBody
