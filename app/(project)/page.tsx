import HomePage from "@/frontend/domains/home-page/components/HomePage";
import { Metadata } from "next";
export const dynamic = 'force-dynamic'
export async function generateMetadata( ): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourevents.com';
  return {
    title: 'Home - Event Platform',
    alternates: {
      canonical: `${baseUrl}`, 
    },
  };
}
export default async function Home () {
   return <HomePage/>
}


