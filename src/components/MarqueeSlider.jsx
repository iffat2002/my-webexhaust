import React from "react";
import Marquee from "react-fast-marquee";

const MarqueeSlider = ({ logos, direction }) => {
  return (
    <Marquee direction={direction}>
      {logos.map((logo, index) => (
        <div className="marquee-box" key={index}>
          <img src={logo} alt={`Logo ${index + 1}`} />
        </div>
      ))}
    </Marquee>
  );
};

export default MarqueeSlider;
