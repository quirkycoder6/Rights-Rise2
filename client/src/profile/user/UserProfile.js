import React from 'react'
import UserCard from '../cards/UserCard'
import "../css/user.css"
import Stats from '../cards/Stats'

const UserProfile = () => {
  return (
    <div className='userProfile'>
      <UserCard/>
      <Stats/>
    </div>
  )
}

export default UserProfile