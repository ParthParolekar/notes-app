import { MoonIcon, SunIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Button,
  Container,
  Flex,
  Heading,
  Spacer,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { useAuth } from "../../Context/AuthContext/AuthContext";

const Navbar = ({ headingColorValue, onOpen }) => {
  const [authState, authDispatch] = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();

  const logoutHandler = () => {
    authDispatch({
      type: "HANDLE_USER_AUTH",
      payload: {
        foundUser: {
          _id: null,
          firstName: null,
          lastName: null,
          email: null,
        },
        encodedToken: null,
      },
    });
    localStorage.removeItem("savedData");
  };

  return (
    <Container maxW={["90vw", "80vw", "50vw"]} padding="2">
      <Flex align="center">
        <Button variant="ghost" mr="2" onClick={onOpen}>
          {authState.encodedToken && <HamburgerIcon w={6} h={6} />}
        </Button>
        <Heading size="lg" color={headingColorValue}>
          Notes App
        </Heading>
        <Spacer />
        <Button variant="ghost" onClick={toggleColorMode}>
          {colorMode === "light" ? (
            <MoonIcon w={6} h={6} />
          ) : (
            <SunIcon w={6} h={6} />
          )}
        </Button>
        {authState.encodedToken && (
          <Button variant="outline" onClick={logoutHandler}>
            Logout
          </Button>
        )}
      </Flex>
    </Container>
  );
};

export default Navbar;
