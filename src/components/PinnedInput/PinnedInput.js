import { Checkbox, FormControl, FormLabel } from "@chakra-ui/react";
import React from "react";

const PinnedInput = ({ note, setNote }) => {
  return (
    <FormControl>
      <FormLabel>Pin Note</FormLabel>
      <input
        type="checkbox"
        checked={note.isPinned}
        onChange={(e) => setNote({ ...note, isPinned: e.target.checked })}
      />
    </FormControl>
  );
};

export default PinnedInput;
