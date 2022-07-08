import { Accordion, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Note } from "../index";
import { useFilter } from "../../Context/FilterContext/FilterContext";
import { useUser } from "../../Context/UserContext/UserContext";

const UnpinnedNotes = ({ notes, modalOnOpen, filteredNotes }) => {
  return (
    <>
      <Heading mt="16">Unpinned Notes</Heading>
      <Accordion allowMultiple>
        {filteredNotes?.map((note) => (
          <Note note={note} key={note._id} modalOnOpen={modalOnOpen} />
        ))}
      </Accordion>
    </>
  );
};

export default UnpinnedNotes;
