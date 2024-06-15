import { BarChart } from '@mui/x-charts/BarChart';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface RoleData {
  date: string; 
}

interface ChartData {
  admin: number[];
  teacher: number[];
  student: number[];
  dates: string[];
}

const UserChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData>({
    admin: [],
    teacher: [],
    student: [],
    dates: []
  });

  useEffect(() => {
    fetchRoleDetails();
  }, []);

  const fetchRoleDetails = async () => {
    try {
      const adminResponse = await axios.get<RoleData[]>('admin/all');
      const teacherResponse = await axios.get<RoleData[]>('teacher/all');
      const studentResponse = await axios.get<RoleData[]>('student/all');

      if (adminResponse.status === 200 && teacherResponse.status === 200 && studentResponse.status === 200) {
        const adminData = processRoleData(adminResponse.data);
        const teacherData = processRoleData(teacherResponse.data);
        const studentData = processRoleData(studentResponse.data);

        const dates = getLastThreeDays();

        setChartData({
          admin: dates.map(date => adminData.counts[date] || 0),
          teacher: dates.map(date => teacherData.counts[date] || 0),
          student: dates.map(date => studentData.counts[date] || 0),
          dates: dates
        });

      } else {
        throw new Error('One or more network responses were not ok');
      }
    } catch (error) {
      console.error('Error fetching role details:', error);
    }
  };

  const processRoleData = (data: RoleData[]): { counts: { [key: string]: number } } => {
    const dateCounts: { [key: string]: number } = {};

    data.forEach(item => {
      const date = item.date.split('T')[0]; 
      if (!dateCounts[date]) {
        dateCounts[date] = 0;
      }
      dateCounts[date]++;
    });

    return { counts: dateCounts };
  };

  const getLastThreeDays = (): string[] => {
    const dates: string[] = [];
    for (let i = 0; i < 3; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]); 
    }
    return dates.reverse(); 
  };

  // Debugging logs
  console.log('Chart Data:', chartData);

  return (
    <BarChart
      series={[
        { label: 'Admin', data: chartData.admin },
        { label: 'Student', data: chartData.student },
        { label: 'Teacher', data: chartData.teacher }
      ]}
      height={370}
      xAxis={[{ data: chartData.dates, scaleType: 'band' }]}
      margin={{ top: 80, bottom: 30, left: 40, right: 10 }}
    />
  );
};

export default UserChart;
