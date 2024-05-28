import React, { useState , useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStatusFilter, setLocationFilter } from "../redux/filterSlice"; // Adjust the path as needed
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { AppDispatch, RootState } from "../redux/store";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import { fetchCharacters } from "../redux/charSlice";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function FilterComponent() {
  const dispatch = useDispatch<AppDispatch>();
  const [locationName, setLocationName] = useState<string[]>([]);
  const [status, setStatus] = useState("");

  // Get locations from Redux state
  const locations = useSelector((state: RootState) => state.locations);

  useEffect(() => {
    if (locations.length > 0) {
      const defaultLocationName = locations[0].name;
      setLocationName([defaultLocationName]);
      dispatch(setLocationFilter([defaultLocationName]));

      // Fetch characters based on default filters
      dispatch(fetchCharacters());
    }
  }, [locations, dispatch]);

  const handleLocationChange = (
    event: SelectChangeEvent<typeof locationName>
  ) => {
    const {
      target: { value },
    } = event;
    setLocationName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    dispatch(
      setLocationFilter(typeof value === "string" ? value.split(",") : value)
    );
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus((event.target as HTMLInputElement).value);
    dispatch(setStatusFilter((event.target as HTMLInputElement).value));
  };

  return (
    <div className="p-4 space-y-2 rounded-md flex flex-col md:flex-row justify-start md:space-y-0">
      <div className="filter-container">
        <FormControl sx={{ m: 1, width: 300, color: 'white' }} className="w-full">
          <InputLabel id="demo-multiple-checkbox-label" sx={{ color: 'white'  }}>Location</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={locationName}
            onChange={handleLocationChange}
            input={<OutlinedInput label="Tag" sx={{ color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white', borderWidth: 2 } }} />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
            sx={{ color: 'white' }}
          >
            {locations.map((location) => (
              <MenuItem key={location.id} value={location.name} sx={{ color: 'black' }}>
                <Checkbox checked={locationName.indexOf(location.name) > -1} sx={{ color: locationName.indexOf(location.name) > -1 ? 'green' : 'black' }} />
                <ListItemText primary={location.name} sx={{ color: 'black' }} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="radio-container">
        <FormControl component="fieldset" className="w-full">
          <FormLabel component="legend" sx={{ color: 'white' }}>Status</FormLabel>
          <RadioGroup
            row
            aria-label="status"
            name="row-radio-buttons-group"
            value={status}
            onChange={handleStatusChange}
          >
            <FormControlLabel value="" control={<Radio sx={{ color: 'white' }} />} label="Any" sx={{ color: 'white' }} />
            <FormControlLabel value="alive" control={<Radio sx={{ color: 'white' }} />} label="Alive" sx={{ color: 'white' }} />
            <FormControlLabel value="dead" control={<Radio sx={{ color: 'white' }} />} label="Dead" sx={{ color: 'white' }} />
            <FormControlLabel
              value="unknown"
              control={<Radio sx={{ color: 'white' }} />}
              label="Unknown"
              sx={{ color: 'white' }}
            />
          </RadioGroup>
        </FormControl>
      </div>

      <div className="button-container p-4">
        <Button
          variant="contained"
          color="success"
          onClick={() => dispatch(fetchCharacters())}
          className=" py-2 text-white bg-blue-500 hover:bg-blue-600 md:self-start"
        >
          Filter
        </Button>
      </div>
    </div>
  );
}