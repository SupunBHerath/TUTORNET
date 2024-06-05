import CHPNaviBar from '../Account/CHP/CHPNaviBar'
import logo from '../../public/logo/Tutor logo.png'
import './RegisterForm.css'
import RegistrationStudent from '../Components/Registration Form/RegistrationStudent'
import STNavi_Bar from '../Account/Landing_page/Components/Navi_Bar/STNavi_Bar'
const StudentRegister = () => {
    return (
        <div>
            <STNavi_Bar />
            <br /><br /><br />
            <div className="container rounded-4  p-3 shadow-lg ">
                <div className="row">
                    <div className="col-md-6  d-sm-none d-md-block   " >
                        <div className="imageDiv w-100 h-100 " style={{ backgroundImage: `url(${logo})` }}></div>
                    </div>
                    <div className="col-md-4">
                        <RegistrationStudent />

                    </div>
                </div>
            </div>

        </div>
    )
}

export default StudentRegister
