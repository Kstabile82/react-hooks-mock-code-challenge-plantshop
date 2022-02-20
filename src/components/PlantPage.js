import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((r) => r.json()) 
      .then((currentPlants) => {
        setPlants(currentPlants);
      });
  }, []);

  function handleAddPlant(newPlant) {
    const updatedPlants = [...plants, newPlant];
    setPlants(updatedPlants); 
  }

  function handleDeletePlant(id) {
    const updatedPlants = plants.filter((plant) => plant.id !==id);
    setPlants(updatedPlants); 
  }

  function handleUpdatePlant(updatedPlant) {
    const updatedPlants = plants.map((plant) => {
    if (plant.id === updatedPlant.id) {
      return updatedPlants; 
    }
    else {
      return plant;
    }
   });
  setPlants(updatedPlants);
  }

return (
    <main>
      <NewPlantForm 
      onAddPlant={handleAddPlant}
      />
      <Search />
      <PlantList 
      plants={plants}
      onUpdatePlant={handleUpdatePlant}
      onDeletePlant={handleDeletePlant}
      />
    </main>
  );
}

export default PlantPage;
