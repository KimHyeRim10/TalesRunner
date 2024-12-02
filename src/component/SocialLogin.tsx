import React from "react";

export default function SocialLogin() {
  type SocialLogin = Record<"image" | "alt" | "background", string>;

  const socialLoginList: SocialLogin[] = [
    {
      image: "/login/social-ico-1.png",
      alt: "socialico1",
      background: "#ffffff",
    },
    {
      image: "/login/social-ico-2.png",
      alt: "socialico2",
      background: "#1877F2",
    },
    {
      image: "/login/social-ico-3.png",
      alt: "socialico3",
      background: "#03C75A",
    },
    {
      image: "/login/social-ico-4.png",
      alt: "socialico4",
      background: "#0F1419",
    },
    {
      image: "/login/social-ico-5.png",
      alt: "socialico5",
      background: "#ffffff",
    },
  ];

  return (
    <div className="flex justify-center gap-3">
      {socialLoginList.map((item) => (
        <div
          key={item.alt}
          className={`flex-center w-[48px] h-[48px] border border-[var(--border-color)] rounded-[100px]`}
          style={{ background: item.background }}
        >
          <img className="w-[20px] h-[20px]" src={item.image} alt={item.alt} />
        </div>
      ))}
    </div>
  );
}
