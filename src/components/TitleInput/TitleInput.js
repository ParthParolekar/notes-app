import { FormControl, FormLabel, Heading, Input } from "@chakra-ui/react";
import React, { useState } from "react";

const TitleInput = ({ note, setNote, titleEmptyError, setTitleEmptyError }) => {
  return (
    <FormControl>
      <FormLabel htmlFor="title">Title</FormLabel>
      {titleEmptyError && (
        <Heading size="sm" color="red.500" mb="2">
          The title cannot be empty
        </Heading>
      )}
      <Input
        type="text"
        id="title"
        value={note.title}
        onChange={(e) => {
          setNote({ ...note, title: e.target.value });
          setTitleEmptyError(false);
        }}
      />
    </FormControl>
  );
};

export default TitleInput;
