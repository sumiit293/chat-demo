import React from 'react';

const Participants = (props) => {
    const {participants} = props;
    return (
        <div className="d-flex-sp-start">
            {!!participants 
                 && participants.length > 0 
                 &&  participants.map((member,index)=>
                 <div className="image-part m-10" key={index}>
                    <img src="/image/sample-profile.jpg" alt="404 NA"/>
                    <p className="align-center bold">{member.name}</p>
            </div>)}
        </div>
    )
}

export default Participants
