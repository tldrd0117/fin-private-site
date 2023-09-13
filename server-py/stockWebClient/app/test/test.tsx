"use client"

import { useMutation } from "@tanstack/react-query"
import React from "react"

export function Test() {

    const [isClick, setIsClick] = React.useState(false)
    const {mutate, isSuccess} = useMutation({
        mutationFn: async () => {
            const res = await fetch("http://localhost:3300/api/hello")
            return res.json()
        },
        onSuccess: (data) => {
            console.log(data)
        }
    })
    
    const handleClick = () => {
        console.log("click")
        mutate()
    }

    return <div className="absolute w-full h-full">
        <button onClick={(e:any)=>handleClick()}>BUTTON</button>
        {isSuccess}
    </div>

}