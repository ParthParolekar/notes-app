import { Button, Container, Flex, Grid } from "@chakra-ui/react";
import React from "react";

import { TagFilter, PriorityFilter } from "./index";

const Filters = ({ applyFilters }) => {
  return (
    <Container maxW="100%" h="10vh">
      <Button
        variant="solid"
        w="100%"
        colorScheme="blue"
        mt="10"
        onClick={applyFilters}
      >
        Apply
      </Button>
      <Flex direction={["column", "row"]}>
        <TagFilter />
        <PriorityFilter />
      </Flex>
    </Container>
  );
};

export default Filters;
