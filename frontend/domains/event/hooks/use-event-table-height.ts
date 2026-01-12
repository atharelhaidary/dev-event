"use client"
import { useEffect, useState } from "react";

export const useEventTableHeight = () => {
    const [windowHeight, setWindowHeight] = useState(0);
    useEffect(() => {
        setWindowHeight(window.innerHeight);
        
        const handleResize = () => {
          setWindowHeight(window.innerHeight);
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);
      
    const tableHeight = windowHeight - 420;


  return { tableHeight }
}
