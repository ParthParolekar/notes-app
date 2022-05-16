import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import React from "react";

const ColorInput = ({ note, setNote }) => {
  return (
    <FormControl>
      <FormLabel>Color</FormLabel>
      <Select
        value={note.color.length > 0 && note.color}
        placeholder="Select color"
        onChange={(e) => setNote({ ...note, color: e.target.value })}
      >
        <option value="red.500">RED</option>
        <option value="green.500">GREEN</option>
        <option value="blue.500">BLUE</option>
        <option value="yellow.500">YELLOW</option>
        <option value="pink.500">PINK</option>
        <option value="orange.500">ORANGE</option>
      </Select>
    </FormControl>
  );
};

export default ColorInput;
