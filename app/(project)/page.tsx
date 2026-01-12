import HomePage from "@/frontend/domains/home-page/components/HomePage";
import { Metadata } from "next";
export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
   title: 'Home - Event Platform',
   alternates: {
     canonical: '/', 
   },
 };
export default async function Home () {
   return <HomePage/>
}


