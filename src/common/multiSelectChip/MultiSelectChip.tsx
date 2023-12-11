import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { MultiSelectChipOption, MultiSelectChipProps } from "./types";

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

export default function MultipleSelectCheckmarks({
  options,
  placeholder = "Select",
  selected,
  setSelected,
}: MultiSelectChipProps) {
  const handleChange = (event: SelectChangeEvent<typeof options>) => {
    const {
      target: { value },
    } = event;
    const seen = new Set();
    for (const item of value) {
      const key = (item as MultiSelectChipOption).key;
      if (seen.has(key)) {
        return setSelected?.(
          (value as MultiSelectChipOption[]).filter(
            (option) => option.key !== key
          )
        );
      }
      seen.add(key);
    }
    return setSelected?.([...(value as MultiSelectChipOption[])]);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: "100%" }}>
        <InputLabel id="demo-multiple-checkbox-label" sx={{ fontSize: 18 }}>
          {placeholder}
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selected}
          onChange={handleChange}
          input={
            <OutlinedInput
              id="select-multiple-chip"
              label={placeholder}
              sx={{ fontSize: 18 }}
            />
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map(({ color, key, value }) => (
                <Chip
                  key={key}
                  label={value}
                  sx={{ bgcolor: color, color: "#FFF", fontWeight: "bold" }}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {options.map((option: any) => (
            <MenuItem key={option.key} value={option}>
              <Checkbox
                checked={!!selected.find((item) => item.key === option.key)}
              />
              <ListItemText primary={option.value} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
