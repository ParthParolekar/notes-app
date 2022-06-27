import React from "react";
import { CloseIcon, EditIcon } from "@chakra-ui/icons";
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Heading,
  Tag,
  TagLabel,
  TagRightIcon,
} from "@chakra-ui/react";
import { useNote } from "../../Context/NoteContext/NoteContext";

const Note = ({ note, modalOnOpen }) => {
  const {
    title,
    description,
    createdAt: { year, month, date, hour, minute },
    tags,
    color,
    label,
    isPinned,
    priority,
  } = note;
  const [noteState, noteDispatch] = useNote();
  const editNoteHandler = () => {
    noteDispatch({
      type: "NOTE_HANDLER",
      payload: { editNote: true, editNoteDetails: note },
    });
    modalOnOpen();
  };

  return (
    <Box mt="2" padding="2">
      <AccordionItem bgColor={color ? color : "transparent"}>
        <h2>
          <AccordionButton bgColor={color ? color : "transparent"}>
            <Box justifyContent="space-between" flex="1" textAlign="left">
              <Heading size="lg" mb="2">
                {" "}
                {title}
              </Heading>{" "}
              {tags.map((tag) => (
                <span key={tag}>
                  <Tag
                    mr="1"
                    size="sm"
                    key={tag}
                    variant="solid"
                    colorScheme="blue"
                  >
                    <TagLabel> {tag}</TagLabel>
                  </Tag>
                </span>
              ))}{" "}
              {date}/{month}/{year} {hour}:{minute} {priority}
            </Box>

            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>{description}</AccordionPanel>
      </AccordionItem>
      <Button
        variant="ghost"
        colorScheme="blue"
        mt="2"
        onClick={editNoteHandler}
      >
        <EditIcon />
      </Button>
    </Box>
  );
};

export default Note;
