import { Accordion } from "@chakra-ui/react";
import { Note } from "../index";
import React from "react";

const UnpinnedNotes = ({ notes, modalOnOpen }) => {
  const unpinnedNotes =
    notes && notes.filter((note) => note.isPinned === false);

  return (
    <div>
      UnpinnedNotes
      <Accordion allowMultiple>
        {unpinnedNotes &&
          unpinnedNotes.map((note) => (
            <Note note={note} key={note._id} modalOnOpen={modalOnOpen} />
          ))}
      </Accordion>
    </div>
  );
};

export default UnpinnedNotes;
