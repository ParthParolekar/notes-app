import { Accordion } from "@chakra-ui/react";
import { Note } from "../index";
import React from "react";

const PinnedNotes = ({ notes, modalOnOpen }) => {
  const pinnedNotes = notes && notes.filter((note) => note.isPinned === true);
  return (
    <div>
      PinnedNotes
      <Accordion allowMultiple>
        {pinnedNotes &&
          pinnedNotes.map((note) => (
            <Note note={note} key={note._id} modalOnOpen={modalOnOpen} />
          ))}
      </Accordion>
    </div>
  );
};

export default PinnedNotes;
