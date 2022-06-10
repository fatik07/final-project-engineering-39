import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <>
      <div className="footer">
        <div className="container-custom ms-5 me-5">
          <div className="row footer-custom">
            <div className="col-12 col-lg-4 col-md-6">
              <div className="row">
                <div className="col-12 col-lg-12 col-md-12">
                  <p className="footer-name">
                    <span>Ladang</span> Materi
                  </p>
                </div>
                <div className="col-12 col-lg-12 col-md-12">
                  <p className="footer-subname">Make it Simple</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-8 col-md-6 mt-3">
              <div className="row">
                <div className="col-4 col-lg-4 col-md-4 social-media">
                  <h3>Social Media</h3>
                  <div className="instagram">
                    <a
                      href="https://www.instagram.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Instagram
                    </a>
                  </div>
                  <div className="twitter">
                    <a
                      href="https://www.twitter.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Twitter
                    </a>
                  </div>
                  <div className="facebook">
                    <a
                      href="https://www.facebook.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Facebook
                    </a>
                  </div>
                </div>
                <div className="col-4 col-lg-4 col-md-4 social-media">
                  <h3>Office</h3>
                  <div className="office">
                    <p>Jalan gang buntu, no 6 Kalimantan Barat</p>
                  </div>
                </div>
                <div className="col-4 col-lg-4 col-md-4 social-media">
                  <h3>Help Center</h3>
                  <div className="help-center">
                    <a
                      href="mailto:ladangmateri@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ladangmateri@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">
        <div className="ms-5 me-5">
          <div className="row">
            <div className="col-12 col-lg-12 col-md-12 text-center">
              <p>2022 &copy; Ladang Materi</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
