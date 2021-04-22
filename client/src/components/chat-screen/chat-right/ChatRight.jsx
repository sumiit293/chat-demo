import React from 'react';
import './chat-right.css';
import ChatRightExpanded from './ChatRightExpanded';
import ChatRightShrinked from './ChatRightShrinked';

const ChatRight = (props) => {
    const { rightExpand,onClickRightExpand} = props;
    return (
        <div className="transition">
            {!rightExpand ? 
            <ChatRightShrinked rightExpand={rightExpand} onClickRightExpand={onClickRightExpand}/>
            : 
            <ChatRightExpanded  rightExpand={rightExpand} onClickRightExpand={onClickRightExpand}/>}
        </div>
    )
}

export default ChatRight;
