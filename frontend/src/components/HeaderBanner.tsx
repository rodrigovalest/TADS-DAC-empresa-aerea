import React from "react";

interface HeaderBannerProps {
  text: string;
  body?: React.ReactNode;
}

const HeaderBanner: React.FC<HeaderBannerProps> = ({ text, body }) => {
  return (
    <div
      className="flex flex-col items-center justify-center p-8 text-center bg-cover min-h-120"
      style={{
        backgroundImage: "url('images/header-cliente-landing-page.png')",
        fontFamily: "Pathway Gothic One, sans-serif",
      }}
    >
      <h2 className="text-white text-[64px]">{text}</h2>
      {body}
    </div>
  );
};

export default HeaderBanner;
