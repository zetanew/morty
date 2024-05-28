import React, { useState } from "react";
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
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Location</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={locationName}
          onChange={handleLocationChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {locations.map((location) => (
            <MenuItem key={location.id} value={location.name}>
              <Checkbox checked={locationName.indexOf(location.name) > -1} />
              <ListItemText primary={location.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      ///////
      <FormControl component="fieldset">
        <FormLabel component="legend">Status</FormLabel>
        <RadioGroup
          row
          aria-label="status"
          name="row-radio-buttons-group"
          value={status}
          onChange={handleStatusChange}
        >
          <FormControlLabel value="" control={<Radio />} label="Any" />
          <FormControlLabel value="alive" control={<Radio />} label="Alive" />
          <FormControlLabel value="dead" control={<Radio />} label="Dead" />
          <FormControlLabel
            value="unknown"
            control={<Radio />}
            label="Unknown"
          />
        </RadioGroup>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        onClick={() => dispatch(fetchCharacters())}
      >
        Fetch Characters
      </Button>
    </div>
  );
}
