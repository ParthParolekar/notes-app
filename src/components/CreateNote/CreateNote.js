import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { useUser } from "../../Context/UserContext/UserContext";
import { useAuth } from "../../Context/AuthContext/AuthContext";
import { useNote } from "../../Context/NoteContext/NoteContext";
import {
  TitleInput,
  DescriptionInput,
  PriorityInput,
  TagsInput,
  ColorInput,
  PinnedInput,
} from "../index";
import { useFilter } from "../../Context/FilterContext/FilterContext";

const CreateNote = ({ modalIsOpen, modalOnClose, setFilteredNotes }) => {
  const [note, setNote] = useState({
    title: "",
    description: "",
    priority: "LOW",
    tags: [],
    color: "",
    isPinned: false,
  });
  const [tag, setTag] = useState("");
  const [titleEmptyError, setTitleEmptyError] = useState(false);
  const [notes, setNotes] = useState();

  const [userState, userDispatch] = useUser();
  const [authState, authDispatch] = useAuth();
  const [noteState, noteDispatch] = useNote();
  const [filterState, filterDispatch, applyFilters] = useFilter();

  useEffect(async () => {
    try {
      authState.encodedToken &&
        (await axios
          .get("/api/notes", {
            headers: { authorization: authState.encodedToken },
          })
          .then((response) => {
            setNotes(response.data.notes);
          }));
    } catch {
      (err) => console.log(err);
    }
  }, [userState.notes]);

  useEffect(() => {
    if (noteState.editNote === true) {
      setNote(noteState.editNoteDetails);
    } else {
      setNote({
        ...note,
        title: "",
        description: "",
        priority: "LOW",
        tags: [],
        color: "",
        isPinned: false,
      });
    }
  }, [noteState]);

  const clearPreviousNote = () => {
    modalOnClose();
    setNote({
      ...note,
      title: "",
      description: "",
      priority: "LOW",
      tags: [],
      color: "",
      isPinned: false,
    });

    setTag("");
  };

  const editNote = () => {
    if (note.title.length === 0) {
      setTitleEmptyError(true);
    } else {
      try {
        axios
          .post(
            `/api/notes/${noteState.editNoteDetails._id}`,
            {
              note,
            },
            { headers: { authorization: authState.encodedToken } }
          )
          .then((res) =>
            userDispatch({ type: "NOTES_HANDLER", payload: res.data.notes })
          )
          .then(
            noteDispatch({
              type: "NOTE_HANDLER",
              payload: { editNote: false, editNoteDetails: null },
            })
          )
          .then(clearPreviousNote())
          .then(setFilteredNotes(applyFilters(notes)));
      } catch {
        (err) => console.log(err);
      }
    }
  };

  const createNote = async () => {
    if (note.title.length === 0) {
      setTitleEmptyError(true);
    } else {
      try {
        axios
          .post(
            "/api/notes",
            {
              note: {
                ...note,
                createdAt: {
                  year: new Date().getFullYear(),
                  month: new Date().getMonth(),
                  date: new Date().getDate(),
                  hour: new Date().getHours(),
                  minute: new Date().getMinutes(),
                  time: new Date().getTime(),
                },
              },
            },
            { headers: { authorization: authState.encodedToken } }
          )
          .then((res) =>
            userDispatch({ type: "NOTES_HANDLER", payload: res.data.notes })
          )
          .then(clearPreviousNote())
          .then(setFilteredNotes(applyFilters(notes)));
      } catch {
        (err) => console.log(err);
      }
    }
  };
  return (
    <Modal isOpen={modalIsOpen} onClose={modalOnClose} maxH="70vh">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Note</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form>
            <TitleInput
              note={note}
              setNote={setNote}
              titleEmptyError={titleEmptyError}
              setTitleEmptyError={setTitleEmptyError}
            />
            <DescriptionInput note={note} setNote={setNote} />
            <PriorityInput note={note} setNote={setNote} />
            <TagsInput
              note={note}
              setNote={setNote}
              tag={tag}
              setTag={setTag}
            />
            <ColorInput note={note} setNote={setNote} />
            <PinnedInput note={note} setNote={setNote} />
          </form>
        </ModalBody>

        <ModalFooter>
          {noteState.editNote ? (
            <Button colorScheme="blue" mr={3} onClick={editNote}>
              Edit
            </Button>
          ) : (
            <Button colorScheme="blue" mr={3} onClick={createNote}>
              Create
            </Button>
          )}
          <Button variant="ghost" onClick={modalOnClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateNote;
