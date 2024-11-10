import React from "react";

const Footer = () => {
  var dates = new Date();
  return (
    <div className="h-9 text-white text-2xl w-full bg-blue-700 ">
      copyright &copy;{dates.getFullYear()} All rights reserved
    </div>
  );
};

export default Footer;
