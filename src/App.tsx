import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllLocationsThunk } from "./redux/locationSlice"; 
import { AppDispatch, RootState } from "./redux/store"; 
import { useState } from "react";
import FilterComponent from "./components/Filter";
import SearchBar from "./components/SearchBar";
import Card from './components/Card';


function App() {
  const dispatch = useDispatch<AppDispatch>();
  const [searchTerm, setSearchTerm] = useState("");
  const characters = useSelector((state: RootState) => state.chars.characters);
  useEffect(() => {
    dispatch(fetchAllLocationsThunk());
  }, [dispatch]);

  return (
    <>
<div className="md:flex md:items-start md:justify-center m-5">
  <FilterComponent />
  <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
</div>
<br />
<div className="flex flex-wrap justify-center">
  {characters
    .filter((character) => character.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .map((character) => (
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
