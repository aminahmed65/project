import { useState, useEffect } from 'react'
import { RxTimer } from "react-icons/rx";
import watch from "../assets/watch.png"


export default function data(prop){
   const [rest,setRest]= useState([])
     const [data, setData] = useState([])
     const [newItem, setNewItem] = useState({ id: '', chef: '', dish: '', inst: '', pic: '', saved: false , cat1:'' , cat2:''  })
     const [editingItem, setEditingItem] = useState(null)
     const [viewedRecipe, setViewedRecipe] = useState(null);
     


     // Use RAILWAY_API_URL environment variable for Railway deployment  
     const API_URL = import.meta.env.VITE_RAILWAY_API_URL || 'http://localhost:3001'
   
    function popUp(){
      const togglePopup = () => {
      setIsOpen(pop => !pop);
  };
    }

    function openRecipe(){
      setView(view=>!view)
    }
     
     
     // CRUD Operations - HTTP Requests:
     
     // READ: Fetch all data items (HTTP GET)
     // GET /api/data - Retrieves all items from the database
     const fetchData = async () => {
       try {
         const response = await fetch(`${API_URL}/api/data`)
         const result = await response.json()
         setData(result)
       } catch (error) {
         console.error('Error fetching data:', error)
       }
     }
   
     // CREATE: Add new data item (HTTP POST)
     // POST /api/data - Creates a new item in the database
     const createItem = async (event) => {
       event.preventDefault()
       
       // Validate all fields are filled
       if (!newItem.id.trim() || !newItem.chef.trim() || !newItem.dish.trim() || !newItem.inst.trim() || !newItem.pic.trim() || !newItem.cat1.trim() || !newItem.cat2.trim() ) {
         alert('Please fill in all fields before saving.')
         return
       }
       
       console.log('API_URL:', API_URL)
       console.log('Sending data:', { id: newItem.id, data: { chef: newItem.chef, dish: newItem.dish, inst: newItem.inst, pic: newItem.pic, saved: newItem.saved, cat1: newItem.cat1 , cat2: newItem.cat2} })
       
       try {
         const response = await fetch(`${API_URL}/api/data`, {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({
             id: newItem.id,
             data: { chef: newItem.chef, dish: newItem.dish, inst: newItem.inst, pic: newItem.pic, saved: newItem.saved, cat1: newItem.cat1, cat2: newItem.cat2 }
           })
         })
         
         console.log('Response status:', response.status)
         console.log('Response ok:', response.ok)
         
         if (response.ok) {
           const responseData = await response.json()
           console.log('Success response:', responseData)
           setNewItem({ id: '', chef: '', dish: '', inst: '', pic: '' , saved: false, cat1:'',cat2:''})
           fetchData()
         } else {
           const errorData = await response.text()
           console.error('Error response:', errorData)
           alert(`Error saving item: ${response.status} - ${errorData}`)
         }
       } catch (error) {
         console.error('Network error creating item:', error)
         alert(`Network error: ${error.type}`)
       }
     }
   
     // UPDATE: Modify existing data item (HTTP PUT)
     // PUT /api/data/:id - Updates an existing item by ID in the database
     const updateItem = async (event) => {
       event.preventDefault()
       
       // Validate all fields are filled
       if (!editingItem.chef.trim() || !editingItem.dish.trim() || !editingItem.inst.trim() || !editingItem.pic.trim() || !editingItem.cat1.trim() || !editingItem.cat2.trim()) {
         alert('Please fill in all fields before saving.')
         return
       }
       
       try {
         const response = await fetch(`${API_URL}/api/data/${editingItem.id}`, {
           method: 'PUT',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({
             data: { chef: editingItem.chef, dish: editingItem.dish, inst: editingItem.inst, pic: editingItem.pic, saved: editingItem.saved, cat1: editingItem.cat1, cat2: editingItem.cat2 }
           })
         })
         if (response.ok) {
           setEditingItem(null)
           fetchData()
         }
       } catch (error) {
         console.error('Error updating item:', error)
       }
     }

   const toggleSaved = async (item) => {
  try {
    const updatedItem = {
      ...item,
      saved: !item.saved
    };

    const response = await fetch(`${API_URL}/api/data/${item.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: {
          chef: updatedItem.chef,
          dish: updatedItem.dish,
          inst: updatedItem.inst,
          pic: updatedItem.pic,
          saved: updatedItem.saved,
          cat1: updatedItem.cat1,
          cat2: updatedItem.cat2
        }
      })
    });

    if (response.ok) {
      fetchData(); // Refresh data to show updated favorite status
    } else {
      console.error('Failed to toggle favorite');
    }
  } catch (error) {
    console.error('Error toggling favorite:', error);
  }
};
   
     // DELETE: Remove data item (HTTP DELETE)
     // DELETE /api/data/:id - Deletes an item by ID from the database
     const deleteItem = async (id) => {
       try {
         const response = await fetch(`${API_URL}/api/data/${id}`, {
           method: 'DELETE'
         })
         if (response.ok) {
           fetchData()
         }
       } catch (error) {
         console.error('Error deleting item:', error)
       }
     }
   
     useEffect(() => {
       fetchData()
     }, [])
     
    return(
  <div className="">
       <div className="space-y-3 hidden">
       <h1>Adding pre-built Recipes to the database</h1>
       <input type="text" placeholder='search bar' className=''></input>
       <form onSubmit={createItem}>
        <div className="">
            <input
              type="text"
              placeholder="Id"
              value={newItem.id}
              onChange={(event) => setNewItem({...newItem, id: event.target.value})}
              className="px-4 py-3 border border-gray-300 rounded-lg"
              required
            />
        </div>

          <div className="">
            <input
              type="text"
              placeholder="Dish Name"
              value={newItem.dish}
              onChange={(event) => setNewItem({...newItem, dish: event.target.value})}
              className="px-4 py-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="">
            <input
              type="text"
              placeholder="Chef"
              value={newItem.chef}
              onChange={(event) => setNewItem({...newItem, chef: event.target.value})}
              className="px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="">
            <textarea 
              type="text"
              placeholder="Instructions"
              value={newItem.inst}
              onChange={(event) => setNewItem({...newItem, inst: event.target.value})}
              className="px-4 py-3 border border-gray-300 rounded-lg h-40"
              required
            />
          </div>

          <div className="">
            <input
              type="text"
              placeholder="Pictures"
              value={newItem.pic}
              onChange={(event) => setNewItem({...newItem, pic: event.target.value})}
              className="px-4 py-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

           <label for="Saved"> Save </label>
           <input 
            type="checkbox"
            id="Saved" 
            name="butt"
            checked={newItem.saved === true}
            onChange={(event) => setNewItem({ ...newItem, saved: event.target.checked })}
/>

          <div className="">
           <label for="Savory"> Savory </label>
           <input 
            type="radio"
            id="Savory" 
            name="rad"
            value="Savory"
            checked={newItem.cat1==="Savory"}
            onChange={(event) => setNewItem({ ...newItem, cat1: event.target.value })}
            />

           <label for="Sweet"> Sweet </label>
           <input type="radio" id="Sweet" name="rad" 
            value="Sweet"
            checked={newItem.cat1==="Sweet"}
            onChange={(event) => setNewItem({ ...newItem, cat1: event.target.value })}
            />
          
           <label for="Tangy"> Tangy </label>
           <input type="radio" id="Tangy" name="rad"
            value="Tangy"
            checked={newItem.cat1==="Tangy"}
            onChange={(event) => setNewItem({ ...newItem, cat1: event.target.value })}
            />

           <label for="Fresh"> Fresh </label>
           <input type="radio" id="Fresh" name="rad" 
            value="Fresh"
            checked={newItem.cat1==="Fresh"}
            onChange={(event) => setNewItem({ ...newItem, cat1: event.target.value })}
          />
        </div>
         
         <div className="" id="Korean">
           <label for="Korean"> Korean </label>
           <input 
            type="radio"
            id="Korean" 
            name="rad2"
            value="Korean"
            checked={newItem.cat2==="Korean"}
            onChange={(event) => setNewItem({ ...newItem, cat2: event.target.value })}
            />

           <label for="French"> French </label>
           <input type="radio" id="French" name="rad2" 
            value="French"
            checked={newItem.cat2==="French"}
            onChange={(event) => setNewItem({ ...newItem, cat2: event.target.value })}
            />
          
           <label for="Mexican"> Mexican </label>
           <input type="radio" id="Mexican" name="rad2"
            value="Mexican"
            checked={newItem.cat2==="Mexican"}
            onChange={(event) => setNewItem({ ...newItem, cat2: event.target.value })}
            />

           <label for="Nigerian"> Nigerian </label>
           <input type="radio" id="Nigerian" name="rad2" 
            value="Nigerian"
            checked={newItem.cat2==="Nigerian"}
            onChange={(event) => setNewItem({ ...newItem, cat2: event.target.value })}
          />

           <label for="American"> American </label>
           <input type="radio" id="Nigerian" name="rad2" 
            value="American"
            checked={newItem.cat2==="American"}
            onChange={(event) => setNewItem({ ...newItem, cat2: event.target.value })}
          />
         
        <div className="flex justify-end mt-6">
            <button type="submit" className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
              Add Item
            </button>

          </div>
        </div>
      </form>
</div>
 {/* Edit Item Form */}
      {editingItem && (
        <div className="bg-gradient-to-br from-amber-50 to-orange-100 p-6 rounded-xl mb-8 shadow-lg border border-amber-200">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Edit Item
          </h2>
          <form onSubmit={updateItem} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <textarea
                type="text"
                placeholder="Instructions"
                value={editingItem.inst}
                onChange={(event) => setEditingItem({...editingItem, inst: event.target.value})}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                required
              />
            </div>
          
            <div className="flex gap-4 mt-6">
              <button type="submit" className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                Update Item
              </button>
              <button 
                type="button" 
                onClick={() => setEditingItem(null)}
                className="px-8 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold rounded-lg hover:from-gray-600 hover:to-gray-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Data List */}
    <div className="">
      <div className="">
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800">
            Recipes
          </h2>
         </div>
         {data.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-xl text-gray-500 mb-2">No data yet!</p>
            <p className="text-gray-400">Add some items to get started</p>
          </div>
        ) : (
          <div className=" grid grid-cols-3 gap-x-1 gap-y-4">
            {data.map(item => (
              <div key={item.id} className="w-60 h-85 border-3 rounded-t-lg flex items-center justify-center border-[#7A8450]">
                <div className="">
                  <div className="">
                    <div className="border-0 rounded-t-xl">
                       <img className="h-56.5 w-60 bg-cover rounded-t-lg border-[#7A8450]" src={item.data.pic}/>
                    </div>
                    <h3 className="text-xl font-thin flex items-center justify-center">{item.data.dish}</h3>
                    {/*<p className="  flex items-center justify-center text-gray-600 mb-2">Chef: {item.data.chef}</p>*/}
                    <div className="flex space-x-5 font-normal ml-2 ">
                    <p className=" flex items-center justify-center mb-2 border-1 border-[#7A8450] h-9 w-20 rounded-full space-y-2">{item.data.cat1}</p>
                    <p className=" flex items-center justify-center mb-2 border-1 border-[#7A8450] h-9 w-20 rounded-full space-y-2">{item.data.cat2}</p>
                    </div>
                    <div className="">
                      <p className="text-xl font-bold">{item.data.saved}</p>
                    </div>
                  </div>
                  

                  <div className="ml-5 flex gap-10 ">

                    <button className="h-10 w-13 tx-lg border-1 rounded-lg" onClick={() => setViewedRecipe(item)} >
                    View
                    </button>


                    <button
                        onClick={() => toggleSaved({ id: item.id, ...item.data })}
                        className={`px-4 py-2 font-semibold rounded-lg transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg ${
                        item.data.saved
                         ?   'hover:bscale-80'
                           : 'hover:120'
                        }`}
                        >
                      {item.data.saved ? <img  className=" h-7 w-7"src="https://static.vecteezy.com/system/resources/previews/018/868/329/non_2x/red-heart-symbol-on-transparent-background-free-png.png"/>: <img className="h-7 w-7 " src="https://www.iconpacks.net/icons/2/free-heart-icon-3510-thumb.png"/>}
                      </button>
                  </div>
                  
                </div>
              </div>
            ))}
          </div>
        )}
    {viewedRecipe && (
  <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex justify-center items-start pt-20 px-4">
    <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-lg relative">
      <button
        onClick={() => setViewedRecipe(null)}
        className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl font-bold"
      >
        &times;
      </button>
      <h2 className="text-2xl font-semibold mb-4">{viewedRecipe.data.dish}</h2>
      <p className="text-gray-700 whitespace-pre-wrap">
        {viewedRecipe.data.inst}
      </p>
    </div>
  </div>
)}
      </div>
    </div>
    <div>
      <input type="text" id="import" ></input>
    </div>
    </div>
    )
}
