import "../CHP.css";
import Ads from "./AdsSession";
import LoginModal from "../../../Components/Modal/LoginModal";

export const AdsCarousel = () => {
  return (
    <>
      <div className="container shadow-lg p-3 rounded-4 ">
        <div className="row">
          <div className="col-md-6 justify-content-center  d-flex ">
          <Ads/>
          </div>
          <div className="col-md-6">
            <div className="text display-5 text-center mt-5 p-5" >
             <p> Get started today and connect with thousands of users looking for tutoring services!</p>
             <LoginModal/>
            </div>
          </div>
        </div>
   
      </div>
    </>
  );
};
