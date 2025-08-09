import { useState, useEffect } from 'react'


export default function recipes(){
   const [rest,setRest]= useState([])
     const [data, setData] = useState([])
     const [newItem, setNewItem] = useState({ id: '', chef: '', dish: '', inst: '', img: '' })
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
       if (!newItem.id.trim() || !newItem.chef.trim() || !newItem.dish.trim() || !newItem.inst.trim() || !newItem.type.trim()) {
         alert('Please fill in all fields before saving.')
         return
       }
       
       console.log('API_URL:', API_URL)
       console.log('Sending data:', { id: newItem.id, data: { chef: newItem.chef, dish: newItem.dish, inst: newItem.inst, type: newItem.type } })
       
       try {
         const response = await fetch(`${API_URL}/api/data`, {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({
             id: newItem.id,
             data: { chef: newItem.chef, dish: newItem.dish, inst: newItem.inst, type: newItem.type }
           })
         })
         
         console.log('Response status:', response.status)
         console.log('Response ok:', response.ok)
         
         if (response.ok) {
           const responseData = await response.json()
           console.log('Success response:', responseData)
           setNewItem({ id: '', chef: '', dish: '', inst: '', type: '' })
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
       if (!editingItem.chef.trim() || !editingItem.dish.trim() || !editingItem.inst.trim() || !editingItem.type.trim()) {
         alert('Please fill in all fields before saving.')
         return
       }
       
       try {
         const response = await fetch(`${API_URL}/api/data/${editingItem.id}`, {
           method: 'PUT',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({
             data: { chef: editingItem.chef, dish: editingItem.dish, inst: editingItem.inst, type: editingItem.type }
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
        <div>
            
            
        </div>
    )
}
