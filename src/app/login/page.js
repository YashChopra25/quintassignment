"use client"
import { UserContext } from '@/app/context/context'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect } from 'react'
const Login = () => {
    const { isloggedIn, setIsLoggedIn } =UserContext()
    const router = useRouter();
    


    const [user, setUser] = React.useState({
        email: "", password: ""
    })

    const SetUserData = e => {

        const { name, value } = e.target;
        setUser(
            (prevData) => ({
                ...prevData, [name]: value
            })
        )
    }

    const loginuser = async (e) => {
        e.preventDefault();
        if (!user.email || !user.password) {
            alert("fill all the deatils ")
        }
        else {

            let getuser = await fetch("/api/getuser",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user)
                }
            );
            getuser = await getuser.json()
            if (!getuser.success) {
                alert(getuser.message);
                return;
            }
            setUser({
                email: "", password: ""
            })

            setIsLoggedIn(true)
        }
    }
    useEffect(() => {
        if (isloggedIn) {
          router.push('/products');
        }
      }, [isloggedIn, router]);
      
        
    return (
        <div className="w-screen h-screen flex justify-center items-center" >
            <div className="w-3/5 h-3/5 flex flex-col justify-center items-center">
                <span className='mt-3'>

                    Don&apos;t have an account ?<Link href="/signup" className="my-6 ml-1 focus:outline-none focus:border-b-2 focus:underline-none focus:border-black hover:text-blue-400 underline "> Sign Up</Link>
                </span>
                <form name="Form" className="flex flex-col mt-6 gap-3" >
                    <label htmlFor="email" className="text-black/[0.5]">Email</label>
                    <input type="email" name="email" id="email" autoComplete="on" className=" border
                             border-black/[0.6] rounded-lg py-2 px-3 text-[15px]
                            focus:outline-none focus:ring focus:border-transparent 
     " placeholder="Please Enter Email"
                        value={user.email}
                        onChange={(e) => { SetUserData(e) }}
                    />
                    <label htmlFor="password" className="text-black/[0.5]">Password</label>
                    <input type="password" name="password" id="password" className="border border-black/[0.6] rounded-lg py-2 px-3 text-[15px]
                            focus:outline-none focus:ring-offset-2 focus:ring focus:border-transparent "
                        placeholder="Please Enter Password"
                        value={user.password}
                        onChange={(e) => { SetUserData(e) }}
                    />
                    <input type="submit" value={"Submit"} className=" mt-2 border border-black rounded-xl py-2 px-3 text-[15px] max-md:w-full
                            focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-black focus:bg-green-500 hover:bg-green-500  "
                        onClick={loginuser}
                    />
                </form>
            </div>

        </div>
    )
}

export default Login;