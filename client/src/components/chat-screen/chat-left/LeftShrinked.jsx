import React from 'react';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const LeftShrinked = (props) => {
    const {onClickLeftExpand} = props;
    return (
        <div className="collapsed">
            <div className="toggle-icon icon-center">
                <div className="icon-center dark-bg" onClick={onClickLeftExpand} >
                    <ChevronRightIcon/>
                </div>
            </div>
            <div className="collapsed-profile icon-center green-theme m-2 mt-10">
                <img src="/image/sample-profile.jpg" alt="404 NA"/>
            </div>
            <div className="center light-text mb-15 mt-10">Active</div>
            <div className="collapsed-profile icon-center">
                <img src="/image/sample-profile.jpg" alt="404 NA"/>
            </div>
            <div className="collapsed-profile icon-center">
                <img src="/image/sample-profile.jpg" alt="404 NA"/>
            </div>
            <div className="collapsed-profile icon-center">
                <img src="/image/sample-profile.jpg" alt="404 NA"/>
            </div>
       </div>
    )
}

export default LeftShrinked
