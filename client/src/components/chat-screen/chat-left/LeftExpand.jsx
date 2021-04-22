import React,{useState} from 'react';
import SearchSharpIcon from '@material-ui/icons/SearchSharp';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ControlPointSharpIcon from '@material-ui/icons/ControlPointSharp';
import { Channel } from './Channel';
import Modal from './../chat-body/CreateChannelModal';


const LeftExpand = (props) => {
    const { onClickLeftExpand,
        loading,
        socket,
        setCurrentChannel,
        user,
        data,
        createChannel
    } = props;

    const [showModal,setShowModal] = useState(false);
    return (
        <div>
            < div className="chat-left">
                <div className="d-flex-sp-start-center chat-left-header">
                    <div className="icon" onClick={onClickLeftExpand} > <ChevronLeftIcon/></div>
                    <div className="bold-big">Chat</div>
                </div>
                <div className="scroll-body">
                {/* mid part */}
                    <div className="current-channel-info">
                        <div className="image-part d-flex-sp-center">
                            <img src="/image/sample-profile.jpg" alt="404 NA"/>
                        </div>
                        <p className="title">{user.name}</p>
                        <p className="center">
                            <p className="items">Available <ExpandMoreIcon style={{fontSize: '18px'}} /></p>
                        </p>
                    </div>
                    <div className="search-bar d-flex-sp-between">
                        <div className="input-field-div">
                            <input placeholder="Search"/>
                        </div>
                        <div className="icon-div">
                            <SearchSharpIcon />
                        </div>
                    </div>
                {/* lowest part */}
                    <div className="d-flex-sp-between light-theme">
                        <div>Last chats</div>
                        <div className="d-flex-sp-between">
                            <div className="current-active"> <ControlPointSharpIcon onClick={()=>setShowModal(true)} /> </div> 
                            <div> <MoreVertIcon /> </div>
                        </div> 
                    </div>
                    {!loading ?  !!user && !!data && data.channels.map((channel,index) =>
                         <Channel
                            channel={channel} 
                            key={"channel"+ index} 
                            setCurrentChannel={setCurrentChannel}
                            socket={socket}
                            userInfo={user}
                         />
                         )
                        : 
                        <p style={{textAlign:'center'}}>Loading...</p>
                    }
                    <Modal 
                        open={showModal}
                        handleClose={()=>setShowModal(!showModal)}
                        handleSubmit={createChannel}
                    />
                </div> 
            </ div>
        </div>
    )
}
export default LeftExpand;
