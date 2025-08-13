import { useState, useEffect } from 'react'
import { RxTimer } from "react-icons/rx";
import watch from "../assets/watch.png"


export default function Recipes(prop){
    return(
       <div className="space-y-3">
          <img className="h-53 w-57 border-1" src={prop.Img} alt="Image of a recipe"/>
          <p className="font-style: italic ml-8">{prop.reciName}</p>
          <button className="border-2 h-10 w-27 ml-16 rounded-xl bg-gray-200">Ingredients</button>
          <div className="flex space-x-3 mx-7 ">
            <img className="h-9 w-7" src={watch}/>
            <p className=" underline-offset-1 mt-2 font-thin font-style: italic">Cook time : {prop.Time} </p>
          </div>
       </div>
    )
}
