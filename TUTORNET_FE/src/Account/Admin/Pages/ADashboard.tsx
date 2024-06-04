import '../css/Admin.css'
import HeaderCard from '../Components/Card/HeaderCard'
import teacherIcon from '../../../../public/Icon/teacher.png'
import studentIcon from '../../../../public/Icon/students.png'
import postIcon from '../../../../public/Icon/social.png'
import AdsIcon from '../../../../public/Icon/ads.png'
import { useEffect, useState } from 'react'
import UserChart from '../Components/Charts/UserChart'
import PostChart from '../Components/Charts/PostChart'
import { Color } from '../../../Components/CSS/CSS'
import axios from 'axios'
import AdsChart from '../Components/Charts/AdsChart'

type RoleDetails = {
  role: string;
  count: number;
};

const ADashboard = () => {
  const [roleDetails, setRoleDetails] = useState<RoleDetails[]>([]);

  useEffect(() => {
    fetchRoleDetails();
  }, []);

  const fetchRoleDetails = async () => {
    try {
      const adminResponse = await axios.get('admin/all');
      const teacherResponse = await axios.get('teacher/all');
      const studentResponse = await axios.get('student/all');
      const postResponse = await axios.get('post/all');
      const adsResponse = await axios.get('ads/all');

      if (adminResponse.status === 200 && teacherResponse.status === 200 && studentResponse.status === 200) {
        const adminCount = adminResponse.data.length;
        const teacherCount = teacherResponse.data.length;
        const studentCount = studentResponse.data.length;
        const postCount = postResponse.data.length;
        const adsCount = adsResponse.data.length;

        setRoleDetails([
          { role: 'Admin', count: adminCount },
          { role: 'Teacher', count: teacherCount },
          { role: 'Student', count: studentCount },
          { role: 'Post', count: postCount },
          { role: 'Ads', count: adsCount }
        ]);
      } else {
        throw new Error('One or more network responses were not ok');
      }
    } catch (error) {
      console.error('Error fetching role details:', error);
    }
  };

  return (
    <div className='pt-1'>
      <div className="col d-lg-flex justify-content-evenly">
        <HeaderCard icon={teacherIcon} title="Teachers" count={roleDetails.find(role => role.role === 'Teacher')?.count || 0}/>
        <HeaderCard icon={studentIcon} title="Students" count={roleDetails.find(role => role.role === 'Student')?.count || 0} />
        <HeaderCard icon={postIcon} title="Posts" count={roleDetails.find(role => role.role === 'Post')?.count || 0} />
        <HeaderCard icon={AdsIcon} title="Ads" count={roleDetails.find(role => role.role === 'Ads')?.count || 0} />
      </div>
      <br /><br />
      <br /><br />

      <div className="container">
        <div className="row text-center">
          <div className="col-md-4">
            <UserChart />
            <br />
            <h3>New <span style={{ color: Color.SecondaryColor }}>Account</span> in the last 3 days</h3>
          </div>
          <div className="col-md-4">
            <PostChart />
            <br />
            <h3>New <span style={{ color: Color.SecondaryColor }}>Post</span> in the last 3 days</h3>
          </div>
          <div className="col-md-4">
           <AdsChart/>
            <br />
            <h3>New <span style={{ color: Color.SecondaryColor }}>ADS</span>  in the last 3 days</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ADashboard;
