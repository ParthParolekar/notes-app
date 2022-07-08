import { Button, Container, Flex, Grid } from "@chakra-ui/react";
import React from "react";

import { TagFilter, PriorityFilter, SortByDate } from "./index";

const Filters = ({ applyFilters, notes, setFilteredNotes }) => {
  return (
    <Container maxW="100%" h="10vh">
      <Button
        variant="solid"
        w="100%"
        colorScheme="blue"
        mt="10"
        onClick={() => setFilteredNotes(applyFilters(notes))}
      >
        Apply
      </Button>
      <Flex direction={["column", "row"]}>
        <TagFilter />
        <PriorityFilter />
        <SortByDate />
      </Flex>
    </Container>
  );
};

export default Filters;
