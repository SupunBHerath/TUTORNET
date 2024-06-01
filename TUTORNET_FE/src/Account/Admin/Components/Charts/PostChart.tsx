import { BarChart } from '@mui/x-charts/BarChart';

export default function PostChart() {
  return (
  
    <BarChart
    
      series={[
        { label: 'Post', data: [12, 6, 9] },    // Data for today, yesterday, and 2 days ago
      // Data for today, yesterday, and 2 days ago
      ]}
      height={370}
      xAxis={[{ data: ['Today', 'Yesterday', '2 Days Ago'], scaleType: 'band' }]}
      margin={{ top: 80, bottom: 30, left: 40, right: 10 }}
    />
  );
}
