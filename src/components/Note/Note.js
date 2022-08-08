import React from "react";
import axios from "axios";
import {
  CloseIcon,
  EditIcon,
  DeleteIcon,
  ViewIcon,
  ViewOffIcon,
} from "@chakra-ui/icons";
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
import { useUser } from "../../Context/UserContext/UserContext";
import { useAuth } from "../../Context/AuthContext/AuthContext";

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
  const [userState, userDispatch] = useUser();
  const [authState, authDispatch] = useAuth();
  const editNoteHandler = () => {
    noteDispatch({
      type: "NOTE_HANDLER",
      payload: { editNote: true, editNoteDetails: note },
    });
    modalOnOpen();
  };

  const archiveNoteHandler = () => {
    if (!userState.archive.includes(note)) {
      axios
        .post(
          `/api/notes/archives/${note._id}`,
          { note },
          {
            headers: { authorization: authState.encodedToken },
          }
        )
        .then((res) =>
          userDispatch({
            type: "ARCHIVE_HANDLER",
            payload: { notes: res.data.notes, archive: res.data.archives },
          })
        );
    } else {
      axios
        .post(
          `/api/archives/restore/${note._id}`,
          {},
          {
            headers: { authorization: authState.encodedToken },
          }
        )
        .then((res) =>
          userDispatch({
            type: "ARCHIVE_HANDLER",
            payload: { notes: res.data.notes, archive: res.data.archives },
          })
        );
    }
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
      <Button
        variant="ghost"
        colorScheme="blue"
        mt="2"
        onClick={archiveNoteHandler}
      >
        {!userState.archive.includes(note) ? <ViewOffIcon /> : <ViewIcon />}
      </Button>
    </Box>
  );
};

export default Note;
