import { useState, useEffect } from 'react'
import { RxTimer } from "react-icons/rx";
import watch from "../assets/watch.png"


export default function Data(prop){
   const [rest,setRest]= useState([])
     const [data, setData] = useState([])
     const [newItem, setNewItem] = useState({ id: '', chef: '', dish: '', inst: '', pic: '', saved: false, cat1:'' , cat2:''  })
     const [editingItem, setEditingItem] = useState(null)
     // Use RAILWAY_API_URL environment variable for Railway deployment  
     const API_URL = import.meta.env.VITE_RAILWAY_API_URL || 'http://localhost:3001'
   
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
       if (!editingItem.chef.trim() || !editingItem.dish.trim() || !editingItem.inst.trim() || !editingItem.pic.trim() || !editingItem.saved.trim() || !editingItem.cat1.trim() || !editingItem.cat2.trim()) {
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
       <div className="space-y-3">
       <h1>Adding pre-built Recipes to the database</h1>
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
            <input 
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
          
           <label for="Turkish"> Turkish </label>
           <input type="radio" id="Turkish" name="rad2"
            value="Turkish"
            checked={newItem.cat2==="Turkish"}
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
    )
}
