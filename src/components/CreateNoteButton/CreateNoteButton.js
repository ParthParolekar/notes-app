import { Button } from "@chakra-ui/react";
import React from "react";
import { useNote } from "../../Context/NoteContext/NoteContext";

const CreateNoteButton = ({ modalOnOpen }) => {
  const [noteState, noteDispatch] = useNote();
  const openCreateNoteModal = () => {
    noteDispatch({
      type: "NOTE_HANDLER",
      payload: { editNote: false, editNoteDetails: null },
    });
    modalOnOpen();
  };
  return (
    <Button
      variant="solid"
      w="100%"
      colorScheme="blue"
      mt="10"
      onClick={openCreateNoteModal}
    >
      Create Note
    </Button>
  );
};

export default CreateNoteButton;
