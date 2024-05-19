import React, { useState, useEffect } from 'react';
import HeaderCard from '../Components/Card/HeaderCard';
import '../css/Admin.css';
import landingIcon from '../../../../public/Icon/landing-page.png';
import Wall from '../../../../public/Icon/wallpage.png';
import search from '../../../../public/Icon/search.png';
import AdsTable from '../Components/Table/AdsTable';

interface Ad {
  location: string;
  // Add other properties as per your ad object structure
}

const AdsManage: React.FC = () => {
  const [rows, setRows] = useState<Ad[]>([]);

  useEffect(() => {
    // Fetch ads data
    fetch('http://localhost:8080/ads/all')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: Ad[]) => {
        setRows(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div>
      <div className="AdsManage">
        <div className="d-flex AdsCountCard justify-content-evenly ">
          <HeaderCard icon={landingIcon} title="Landing" count={rows.filter(ad => ad.location === 'Landing Page').length} />
          <HeaderCard icon={Wall} title="Wall" count={rows.filter(ad => ad.location === 'Wall Page').length} />
          <HeaderCard icon={search} title="Searcher" count={rows.filter(ad => ad.location === 'Search Page').length} />
        </div>
        <br />
        <div className="container " style={{maxWidth:'1200px'}}>
          <AdsTable />
        </div>
      </div>
    </div>
  );
};

export default AdsManage;
