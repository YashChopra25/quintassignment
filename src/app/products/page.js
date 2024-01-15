"use client"
import React, { useEffect, useState } from 'react'

import ProductCard from './ProductCard'
import { UserContext } from '@/app/context/context'
import { useRouter } from 'next/navigation'

const Products = () => {
    const [data, setdata] = useState([])
    const [loading, setloading] = useState(true)
    const { isloggedIn, setIsLoggedIn } = UserContext();
    const router = useRouter()
    const getProductList = async () => {
        try {
            let list = await fetch("https://fakestoreapi.com/products");
            list = await list.json()
            setdata(list)
            setloading(false)
        } catch (error) {
            console.log(err)
        }
    }
    useEffect(() => {
        if (!isloggedIn) {
            router.push('/login')
        }
        getProductList();
    }, [isloggedIn, router])

    const logout = () => {
        setIsLoggedIn(false)

    }
    return loading ? (
        <div className='w-screen h-screen bg-white flex justify-center items-center'>
            loading
        </div>
    ) : (
        <div className='flex bg-white '>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 p-2">

                <button onClick={logout} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded
           z-10 fixed right-0
           '>Logout</button>
                {
                    data.map((prev, index) => {
                        return (
                            <ProductCard key={index} data={prev} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Products;