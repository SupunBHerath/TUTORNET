import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AdDescription from '../../Admin/Components/AddAds/AdDescription';
import AdsWall from '../../Admin/Components/AdsWall/AdsWall';
import { Font } from '../../../Components/CSS/CSS';

export default function LabTabs() {
  const [value, setValue] = React.useState('addes'); // Default value should match the value of the first Tab

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab style={{fontFamily:Font.PrimaryFont}} label="Publish your Advertise" value="addes" />
            <Tab style={{fontFamily:Font.PrimaryFont}} label="View Advertises" value="adwall" />
          </TabList>
        </Box>
        <TabPanel value="addes">
          <AdDescription />
        </TabPanel>
        <TabPanel value="adwall">
          <AdsWall />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
