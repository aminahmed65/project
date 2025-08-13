import { useState } from "react";
import data from "./data";

export default function Lib(){
      const [savedRecipes, setSavedRecipes] = useState([]);
  const API_URL = import.meta.env.VITE_RAILWAY_API_URL || 'http://localhost:3001';

  useEffect(() => {
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

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Saved Recipes</h2>
      {savedRecipes.length === 0 ? (
        <p>No saved recipes yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {savedRecipes.map(item => (
            <div key={item.id} className="border rounded-lg p-4 shadow">
              <img src={item.data.pic} alt={item.data.dish} className="w-full h-40 object-cover rounded" />
              <h3 className="text-xl font-semibold mt-2">{item.data.dish}</h3>
              <p className="text-sm text-gray-600">{item.data.chef}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
