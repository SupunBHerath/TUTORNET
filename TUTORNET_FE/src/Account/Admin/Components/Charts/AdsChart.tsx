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

const AdsChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData>({
    post: [],
    dates: []
  });

  useEffect(() => {
    fetchPostDetails();
  }, []);

  const fetchPostDetails = async () => {
    try {
      const response = await axios.get<PostData[]>('ads/all');

      if (response.status === 201) {
        const postData = processPostData(response.data);
        

        const dates = getLastThreeDays();

        setChartData({
          post: dates.map(uploadedDay => postData.counts[uploadedDay] || 0),
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
        { label: 'Ads', data: chartData.post }
      ]}
      height={370}
      xAxis={[{ data: chartData.dates, scaleType: 'band' }]}
      margin={{ top: 80, bottom: 30, left: 40, right: 10 }}
    />
  );
}

export default AdsChart;
