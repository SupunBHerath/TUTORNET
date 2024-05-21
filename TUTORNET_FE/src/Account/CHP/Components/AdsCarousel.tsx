
import "../CHP.css";
import { useNavigate } from "react-router-dom";


import Ads from "./AdsSession";
import { Button } from "@mui/material";
import { Font } from "../../../Components/CSS/CSS";

export const AdsCarousel = () => {
  const navigate = useNavigate();
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
             <Button variant="outlined" style={{fontFamily:Font.PrimaryFont}}>Login</Button>
            </div>
          </div>
        </div>
   
      </div>
    </>
  );
};
