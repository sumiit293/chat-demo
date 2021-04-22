import React from 'react';
import LinkIcon from '@material-ui/icons/Link';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FolderIcon from '@material-ui/icons/Folder';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import PhotoSizeSelectActualIcon from '@material-ui/icons/PhotoSizeSelectActual';
import MovieIcon from '@material-ui/icons/Movie';
import ShopIcon from '@material-ui/icons/Shop';

const ChatRightExpanded = (props) => {
    const { onClickRightExpand} = props;
    return (

        <div className="chat-right" >
            <div className="d-flex-sp-start-center chat-right-header">
                <div className="icon" onClick={onClickRightExpand}> <ChevronRightIcon/></div>
                <div className="bold-big">Shared files</div>
            </div>
            {/* mid part */}
            <div className="scroll-body">
                <div className="current-channel-info">
                    <div className="image-part d-flex-sp-center">
                        <img src="/image/sample-profile.jpg" alt="404 NA"/>
                    </div>
                    <p className="title"> Real estate deals</p>
                    <p className="sub-title">10 members</p>
                    <div className="d-flex-sp-center stats">
                        <div className="d-flex-sp-center active">
                            <div><FolderIcon style={{fontSize: '50px'}} /></div>
                            <div className="file-info no">251</div>
                        </div>
                        <div className="d-flex-sp-center stats2">
                            <div><CreateNewFolderIcon style={{fontSize: '50px'}}  /></div>
                            <div className="links-info no">45</div>
                        </div>
                    </div>
                </div>
                {/* lowest part */}
                <div className="d-flex-sp-between light-theme">
                    <div>File type</div>
                    <div><MoreVertIcon/></div> 
                </div>
                <div className="d-flex-sp-between light-theme">
                    <div className="icons-info d-flex-sp-start">
                        <div className="icon blue-theme"><InsertDriveFileIcon/></div>
                        <div className="details">
                            <div className="title">Documet</div>
                            <div className="subtitle">126 files , 193MB</div>
                        </div>
                    </div>
                    <div><ArrowForwardIosIcon style={{fontSize:'14px'}} /></div>
                </div>
                <div className="d-flex-sp-between light-theme">
                    <div className="icons-info d-flex-sp-start">
                        <div className="icon yellow-theme"><PhotoSizeSelectActualIcon/></div>
                        <div className="details">
                            <div className="title">Photos</div>
                            <div className="subtitle">53 files, 321MB</div>
                        </div>
                    </div>
                    <div><ArrowForwardIosIcon style={{fontSize:'14px'}} /></div>
                </div>
                <div className="d-flex-sp-between light-theme">
                    <div className="icons-info d-flex-sp-start">
                        <div className="icon teal-theme"><MovieIcon/></div>
                        <div className="details">
                            <div className="title">Movies</div>
                            <div className="subtitle">3 files, 210MB</div>
                        </div>
                    </div>
                    <div><ArrowForwardIosIcon style={{fontSize:'14px'}} /></div>
            </div>
                <div className="d-flex-sp-between light-theme">
                    <div className="icons-info d-flex-sp-start">
                        <div className="icon pink-theme"><ShopIcon/></div>
                        <div className="details">
                            <div className="title">Other</div>
                            <div className="subtitle">49 files, 210MB</div>
                        </div>
                    </div>
                    <div><ArrowForwardIosIcon style={{fontSize:'14px'}} /></div>
                </div>
            <div className="d-flex-sp-between light-theme">
                <div className="icons-info d-flex-sp-start">
                    <div className="icon green-theme"><LinkIcon/></div>
                    <div className="details">
                        <div className="title">links</div>
                        <div className="subtitle">49 files, 210MB</div>
                    </div>
                </div>
                <div><ArrowForwardIosIcon style={{fontSize:'14px'}} /></div>
            </div>
         </div>
        </div>

    )
}

export default ChatRightExpanded;
