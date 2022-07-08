import { FormControl, FormLabel, Textarea } from "@chakra-ui/react";
import React from "react";

const DescriptionInput = ({ note, setNote }) => {
  return (
    <FormControl>
      <FormLabel htmlFor="description">Description</FormLabel>
      <Textarea
        type="text"
        id="description"
        value={note.description}
        onChange={(e) => setNote({ ...note, description: e.target.value })}
      />
    </FormControl>
  );
};

export default DescriptionInput;
