function Quiz(){
    return(
        <div>
            <div className="space-x-8">
      <form>
        <input type="checkbox" id="Dairy"/>
        <label for="Dairy"> Dairy</label>
        
         <input type="checkbox" id="Shellfish"/>
        <label for="Shellfish"> Shellfish</label>
        
         <input type="checkbox" id="Nuts"/>
        <label for="Nuts"> Nuts</label>
        
         <input type="checkbox" id="Gluten"/>
        <label for="Gluten"> Gluten</label>
        
         <input type="checkbox" id="Vegetarian"/>
        <label for="Vegetarian"> Vegetarian</label>
        
         <input type="checkbox" id="Vegan"/>
        <label for="Vegan"> Vegan</label>
        
         <input type="checkbox" id="Pork"/>
        <label for="Pork"> Pork</label>
    
        <input type="checkbox" id="Alcohol"/>
        <label for="Alcohol"> Alcohol</label>

        <input onclick="App.jsx" type="submit" value="Submit Form"></input>
      </form>
    </div>
        </div>
    )
}
export default Quiz