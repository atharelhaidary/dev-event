"use client"
import Link from "next/link";
import Image from "next/image";
import { mergeClasses } from "@/frontend/shared/lib/utils/classNames";
import { usePathname } from "next/navigation";



const Navbar = () => {
    const pathname = usePathname()
    return(
        <header>
            <nav>
                    <Link href="/" className="flex-1 logo">
                        <Image src="/icons/logo.png" alt="logo" width={35} height={35} />
                        <p >DevEvent</p>
                    </Link>
                    <div  className="flex gap-8">
                    {/* <ul> */}
                            {[
                                {
                                    name:'Home',
                                    path:"/",
                                },
                                {
                                    name:'Event',
                                    path:"/events",
                                },
                                {
                                    name:'Create Event',
                                    path:"/events/create",
                                }].map((navItem,index)=>(
                                <Link 
                                        href={navItem.path} 
                                        key={index}
                                        className="group inline-flex"
                                >
                                    <span className={mergeClasses("transition-all duration-300 ease-in-out",pathname ==navItem.path ? "active-link":"" )}>
                                      {navItem.name}
                                   </span>
                                </Link>
                            ))}
                    </div>
            </nav>
         </header>
    )
}
export default Navbar