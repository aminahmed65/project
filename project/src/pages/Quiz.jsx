import { useState } from "react"
export function Quiz(){
    return(
     <div className="mx-120 bg-">
      <h1 className="text-4xl my-4 mx-4  ">Dietary Restriction Section </h1>
           <div className="text-3xl mx-7 bg-[]">
            <form className="text-2xl space-y-5 font-light mx- ">
               <input className="w-5 h-5 border-7" type="checkbox" id="Dairy" />
               <label for="Dairy"> Dairy-Free</label> <br></br> 
        
               <input  className="w-5 h-5 border-8" type="checkbox" id="Shellfish"/>
               <label for="Shellfish"> Shellfish</label> <br></br>
        
               <input  className="w-5 h-5" type="checkbox" id="Nuts"/>
               <label for="Nuts"> Nuts</label> <br></br>
        
               <input  className="w-5 h-5" type="checkbox" id="Gluten"/>
               <label for="Gluten"> Gluten-Free</label> <br></br>
        
               <input  className="w-5 h-5" type="checkbox" id="Vegetarian"/>
              <label for="Vegetarian"> Vegetarian</label> <br></br>
        
               <input  className="w-5 h-5" type="checkbox" id="Vegan"/>
               <label for="Vegan"> Vegan</label> <br></br>
        
         <input  className="w-5 h-5" type="checkbox" id="Halal"/>
        <label for="Halal"> Halal</label> <br></br>

        <input className="bg-sky-100 rounded-sm hover:bg-sky-200 " type="submit" value="Submit Form" ></input> <br></br>
      </form>
    </div>
 
   </div>
    )
}
