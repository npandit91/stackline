import { Dispatch } from "@reduxjs/toolkit";
import { SetStateAction } from "react";

type MultiSelectChipOption = {
  color: string;
  key: string;
  value: string;
};
type MultiSelectChipProps = {
  options: MultiSelectChipOption[];
  placeholder?: string;
  selected: MultiSelectChipOption[];
  setSelected?: (selected: MultiSelectChipOption[]) => any;
};

export { MultiSelectChipProps, MultiSelectChipOption };
