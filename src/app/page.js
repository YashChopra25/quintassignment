import Link from "next/link";
import dbconnect from "@/services/dbconnect";
import { UserProvider } from "@/context/context";
import { useRouter } from "next/navigation";

export default function Home() {

  dbconnect();
 
  return (
      <div className="w-screen h-screen flex justify-center items-center" >
        <div className="w-2/4 h-1/2 flex justify-evenly items-center">
          <Link href={"/signup"} className=" text-white bg-[#24292F]  hover:bg-white/[0.4] hover:text-black focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2">Signup</Link>
          <Link href={"/login"} className="text-white bg-[#24292F] hover:bg-white/[0.4] hover:text-black focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2">Login</Link>
        </div>
      </div>
  )
}
