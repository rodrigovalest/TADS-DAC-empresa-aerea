import React from "react";

interface HeaderBannerProps {
  text?: string;
  htmlContent?: string;
  body?: React.ReactNode;
}

const HeaderBanner: React.FC<HeaderBannerProps> = ({
  text,
  htmlContent,
  body,
}) => {
  return (
    <div
      className="flex flex-col items-center justify-center p-8 text-center bg-cover min-h-100"
      style={{
        backgroundImage: "url('/images/header-cliente-landing-page.png')",
        fontFamily: "Pathway Gothic One, sans-serif",
      }}
    >
      {htmlContent ? (
        <h2
          className="text-white text-[64px]"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      ) : (
        <h2 className="text-white text-[64px]">{text}</h2>
      )}
      {body}
    </div>
  );
};

export default HeaderBanner;
