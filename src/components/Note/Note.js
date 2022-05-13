import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Heading,
  Tag,
} from "@chakra-ui/react";
import React from "react";

const Note = ({
  note: {
    title,
    description,
    createdAt: { year, month, date, hour, minute },
    tags,
  },
}) => {
  minute.length === 0 ? (minute = `0${minute}`) : (minute = minute);
  return (
    <Box padding="2">
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box justifyContent="space-between" flex="1" textAlign="left">
              <Heading size="lg"> {title}</Heading>{" "}
              {tags.map((tag) => (
                <span>
                  <Tag
                    mr="1"
                    size="sm"
                    key={tag}
                    variant="solid"
                    colorScheme="blue"
                  >
                    {tag}
                  </Tag>
                </span>
              ))}{" "}
              {date}/{month}/{year} {hour}:{minute}
            </Box>

            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>{description}</AccordionPanel>
      </AccordionItem>
      {/* <Button variant="outline" colorScheme="blue">
        Button
      </Button> */}
    </Box>
  );
};

export default Note;
