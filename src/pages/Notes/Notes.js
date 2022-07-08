import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Accordion, Container, Box, Button, useToast } from "@chakra-ui/react";
import {
  CreateNoteButton,
  Filters,
  PinnedNotes,
  UnpinnedNotes,
} from "../../components";
import { useAuth } from "../../Context/AuthContext/AuthContext";
import { useFilter } from "../../Context/FilterContext/FilterContext";
import { useUser } from "../../Context/UserContext/UserContext";

const Notes = ({ modalOnOpen, filteredNotes, setFilteredNotes }) => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState();
  const [authState] = useAuth();
  const [userState, userDispatch] = useUser();
  const [filterState, filterDispatch, applyFilters] = useFilter();
  // const [filteredNotes, setFilteredNotes] = useState();
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

  return (
    <Container maxW={["100vw", "100vw", "70vw"]} pt="10">
      <CreateNoteButton modalOnOpen={modalOnOpen} />
      <PinnedNotes notes={notes} modalOnOpen={modalOnOpen} />
      <Filters
        notes={notes}
        applyFilters={applyFilters}
        setFilteredNotes={setFilteredNotes}
      />
      <UnpinnedNotes
        notes={notes}
        filteredNotes={filteredNotes}
        modalOnOpen={modalOnOpen}
      />
    </Container>
  );
};

export default Notes;
