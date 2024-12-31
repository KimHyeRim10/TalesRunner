"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Header from "@/component/layout/Header";
import Footer from "@/component/layout/Footer";
import NavBar from "@/component/layout/NavBar";
import CommunityMainImage from "@/component/community/CommunityMainImage";
import CommunityNavBar from "@/component/community/CommunityNavBar";

export default function ConditionalWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    const isExcluded =
      pathname?.startsWith("/signup") ||
      pathname?.startsWith("/login") ||
      pathname?.startsWith("/withdraw");

    const favicon = document.querySelector("link[rel='icon']");
    if (isExcluded) {
      document.title = "라온엔터테인먼트";
      if (favicon) {
        favicon.setAttribute("href", "/favicon2.ico");
      }
    } else {
      document.title = "TalesRunner";
      if (favicon) {
        favicon.setAttribute("href", "/favicon.ico");
      }
    }
  }, [pathname]);

  const isExcluded =
    pathname?.startsWith("/signup") ||
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/withdraw");

  const isCommunityPage = pathname?.startsWith("/community");

  return (
    <>
      {!isExcluded && <Header />}
      {!isExcluded && <NavBar />}
      {isCommunityPage && <CommunityMainImage />}
      {isCommunityPage && <CommunityNavBar />}
      <div className="w-[1280px] flex justify-center m-auto">{children}</div>
      {!isExcluded && <Footer />}
    </>
  );
}
