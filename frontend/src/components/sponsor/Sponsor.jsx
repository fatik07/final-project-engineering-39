import React from "react";
import "./Sponsor.css";
import rg from "../../assets/img/ruangguru.png";
import zeni from "../../assets/img/zenius.png";

export default function Sponsor() {
  return (
    <div className="container container-custom">
      <div className="row text-center">
        <div className="col-6 col-lg-3 col-md-3 col-sm-6 mb-2 img-sponsor">
          <img src={rg} alt="" />
        </div>
        <div className="col-6 col-lg-3 col-md-3 col-sm-6 mb-2 img-sponsor">
          <img style={{ marginTop: "-16px" }} src={zeni} alt="" />
        </div>
        <div className="col-6 col-lg-3 col-md-3 col-sm-6 mb-2 img-sponsor">
          <img src={rg} alt="" />
        </div>
        <div className="col-6 col-lg-3 col-md-3 col-sm-6 mb-2 img-sponsor">
          <img style={{ marginTop: "-15px" }} src={zeni} alt="" />
        </div>
      </div>
    </div>
  );
}
