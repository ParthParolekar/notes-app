import React from "react";
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
import { useFilter } from "../../../Context/FilterContext/FilterContext";

const PriorityFilter = () => {
  const [filterState, filterDispatch] = useFilter();
  const priorityFilterHandler = (e) => {
    filterDispatch({ type: "FILTER_BY_PRIORITY", payload: e });
  };

  return (
    <Menu>
      <MenuButton
        m="2"
        flexGrow="1"
        as={Button}
        rightIcon={<ChevronDownIcon />}
      >
        Filter By Priority
      </MenuButton>
      <MenuList>
        <RadioGroup onChange={priorityFilterHandler} defaultValue="ALL">
          <Stack direction="column">
            <MenuItem>
              <Radio value="ALL">All</Radio>
            </MenuItem>
            <MenuItem>
              <Radio value="LOW">Low</Radio>
            </MenuItem>
            <MenuItem>
              <Radio value="MEDIUM">Medium</Radio>
            </MenuItem>
            <MenuItem>
              <Radio value="HIGH">High</Radio>
            </MenuItem>
          </Stack>
        </RadioGroup>
      </MenuList>
    </Menu>
  );
};

export default PriorityFilter;
