import StudentPost from './StudentPost'
import Navi_Bar from './Componets/Nav_bar/Navi_Bar'
import AdsHome from './Componets/Ads/AdsHome';
import TopTeachers from './Componets/TopSir/TopTeacher';



const StudentHome = () => {

    return (
        <div className='bg-body-tertiary '>
            <div>
                <Navi_Bar />
                <div className="all d-flex ">
                    <div className="StudentHome justify-content-center row d-flex ">
                        <div className="ads mt-5  col-lg-3  d-flex justify-content-center ">
                            <AdsHome />
                             
                        </div>
                        <div className="post overflow-x-hidden  overflow-y-auto col-lg-4  " style={{ maxHeight: '100vh' }}>
                          
                            <StudentPost />
                        </div>
                        <div className="ads mt-5  col-lg-4 d-flex justify-content-center  ">
                            <TopTeachers/>
                             
                        </div>
                    </div>
                   
                </div>

            </div>

        </div>
    )
}

export default StudentHome;
