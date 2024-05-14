import React from "react";
import "../CHP.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Color } from "../../../Components/CSS/CSS";
import image from '../../../../public/Lanading/istockphoto-1410789354-612x612.jpg'
import ContactUsForm from "./ContactUsForm";

export const Feedback = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="container-fluid ">
        <div
          className="row align-items-center rounded-3  p-3 shadow-lg "
          data-aos="fade-in"
        >
          <div className="col-lg-6 p-3 p-lg-5 pt-lg-3 " data-aos="fade-in">
            <div>
              <h3 className="  container  text-center  "  data-aos="zoom-in-up">
                [ Send your feedback for TUTOR<span style={{ color: Color.SecondaryColor }}>NET</span> ]
              </h3>
            </div>
              <div className="form  " >
                <br />
                <ContactUsForm />
            </div>
            <br />
          </div>
          <div
            className="col-lg-6 rounded-1 m-0 p-0 overflow-hidden shadow-lg "
            data-aos="fade-left"
          >
            <div className="youtube-iframe embed-responsive embed-responsive-1by1 justify-content-center  ">
              <div className="image">
                <img src={image} alt="" style={{ width: '100%', height: 'auto' }} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};
