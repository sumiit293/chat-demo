import React from 'react';
import LeftExpand  from './LeftExpand';
import LeftShrinked from './LeftShrinked';
import { connect } from 'react-redux';
import './chat-left.css';

const ChatLeft = (props) => {
    const {loading,data} = props.sideBarState;
    const {setCurrentChannel,socket,user,leftExpand,onClickLeftExpand,createChannel} = props;

    return (
        <div>
         {leftExpand ? 
            <LeftExpand 
                leftExpand={leftExpand} 
                onClickLeftExpand={onClickLeftExpand}
                socket={socket}
                loading={loading}
                data={data}
                setCurrentChannel={setCurrentChannel}
                user={user}
                createChannel={createChannel}
            /> 
            : 
            <LeftShrinked 
                leftExpand={leftExpand} 
                onClickLeftExpand={onClickLeftExpand}
            />
         }
        </div>
    )

}
const mapStateToProps = (state) => ({
    sideBarState: state.chatReducer,
    user: state.loginReducer.user.user
})
export default connect(mapStateToProps,null)(ChatLeft);

