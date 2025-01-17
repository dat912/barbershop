import React from "react";
import style from "./Footer.module.scss";
import classNames from "classnames/bind";
import logo from "../../assets/logo-barber.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faFacebookMessenger,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
const cx = classNames.bind(style);
export default function Footer() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("footer")}>
        <div className={cx("left")}>
          <div className={cx("image-logo")}>
            <img src={logo} alt="" />
          </div>
          <ul className={cx("ul")}>
            <li className={cx("li")}>
              <FontAwesomeIcon icon={faEnvelope} />
              :letrandat@gmail.com
            </li>
            <li className={cx("li")}>
              <FontAwesomeIcon icon={faPhone} />: 0988888888
            </li>
          </ul>
        </div>
        <div className={cx("mid")}></div>
        <div className={cx("right")}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15679.817641153899!2d106.6778321!3d10.7379972!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f62a90e5dbd%3A0x674d5126513db295!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2jhu4cgU8OgaSBHw7Ju!5e0!3m2!1svi!2s!4v1717820687943!5m2!1svi!2s"
            className={cx("map")}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <div className={cx("copy-right")}>DATDAT2024</div>
    </div>
  );
}
