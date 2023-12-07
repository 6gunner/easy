import React from "react";
import { Select } from "@dev-easy/comps";

import { SelectProps } from "@dev-easy/comps";

import "@dev-easy/comps/src/select/index.scss";
const options = [
  {
    name: "1",
    value: 1,
  },
  {
    name: "2",
    value: 2,
  },
  {
    name: "3",
    value: 3,
  },
];
function SelectPage() {
  const [value, setValue] = React.useState(1);

  const handleValueChange = (selectedValue) => {
    console.log("onChange", selectedValue);
    setValue(selectedValue);
  };
  return (
    <Select
      options={options}
      placeholder="Select a receiver chain"
      value={value}
      onChange={handleValueChange}
    ></Select>
  );
}

export default SelectPage;
