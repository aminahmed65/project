import React from 'react'
import {Link} from 'react-router-dom'
import Savorly from '../assets/Savorly.png'
const Navbar=()=>{
    return(
            <nav className='flex justify-between  '>
                <Link to="/">
                   <img className= "h-15 pl-5 "src={Savorly}/>
                </Link>
                <div className="flex space-x-10 mr-15 my-3 text-xl flex">
                    <div className="flex items-center justify-center border-2 w-25 h-8 rounded-xl ">
                    <Link  to="/">
                        Home
                    </Link>
                    </div>
                    
                    <div className="flex items-center justify-center border-2 w-25 h-8 rounded-xl ">
                     <Link to="/quiz">
                        Quiz
                    </Link>
                    </div>

                    <div className="flex items-center justify-center border-2 w-25 h-8 rounded-xl ">
                     <Link to="/library">
                        Library
                    </Link>
                    </div>


                     <div className="flex items-center justify-center border-2 w-40 h-8 rounded-xl ">
                     <Link to="/addrecipes">
                        Add Recipe+
                    </Link>
                    </div>
                </div>
            </nav>
        

    )
}
export default Navbar