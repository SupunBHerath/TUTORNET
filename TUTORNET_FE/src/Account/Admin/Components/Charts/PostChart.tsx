import { BarChart } from '@mui/x-charts/BarChart';
import axios from 'axios';
import React, { useEffect, useState } from 'react';


interface PostData {
  uploadedDay: string; 
}

interface ChartData {
  post: number[];
  dates: string[];
}

const PostChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData>({
    post: [],
    dates: []
  });

  useEffect(() => {
    fetchPostDetails();
  }, []);

  const fetchPostDetails = async () => {
    try {
      const response = await axios.get<PostData[]>('post/all');

      if (response.status === 200) {
        const postData = processPostData(response.data);

        const dates = getLastThreeDays();

        setChartData({
          post: dates.map(date => postData.counts[date] || 0),
          dates: dates
        });

      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error fetching post details:', error);
    }
  };

  const processPostData = (data: PostData[]): { counts: { [key: string]: number } } => {
    const dateCounts: { [key: string]: number } = {};

    data.forEach(item => {
      const date = item.uploadedDay.split('T')[0];
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

  return (
    <BarChart
      series={[
        { label: 'Post', data: chartData.post }
      ]}
      height={370}
      xAxis={[{ data: chartData.dates, scaleType: 'band' }]}
      margin={{ top: 80, bottom: 30, left: 40, right: 10 }}
    />
  );
}

export default PostChart;
