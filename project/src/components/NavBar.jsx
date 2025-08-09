import React from 'react'
import {Link} from 'react-router-dom'
import Savorly from '../assets/Savorly.png'
const Navbar=()=>{
    return(
            <nav className='flex justify-between bg-gray-300 '>
                <Link to="/">
                   <img className= "h-15 pl-5 "src={Savorly}/>
                </Link>
                <div className="flex space-x-10 mr-15 my-2 text-xl">
                     <Link to="/quiz">
                        Quiz
                    </Link>

                     <Link to="/storage">
                        Library
                    </Link>
                </div>
            </nav>
        

    )
}
export default Navbar