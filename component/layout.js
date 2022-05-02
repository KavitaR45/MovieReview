import React from "react"
import Link from "next/link"

export default function Layout({children}){
   return(
       <>
         <div  className="container"><Link href="/"><a><img src={"/image/logo.png"}/></a></Link></div>
         {children}
       </>
   )
}