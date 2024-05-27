import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllLocationsThunk } from './redux/locationSlice'; // Adjust the path as needed
import { AppDispatch, RootState } from './redux/store'; // Adjust the path as needed
import './App.css';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const locations = useSelector((state: RootState) => state.locations);

  useEffect(() => {
    dispatch(fetchAllLocationsThunk());
  }, [dispatch]);

  return (
    <>
      <h1 className="text-3xl font-bold underline">Locations</h1>
      <ul>
        {locations.map(location => (
          <li key={location.id}>{location.name}</li>
        ))}
      </ul>
    </>
  );
}

export default App;