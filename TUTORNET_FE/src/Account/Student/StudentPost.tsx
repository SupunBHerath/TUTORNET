import Post from '../../Components/Post/Post'
import Logo from '../../../public/logo/Logo_t.png'
import t from '../../../public/Teacher/t2.jpeg'
import ads3 from '../../../public/Ads/ads2.jpg'

const StudentPost = () => {

  return (
    <div>
      <br /><br /><br /><br />
      <Post pp={Logo} title='TUTORNET Team' date='28-Mar-2024' img={ads3} description='--- Description ----'/>
      {/* <Post/> */}
      <Post pp={Logo} title='TUTORNET Team' date='28-Mar-2024'  description='--- Description ----'/>
      <Post pp={t} title='TUTORNET Team' date='28-Mar-2024' img={Logo} description='--- Description ----'/>
      <Post pp={Logo} title='TUTORNET Team' date='28-Mar-2024' img={t} description='--- Description ----'/>
      <Post pp={Logo} title='TUTORNET Team' date='28-Mar-2024' img={ads3} description='--- Description ----'/>
      <Post pp={Logo} title='TUTORNET Team' date='28-Mar-2024' img={Logo} description='--- Description ----'/>
      <Post pp={Logo} title='TUTORNET Team' date='28-Mar-2024' img={Logo} description='--- Description ----'/>
      <Post pp={Logo} title='TUTORNET Team' date='28-Mar-2024' img={Logo} description='--- Description ----'/>
      <Post pp={Logo} title='TUTORNET Team' date='28-Mar-2024' img={Logo} description='--- Description ----'/>
    
    </div>
  )
}

export default StudentPost
