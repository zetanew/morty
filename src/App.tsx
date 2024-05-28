import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllLocationsThunk } from "./redux/locationSlice"; // Adjust the path as needed
import { AppDispatch, RootState } from "./redux/store"; // Adjust the path as needed

import FilterComponent from "./components/Filter";

import Card from './components/Card';
function App() {
  const dispatch = useDispatch<AppDispatch>();

  const characters = useSelector((state: RootState) => state.chars.characters);
  useEffect(() => {
    dispatch(fetchAllLocationsThunk());
  }, [dispatch]);

  return (
    <>
       <FilterComponent />
       <div className="flex flex-wrap justify-center">
      {characters.map((character) => (
        <Card
          key={character.id}
          name={character.name}
          status={character.status}
          image={character.image}
        />
      ))}
    </div>
    </>
  );
}

export default App;
