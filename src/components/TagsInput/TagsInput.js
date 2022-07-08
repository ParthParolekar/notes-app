import { CloseIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Tag,
  TagLabel,
  TagRightIcon,
} from "@chakra-ui/react";
import React, { useState } from "react";

const TagsInput = ({ note, setNote, tag, setTag }) => {
  const [tagError, setTagError] = useState(false);

  const deleteTag = (tagToDelete) => {
    setNote({ ...note, tags: note.tags.filter((tag) => tag !== tagToDelete) });
  };

  const addTag = (tagToAdd) => {
    if (note.tags.includes(tagToAdd)) {
      setTagError(true);
    } else {
      setTagError(false);
      setNote({ ...note, tags: note.tags.concat(tagToAdd) });
      setTag("");
    }
  };
  return (
    <FormControl>
      <FormLabel htmlFor="tag">Tag</FormLabel>
      {tagError && (
        <Heading size="sm" color="red.500" mb="2">
          This tag already exists
        </Heading>
      )}
      {note.tags.map((tag) => (
        <span key={tag}>
          <Tag mr="1" size="sm" key={tag} variant="solid" colorScheme="blue">
            <TagLabel> {tag}</TagLabel>
            <TagRightIcon onClick={() => deleteTag(tag)} as={CloseIcon} h="3" />
          </Tag>
        </span>
      ))}
      <HStack align="center">
        <Input
          w="75%"
          type="text"
          id="tag"
          value={tag}
          onChange={(e) => {
            setTagError(false);
            setTag(e.target.value);
          }}
        />
        <Button w="25%" onClick={() => addTag(tag)}>
          Add Tag
        </Button>
      </HStack>
    </FormControl>
  );
};

export default TagsInput;
