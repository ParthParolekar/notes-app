import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { useFilter } from "../../../Context/FilterContext/FilterContext";

const SortByDate = () => {
  const [filterState, filterDispatch] = useFilter();
  const sortByDateHandler = (e) => {
    filterDispatch({ type: "SORT_BY_DATE", payload: e });
  };
  return (
    <Menu>
      <MenuButton
        m="2"
        flexGrow="1"
        as={Button}
        rightIcon={<ChevronDownIcon />}
      >
        Sort By Date
      </MenuButton>
      <MenuList>
        <RadioGroup onChange={sortByDateHandler} defaultValue="LATEST">
          <Stack direction="column">
            <MenuItem>
              <Radio value="LATEST">Latest</Radio>
            </MenuItem>
            <MenuItem>
              <Radio value="OLDEST">Oldest</Radio>
            </MenuItem>
          </Stack>
        </RadioGroup>
      </MenuList>
    </Menu>
  );
};

export default SortByDate;
