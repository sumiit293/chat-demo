import React from 'react';
import PeopleIcon from '@material-ui/icons/People';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import VideocamIcon from '@material-ui/icons/Videocam';
import VisibilityIcon from '@material-ui/icons/Visibility';
import TimerIcon from '@material-ui/icons/Timer';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import './base.css';

const Base = (props) => {
    return (
        <div className="d-flex-sp-center parent">
            <div className="sidebar">
                <div className="item color-grey"><TimerIcon/></div>
                <div className="item color-grey"><EventAvailableIcon/></div>
                <div className="item color-grey"><EqualizerIcon/></div>
                <div className="item color-grey"><VisibilityIcon/></div>
                <div className="teal-theme item"><PeopleIcon/></div>
                <div className="item color-grey"><VideocamIcon/></div>
            </div>
            <div className="children">{props.children}</div>
        </div>
    )
}

export default Base
