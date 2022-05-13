import React from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
} from "@chakra-ui/react";
import { Link, NavLink } from "react-router-dom";
import CreateNoteButton from "../CreateNoteButton/CreateNoteButton";

const Sidebar = ({ isOpen, onClose, modalOnOpen }) => {
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Notes App</DrawerHeader>

        <DrawerBody>
          <NavLink to="/notes">
            <Button
              variant="ghost"
              colorScheme="blue"
              w="100%"
              onClick={onClose}
            >
              Notes
            </Button>
          </NavLink>
          <NavLink to="/labels">
            <Button
              variant="ghost"
              mt="2"
              colorScheme="blue"
              w="100%"
              onClick={onClose}
            >
              Labels
            </Button>
          </NavLink>
          <NavLink to="/archive">
            <Button
              variant="ghost"
              mt="2"
              colorScheme="blue"
              w="100%"
              onClick={onClose}
            >
              Archive
            </Button>
          </NavLink>
          <CreateNoteButton modalOnOpen={modalOnOpen} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default Sidebar;
