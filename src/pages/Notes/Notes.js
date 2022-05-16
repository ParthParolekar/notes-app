import { Accordion, Container, Box, Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateNoteButton, Note } from "../../components";
import { useAuth } from "../../Context/AuthContext/AuthContext";
import { useUser } from "../../Context/UserContext/UserContext";

const Notes = ({ modalOnOpen }) => {
  const data = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [notes, setNotes] = useState();
  const [authState] = useAuth();
  const [userState, userDispatch] = useUser();
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
          .then((response) => setNotes(response.data.notes)));
    } catch {
      (err) => console.log(err);
    }
  }, [userState.notes]);

  return (
    <Container maxW={["100vw", "100vw", "70vw"]} pt="10">
      <CreateNoteButton modalOnOpen={modalOnOpen} />

      <Accordion allowMultiple>
        {notes &&
          notes.map((note) => (
            <Note note={note} key={note._id} modalOnOpen={modalOnOpen} />
          ))}
      </Accordion>
    </Container>
  );
};

export default Notes;
