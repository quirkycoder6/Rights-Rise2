import React from 'react'
import "../css/user.css"
import userImg from '../asset/user.png'

const UserCard = () => {
  var fullName="Gowrishankar",userName="top_lawyer57",userImage="";
  return (
    <div className='userSec'>
        <div className='userPic'><img className="userImg" src={userImage||userImg} alt="userimg"></img></div>
        <div className='info'>
            <p id='fname' style={{fontSize: 33, position: 'relative', bottom: 7, color: '#fff'}}>{fullName}</p>
            {/* <p style={{fontSize: 18, position: 'relative', bottom: 38, color: '#fff'}}>{userName}</p> */}
        </div>
    </div>
  )
}

export default UserCard