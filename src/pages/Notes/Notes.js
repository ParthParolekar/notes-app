import { Accordion, Container, Box, Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CreateNoteButton,
  Filters,
  PinnedNotes,
  UnpinnedNotes,
} from "../../components";
import { useAuth } from "../../Context/AuthContext/AuthContext";
import { useFilter } from "../../Context/FilterContext/FilterContext";
import { useUser } from "../../Context/UserContext/UserContext";

const Notes = ({ modalOnOpen }) => {
  const data = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [notes, setNotes] = useState();
  const [authState] = useAuth();
  const [userState, userDispatch] = useUser();
  const [filterState] = useFilter();
  const [filteredNotes, setFilteredNotes] = useState();
  useEffect(() => {
    !authState.encodedToken && navigate("/login");
  }, [authState.encodedToken]);

  useEffect(async () => {
    try {
      authState.encodedToken &&
        (await axios
          .get("/api/notes", {
            headers: { authorization: authState.encodedToken },
          })
          .then((response) => {
            setNotes(response.data.notes);
            setFilteredNotes(
              response.data.notes.filter((note) => note.isPinned === false)
            );
          }));
    } catch {
      (err) => console.log(err);
    }
  }, [userState.notes]);

  //ApplyFilters
  const applyFilters = () => {
    let unpinnedNotes =
      notes && notes.filter((note) => note.isPinned === false);
    let tempNotes = unpinnedNotes;

    if (filterState?.filterByTags.length > 0) {
      tempNotes = filterState.filterByTags.map((tag) =>
        tempNotes.filter((note) => note.tags.includes(tag))
      );
    }

    if (filterState?.filterByPriority !== "ALL") {
      tempNotes = tempNotes
        .flat()
        .filter((note) => note.priority === filterState.filterByPriority);
    }

    setFilteredNotes(
      tempNotes?.flat().filter((note) => note.isPinned === false)
    );
  };

  return (
    <Container maxW={["100vw", "100vw", "70vw"]} pt="10">
      <CreateNoteButton modalOnOpen={modalOnOpen} />
      <PinnedNotes notes={notes} modalOnOpen={modalOnOpen} />
      <Filters applyFilters={applyFilters} />
      <UnpinnedNotes
        notes={notes}
        filteredNotes={filteredNotes}
        modalOnOpen={modalOnOpen}
      />
    </Container>
  );
};

export default Notes;
