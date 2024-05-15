import React from "react";
import "./CHP.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Color } from "../../Components/CSS/CSS";

export const CHPAboutUS = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="container-fluid ">
        <div
          className="row align-items-center rounded-3  p-3 shadow-lg "
          data-aos="fade-in"
        >
          <div
            className="col-lg-6 rounded-1 m-0 p-0 overflow-hidden shadow-lg"
            data-aos="fade-left"
          >
            <div className="youtube-iframe embed-responsive embed-responsive-1by1 ">
              <iframe
                src=""
                allowFullScreen
              />
            </div>
          </div>
          <div className="col-lg-6 p-3 p-lg-5 pt-lg-3 " data-aos="fade-in">
            <div>
              <h4 className="text-center   " >
                [ ABOUT  TUTOR<span style={{ color: Color.SecondaryColor }}>NET</span> ]
              </h4>
            </div>
            <div className="text-center">
              <h3
                className="m-0 p-0 display-2 "
                style={{  fontWeight: "bold",color:Color.PrimaryColor }}
              >
                [ WHO ARE WE ]
              </h3>
            </div>
            <br /><br />
            <div className="text-center">
              <p className="h1 ">
              We  are launching to new height with  that connect teachers , students and parents to the inspiring work at “TUTORNET”
              </p>
            </div>
            <br />
            <br />
            <Button
              variant="contained"
              style={{ backgroundColor: "red", float: "right" }}
              onClick={() => {
                navigate("/about");
              }}
            >
              READ MORE
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
