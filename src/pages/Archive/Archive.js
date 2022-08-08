import React from "react";
import { Accordion, Container, Heading } from "@chakra-ui/react";
import { useUser } from "../../Context/UserContext/UserContext";
import { Note } from "../../components";

const Archive = ({ modalOnOpen }) => {
  const [userState] = useUser();
  return (
    <Container maxW={["100vw", "100vw", "70vw"]} pt="10">
      <Heading mt="8">ARCHIVE</Heading>
      <Accordion allowMultiple>
        {userState.archive?.map((note) => (
          <Note note={note} key={note._id} modalOnOpen={modalOnOpen} />
        ))}
      </Accordion>
    </Container>
  );
};

export default Archive;
