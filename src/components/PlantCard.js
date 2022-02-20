import React, { useState } from "react";
import NewPlantForm from "./NewPlantForm";


function PlantCard({ plant, onDeletePlant, onUpdatePlant }) {
  const { id, name, image, price } = plant; 
  const [inStock, setInStock] = useState(true);
  const [updatedPrice, setUpdatedPrice] = useState(price); 

  function Sold() {
    setInStock((inStock) => !inStock);
  }
  function handleDeleteClick() {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE",
    });

    onDeletePlant(id);
  }
  function handlePriceFormSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price: updatedPrice }),
    })
      .then((r) => r.json())
      .then((updatedPlant) => {
        onUpdatePlant(updatedPlant);
      });
  }

return (
    <li className="card" style={{ display: "inline-block"}}>
        <div>
          <img src={image} alt={name} />
          <h4>{name}</h4>
          <p>Price: {price}</p>
          {inStock ? (
          <button id={id} className="primary" onClick={Sold}>In Stock</button>
        ) : (
          <button id={id} onClick={Sold}>Out of Stock</button>
        )}
        <button onClick={handleDeleteClick}>Delete</button>
        <form onSubmit= {handlePriceFormSubmit}>
          <input
          type="number"
          step="0.01"
          placeholder="New price..."
          value={updatedPrice}
          onChange={(e) => setUpdatedPrice(parseFloat(e.target.value))}
          />
          <button type="submit">Update Price</button>
        </form>
        </div>
    </li>
    );

}

export default PlantCard;
