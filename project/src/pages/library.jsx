import { useState, useEffect } from "react";

export default function Library() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const API_URL = import.meta.env.VITE_RAILWAY_API_URL || 'http://localhost:3001';
  const [editingItem, setEditingItem] = useState(null);
  const [viewedRecipe, setViewedRecipe] = useState(null);

  function openRecipe(){
      setView(view=>!view)
    }

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/api/data`);
      const result = await response.json();
      const filtered = result.filter(item => item.data.saved === true);
      setSavedRecipes(filtered);
    } catch (error) {
      console.error('Error fetching saved recipes:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  

  const updateItem = async (event) => {
    event.preventDefault();
    
    if (!editingItem.chef.trim() || !editingItem.dish.trim() || !editingItem.inst.trim() || 
        !editingItem.pic.trim() || !editingItem.cat1.trim() || !editingItem.cat2.trim()) {
      alert('Please fill in all fields before saving.');
      
      return;
    }
    
    

    try {

      const response = await fetch(`${API_URL}/api/data/${editingItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: {
            chef: editingItem.chef,
            dish: editingItem.dish,
            inst: editingItem.inst,
            pic: editingItem.pic,
            saved: editingItem.saved,
            cat1: editingItem.cat1,
            cat2: editingItem.cat2
          }
        })
      });
      if (response.ok) {
        setEditingItem(null);
        fetchData();
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-10">Saved Recipes</h2>
      {savedRecipes.length === 0 ? (
        <p>No saved recipes yet.</p>
      ) : (
        <div className=" grid grid-cols-3 gap-x-1 gap-y-4">
          {savedRecipes.map(item => (
            <div key={item.id} className=" w-60 border rounded-lg p-4 shadow content-center">
              <img src={item.data.pic} className="flex justify-center h-50 w-50" alt={item.data.dish} />
              <h3 className="flex justify-center  text-xl font-semibold mt-2">{item.data.dish}</h3>
              <p className="text-sm text-gray-600">{item.data.chef}</p>
               <div className=" flex justify-center gap-3 ml-4">
                    <button
                      onClick={() => setEditingItem({id: item.id, ...item.data})}
                      className=" h-10 w-13 tx-lg border-1 rounded-lg"
                    >
                      Edit
                    </button>

                      <button className="h-10 w-13 tx-lg border-1 rounded-lg" onClick={() => setViewedRecipe(item)} >
                    View
                    </button>

                  </div>
            </div>
          ))}
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
      )}
      
      {editingItem && (
        <form onSubmit={updateItem} className="mt-6 p-4 border rounded bg-gray-100 space-y-4">
          <input
            type="text"
            placeholder="Chef"
            value={editingItem.pic}
            onChange={(e) => setEditingItem({ ...editingItem, pic: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          />
          <textarea
            placeholder="Instructions"
            value={editingItem.inst}
            onChange={(e) => setEditingItem({ ...editingItem, inst: e.target.value })}
            className="w-full px-3 py-2 border rounded"
            required
          />
          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditingItem(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}