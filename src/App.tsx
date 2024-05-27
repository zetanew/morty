import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllLocationsThunk } from './redux/locationSlice'; // Adjust the path as needed
import { AppDispatch, RootState } from './redux/store'; // Adjust the path as needed
import './App.css';
import FilterComponent from './components/Filter';
function App() {
  const dispatch = useDispatch<AppDispatch>();
  const locations = useSelector((state: RootState) => state.locations);

  useEffect(() => {
    dispatch(fetchAllLocationsThunk());
  }, [dispatch]);

  return (
    <>
<select multiple>
  {locations.map(location => (
    <option key={location.id} value={location.id}>
      {location.name}
    </option>
  ))}
</select>

<FilterComponent/>
    </>
  );
}

export default App;