import React, { useState, useEffect } from 'react';
import HeaderCard from '../Components/Card/HeaderCard';
import '../css/Admin.css';
import landingIcon from '../../../../public/Icon/landing-page.png';
import Wall from '../../../../public/Icon/wallpage.png';
import search from '../../../../public/Icon/search.png';
import AdsTable from '../Components/Table/AdsTable';
import axios from 'axios';

interface Ad {
  location: string;
}

const AdsManagePage: React.FC = () => {
  const [rows, setRows] = useState<Ad[]>([]);


  useEffect(() => {
    axios.get('/ads/all')
      .then(response => {
        setRows(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  

  return (
    <div>
      <div className="AdsManage">
        <div className="d-flex AdsCountCard justify-content-evenly ">
          <HeaderCard icon={landingIcon} title="Landing" count={rows.filter(ad => ad.location === 'Landing Page').length} />
          <HeaderCard icon={Wall} title="Wall" count={rows.filter(ad => ad.location === 'Wall Page').length} />
          <HeaderCard icon={search} title="Searcher" count={rows.filter(ad => ad.location === 'Search Page').length} />
        </div>
        <br />
        <div className="" >
          <AdsTable />
        
        </div>
        
      </div>
    </div>
  );
};

export default AdsManagePage;
