import React from 'react';
import LinkIcon from '@material-ui/icons/Link';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import PhotoSizeSelectActualIcon from '@material-ui/icons/PhotoSizeSelectActual';
import MovieIcon from '@material-ui/icons/Movie';
import ShopIcon from '@material-ui/icons/Shop';
import { ChevronLeft } from '@material-ui/icons';

const ChatRightShrinked = (props) => {
    const { onClickRightExpand} = props;
    return (
        <div className="collapsed">
            <div className="toggle-icon icon-center">
                <div className="icon-center dark-bg" onClick={onClickRightExpand}>
                    <ChevronLeft/>
                </div>
            </div>
            <div className="collapsed-profile icon-center">
                 <img src="/image/sample-profile.jpg" alt="404 NA"/>
            </div>
            <div className="center light-text mb-15">Files</div>
            <div className="collapsed-icon blue-theme"><InsertDriveFileIcon/></div>
            <div className="collapsed-icon yellow-theme"><PhotoSizeSelectActualIcon/></div>
            <div className="collapsed-icon pink-theme"><MovieIcon/></div>
            <div className="collapsed-icon teal-theme"><LinkIcon/></div>
            <div className="collapsed-icon green-theme"><ShopIcon/></div>
        </div>
    )
}

export default ChatRightShrinked;
