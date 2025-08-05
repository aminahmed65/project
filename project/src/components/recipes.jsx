function recipes(props){
    return(
        <div>
            <img src={props.img} alt="An image of the dish"></img>
            <h2>Dish: {props.dish} </h2>
            <h3>Chef Name: {props.chef}</h3>
            <h4>Summary:{props.sum}</h4>


        </div>
    )
}
export default recipes