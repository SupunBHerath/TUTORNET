import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function UserChart() {
  return (
  
    <BarChart
    
      series={[
        { label: 'Admin', data: [12, 6, 9] },    // Data for today, yesterday, and 2 days ago
        { label: 'Student', data: [38, 18, 22] }, // Data for today, yesterday, and 2 days ago
        { label: 'Teacher', data: [11, 14, 13] }  // Data for today, yesterday, and 2 days ago
      ]}
      height={370}
      xAxis={[{ data: ['Today', 'Yesterday', '2 Days Ago'], scaleType: 'band' }]}
      margin={{ top: 80, bottom: 30, left: 40, right: 10 }}
    />
  );
}
