import Link from "next/link";
import Image from "next/image";

export default function Navbar () {
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
                                    path:"/"
                                },
                                {
                                    name:'Event',
                                    path:"/events"
                                },
                                {
                                    name:'Create Event',
                                    path:"/events/create"
                                }].map((navItem,index)=>(
                                <Link 
                                        href={navItem.path} 
                                        key={index}
                                        className="group inline-flex"
                                >
                                    <span className="transition-all duration-300 ease-in-out">
                                      {navItem.name}
                                   </span>
                                </Link>
                            ))}
                    </div>
            </nav>
         </header>
    )
}