import HeaderCard from '../Components/Card/HeaderCard'
import UserTable from '../Components/Table/Table'
import '../css/Admin.css'
import teacherIcon from '../../../../public/Icon/teacher.png'
import studentIcon from '../../../../public/Icon/students.png'
import Admin from '../../../../public/Icon/admin.png'
import { useEffect, useState } from 'react'
import axios from 'axios'

type RoleDetails = {
  role: string;
  count: number;
};

const UserManage = () => {
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
    <div>
      <div className="UserManage" >
      <div className="d-flex justify-content-evenly " >
      <HeaderCard icon={teacherIcon} title="Teachers" count={roleDetails.find(role => role.role === 'Teacher')?.count || 0}/>
        <HeaderCard icon={studentIcon} title="Students" count={roleDetails.find(role => role.role === 'Student')?.count || 0} />
        <HeaderCard icon={Admin} title="Admin" count={roleDetails.find(role => role.role === 'Admin')?.count || 0}  />
      </div>
          <UserTable/>
      </div>
    </div>
  )
}

export default UserManage
