import React from "react";
import AppProvider from "../frontend/shared/providers/AppProvider";
import './globals.css'
import Navbar from "@/frontend/domains/navbar/Navbar";
import { Metadata } from "next";
const LightRays = React.lazy(() => import("@/frontend/domains/light-rays/LightRays"));


export const metadata: Metadata = {
  title: 'Event Platform',
  description: 'Discover amazing events',
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  
  openGraph: {
    type: 'website',
    locale: 'en_US',
  },
};
export default async function RootLayout({children,}:Readonly<{children: React.ReactNode;}>) {

  return (
    // <React.StrictMode>
   
          <html lang="en">
            <head>
              {/* <meta
                httpEquiv="Content-Security-Policy"
                content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval';"
              /> */}
            </head>
            <body
              className={`antialiased min-h-screen`}
            >

                  {/* <StrictMode> */}
                    <AppProvider>
                            <Navbar/>
                            <div className="absolute inset-0 top-0 z-[-1] min-h-screen">
                                  <LightRays
                                      raysOrigin="top-center-offset"
                                      raysColor="#D81B60"
                                      raysSpeed={0.5}
                                      lightSpread={0.9}
                                      rayLength={1.4}
                                      followMouse={true}
                                      mouseInfluence={0.02}
                                      noiseAmount={0.0}
                                      distortion={0.01}
                                  />
                            </div>
                            <main>
                              {children}
                            </main>
                    </AppProvider>
              {/* </StrictMode> */}
            </body>
          </html>
    // </React.StrictMode>

  );
}
