"use client"
import { UserContext } from '@/context/context'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const page = () => {
    const {isloggedIn,setIsLoggedIn}=UserContext()
    const router = useRouter();
    if(isloggedIn){
        router.push('/products')
    }
    const [user, setUser] = React.useState({
        email: "", password: "", name: ""
    })

    
    const SetUserData = e => {
        /* react Code*/
        const { name, value } = e.target;
        setUser(
            (prevData) => ({
                ...prevData, [name]: value
            })
        )
    }
  
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!user.email || !user.password) {
                alert("fill all the details ")
            }
            else {
                // alert(user.email + " " + user.password +" "+ user.name)
                const registerUser = await fetch('/api/setuser', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(user)
                })
                const result = await registerUser.json();
                console.log(result)
                if (!result.success) {
                    console.log(result)
                    result?.message?.keyValue?.email?alert("email already exits"):alert(result?.message?.message)
                    return;
                }
             
                setUser({
                    email: "", password: "", name: ""
                })
                const sendmail= await fetch('/api/emailsend',{
                    method:"POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(user.email)
                })
                console.log(sendmail)
                setIsLoggedIn(true)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="w-screen h-screen flex justify-center items-center" >
            <div className="w-3/5 h-3/5 flex flex-col justify-center items-center">
                <span className='mt-3'>

                    Do have an account ?<Link href="/login" className="my-6 ml-1 focus:outline-none focus:border-b-2 focus:underline-none focus:border-black hover:text-blue-400 underline "> Log Up</Link>
                </span>
                <form name="Form" className="flex flex-col mt-6 gap-2">

                    <label htmlFor="name" className="text-black/[0.5]">Name</label>
                    <input type="text" name="name" id="name" autoComplete="off" className=" border
border-black/[0.6] rounded-lg py-2 px-3 text-[15px]
focus:outline-none focus:ring focus:border-transparent 
" placeholder="Please Enter Name"
                        value={user.name}
                        onChange={(e) => SetUserData(e)}
                    />

                    <label htmlFor="email" className="text-black/[0.5]">Email</label>
                    <input type="email" name="email" id="email" autoComplete="on" className=" border
border-black/[0.6] rounded-lg py-2 px-3 text-[15px]
focus:outline-none focus:ring focus:border-transparent 
" placeholder="Please Enter Email"
                        value={user.email}
                        onChange={(e) => SetUserData(e)}
                        required
                    />
                    <label htmlFor="password" className="text-black/[0.5]">Password</label>
                    <input type="password" name="password" id="password" className="border border-black/[0.6] rounded-lg py-2 px-3 text-[15px]
focus:outline-none focus:ring-offset-2 focus:ring focus:border-transparent "
                        placeholder="Please Enter Password"
                        value={user.password}
                        onChange={(e) => SetUserData(e)}
                    />
                    <input type="submit" value={"Submit"} className=" mt-3 border border-black rounded-xl py-2 px-3 text-[15px]
focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-black focus:bg-green-500 hover:bg-green-500  "
                        onClick={handleSubmit}
                    />
                </form>
            </div>

        </div>
    )
}

export default page