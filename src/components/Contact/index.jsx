import React from "react";

export default function Contact({ email, phone }) {
  return (
    <div className="contact">
      <h2 className="contact-title">Contact</h2>

      <div className="contact-info">
        <div className="business-email">
          {" "}
          <span className="email-Emoji" role="img">
            {" "}
            ✉️{" "}
          </span>
          <br />
          <br />
          {email}
        </div>
        <div className="business-phone">
          {" "}
          📞
          <br /> <br />
          {phone}
        </div>
      </div>
    </div>
  );
}
