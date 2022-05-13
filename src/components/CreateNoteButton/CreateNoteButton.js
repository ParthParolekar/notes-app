import { Button } from "@chakra-ui/react";
import React from "react";

const CreateNoteButton = ({ modalOnOpen }) => {
  return (
    <Button
      variant="solid"
      w="100%"
      colorScheme="blue"
      mt="100"
      onClick={modalOnOpen}
    >
      Create Note
    </Button>
  );
};

export default CreateNoteButton;
