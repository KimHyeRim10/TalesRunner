import type { Metadata } from "next";
import "./globals.css";

import ConditionalWrapper from "@/component/layout/ConditionalWrapper";
import { FormProvider } from "@/context/FormContext";
import { UserProvider } from "@/context/UserContext";
import { CommentProvider } from "@/context/CommentContext";

export const metadata: Metadata = {
  title: "TaiesRunner",
  description: "talesruunner clone coding",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <UserProvider>
          <ConditionalWrapper>
            <CommentProvider>
              <FormProvider>{children}</FormProvider>
            </CommentProvider>
          </ConditionalWrapper>
        </UserProvider>
      </body>
    </html>
  );
}
