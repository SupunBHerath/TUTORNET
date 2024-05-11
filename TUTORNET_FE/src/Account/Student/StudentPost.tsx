import React from 'react'
import Post from '../../Components/Post/Post'
import Logo from '../../../public/logo/Logo_t.png'

const StudentPost = () => {

  return (
    <div>
      <br /><br /><br /><br />
      <Post pp={Logo} title='TUTORNET Team' date='28-Mar-2024' img={Logo} description='--- Description ----'/>
      <Post/>
      <Post pp={Logo} title='TUTORNET Team' date='28-Mar-2024' img={Logo} description='--- Description ----'/>
      <Post pp={Logo} title='TUTORNET Team' date='28-Mar-2024' img={Logo} description='--- Description ----'/>
      <Post pp={Logo} title='TUTORNET Team' date='28-Mar-2024' img={Logo} description='--- Description ----'/>
    
    </div>
  )
}

export default StudentPost
