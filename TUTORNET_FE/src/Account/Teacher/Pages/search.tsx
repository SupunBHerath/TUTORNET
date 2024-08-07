import React from 'react';
import { Box } from '@mui/material';
import TopTeachers from '../../Student/Componets/TopSir/TopTeacher';
import AdsSearch from '../../Student/Componets/Ads/search';


const SearchPageT: React.FC = () => {
  return (
    <div style={{ backgroundColor: '#f0f0f0' }} className="p-4">
      <Box display="flex" justifyContent="space-between" className="bg-body-tertiary" style={{ height: '100vh' }}>
        <Box component="aside" sx={{ width: '25%', overflowY: 'auto', margin: '20px', display: { xs: 'none', md: 'block' } }}>
          <br /><br /><br />
          <AdsSearch />
        </Box>
        <Box component="main" sx={{ width: { xs: '100%', md: '75%' }, overflowY: 'auto', height: '100%' }}>
          <br /><br />
          <TopTeachers />
        </Box>
      </Box>
    </div>
  );
};

export default SearchPageT;
