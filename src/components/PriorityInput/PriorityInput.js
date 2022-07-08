import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import React from "react";

const PriorityInput = ({ note, setNote }) => {
  return (
    <FormControl>
      <FormLabel>Priority</FormLabel>
      <Select
        value={note.priority}
        onChange={(e) => setNote({ ...note, priority: e.target.value })}
      >
        <option value="LOW">LOW</option>
        <option value="MEDIUM">MEDIUM</option>
        <option value="HIGH">HIGH</option>
      </Select>
    </FormControl>
  );
};

export default PriorityInput;
