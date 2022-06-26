import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useFilter } from "../../../Context/FilterContext/FilterContext";
import { useUser } from "../../../Context/UserContext/UserContext";

const TagFilter = () => {
  const [userState] = useUser();
  const [filterState, filterDispatch] = useFilter();
  const [tags, setTags] = useState([]);

  useEffect(() => {
    setTags(
      userState.notes &&
        userState.notes.reduce((prev, curr) => {
          curr.tags.map((tag) => {
            if (!prev.includes(tag)) {
              prev.push(tag);
            }
            return prev;
          });
          return prev;
        }, [])
    );
  }, [userState.notes]);

  const tagsChangeHandler = (e) => {
    if (e.target.checked) {
      filterDispatch({
        type: "FILTER_BY_TAGS",
        payload: filterState.filterByTags.concat(e.target.value),
      });
    } else {
      filterDispatch({
        type: "FILTER_BY_TAGS",
        payload: filterState.filterByTags.filter(
          (tag) => tag !== e.target.value
        ),
      });
    }
  };

  return (
    <Menu>
      <MenuButton
        m="2"
        flexGrow="1"
        as={Button}
        rightIcon={<ChevronDownIcon />}
      >
        Filter By Tags
      </MenuButton>
      <MenuList>
        {tags.map((tag) => (
          <MenuItem key={tag}>
            <h1>
              <input
                type="checkbox"
                value={tag}
                onChange={tagsChangeHandler}
                checked={
                  filterState.filterByTags &&
                  filterState.filterByTags.includes(tag)
                }
              />{" "}
              {tag}
            </h1>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default TagFilter;
