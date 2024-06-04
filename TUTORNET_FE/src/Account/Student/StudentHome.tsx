import StudentPost from './StudentPost'
import AdsHome from './Componets/Ads/AdsHome';
import { Grid } from '@mui/material';
import SNavi_Bar from './Componets/Nav_bar/Navi_Bar';



const StudentHome = () => {

    return (
        <div className='bg-body-tertiary '>
            <SNavi_Bar />

            <Grid container spacing={3} padding={5} paddingY={0} marginTop={5}>
                <Grid item xs >
                    <AdsHome />
                </Grid>
                <Grid item xs={4} >
                    <StudentPost />

                </Grid>
                <Grid item xs>
                    <AdsHome />

                </Grid>
            </Grid>

        </div>
    )
}

export default StudentHome;
