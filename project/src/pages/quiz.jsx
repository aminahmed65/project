import { useState } from "react"
function Quiz(){
    return(
    
    <div className="h-screen bg-[#AEBD93] place-items-center font-serif ">
      <div className="mt-0">
          <div className="bg-white h-160 w-100 place-items-center mt-0 rounded-xl ">
            <form className="text-2xl space-y-8 m-8 place-items-center rounded-sm  ">
               <h1 className="text-4xl mt-4 m mx-4  ">Dietary Restriction Section </h1>
                <h1 className="ml-0 italic font-light">Please select all that apply</h1>

               <input className="w-5 h-5 mt-2 rounded-md p-0 "  type="checkbox" id="Dairy" />
               <label className="" for="Dairy fontlight"> Dairy-Free</label> <br></br> 
        
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
              <div >
              <input className="bg-sky-100 rounded-sm hover:bg-sky-200 " type="submit" value="Submit Form" ></input> <br></br>
              </div>
            </form>
            </div>

          </div>
        {/*}  <div className="h-screen w-bg-[url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScFpNHUtJt7bRoLguodbD-0OEXok6q1lp5dCnfElhzu32jbvcF)] bg-cover">

          </div>
          */}
    </div>
    )
}
export default  Quiz
