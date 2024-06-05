
import { Box } from '@mui/material'
import Navi_Bar from '../Components/Navi_Bar/Navi_Bar'
import TopTeachers from '../../Student/Componets/TopSir/TopTeacher'
import AdsSearch from '../../Student/Componets/Ads/search'

const SearchPageT = () => {
  return (
    <div style={{backgroundColor: '#f0f0f0'}} className='p-4 '>
      <Navi_Bar />
      <Box display="flex" justifyContent="space-between" className="bg-body-tertiary" style={{ height: '100vh' }}>
        <Box component="aside" style={{ width: '25%', overflowY: 'auto', margin: '20px' }} >
          <br />
          <br /><br />
          <AdsSearch />
        </Box>
        <Box component="main" style={{ width: '75%', overflowY: 'auto', height: '100%' }}>
          <br /><br />
          <TopTeachers />
        </Box>
      </Box>
    </div>
  )
}

export default SearchPageT
