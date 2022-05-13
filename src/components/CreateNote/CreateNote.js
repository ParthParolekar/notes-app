import React, { useState } from "react";
import {
  Button,
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

const CreateNote = ({ modalIsOpen, modalOnClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);

  const [userState, userDispatch] = useUser();
  const [authState, authDispatch] = useAuth();

  console.log(userState.notes);

  const clearPreviousNote = () => {
    modalOnClose();
    setTitle("");
    setDescription("");
    setPriority("");
    setTag("");
    setTags([]);
  };

  const createNote = async () => {
    try {
      axios
        .post(
          "/api/notes",
          {
            note: {
              title,
              description,
              priority,
              tags,
              createdAt: {
                year: new Date().getFullYear(),
                month: new Date().getMonth(),
                date: new Date().getDate(),
                hour: new Date().getHours(),
                minute: new Date().getMinutes(),
                time: new Date().getTime(),
              },
              pinned: false,
            },
          },
          { headers: { authorization: authState.encodedToken } }
        )
        .then((res) =>
          userDispatch({ type: "NOTES_HANDLER", payload: res.data.notes })
        )
        .then(clearPreviousNote());
    } catch {
      (err) => console.log(err);
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
            <FormControl>
              <FormLabel htmlFor="title">Title</FormLabel>
              <Input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="description">Description</FormLabel>
              <Textarea
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Priority</FormLabel>
              <Select
                placeholder="Select priority"
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="tag">Tag</FormLabel>
              <HStack align="center">
                <Input
                  w="75%"
                  type="text"
                  id="tag"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                />
                <Button
                  w="25%"
                  onClick={(e) => {
                    setTags(tags.concat(tag));
                    setTag("");
                  }}
                >
                  Add Tag
                </Button>
              </HStack>
            </FormControl>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={createNote}>
            Create
          </Button>
          <Button variant="ghost" onClick={modalOnClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateNote;
