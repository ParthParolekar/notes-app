import {
  Button,
  Center,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext/AuthContext";

const SignupForm = ({ headingColorValue }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [authState, authDispatch] = useAuth();

  const signUpHandler = (e) => {
    e.preventDefault();
    axios
      .post("api/auth/signup", { email, password, firstName, lastName })
      .then((res) => {
        console.log(res);
        axios
          .post("/api/auth/login", { email, password })
          .then((response) => {
            console.log(response);
            authDispatch({
              type: "HANDLE_USER_AUTH",
              payload: {
                foundUser: response.data.foundUser,
                encodedToken: response.data.encodedToken,
              },
            });
            rememberMe &&
              localStorage.setItem("savedData", JSON.stringify(response.data));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  return (
    <Container height="60vh" maxW={["90vw", "70vw", "50vw"]} my="auto" mt="8">
      <VStack border="1px" borderColor="gray.500" borderRadius="10" padding="5">
        <Heading mb="10" color={headingColorValue}>
          Sign Up
        </Heading>
        <Container w="70%">
          <form onSubmit={signUpHandler}>
            <FormControl>
              <FormLabel htmlFor="first-name">First Name</FormLabel>
              <Input
                id="first-name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="last-name">Last Name</FormLabel>
              <Input
                id="last-name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="passowrd">Password</FormLabel>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <Checkbox onChange={(e) => setRememberMe(e.target.checked)}>
              Remember Me
            </Checkbox>
            <Button
              type="submit"
              variant="solid"
              colorScheme="blue"
              w="100%"
              mt="10"
            >
              Login
            </Button>
            <Link to="/login">
              <Button variant="link" colorScheme="blue" w="100%" mt="2">
                Already have an account? Login
              </Button>
            </Link>
          </form>
        </Container>
      </VStack>
    </Container>
  );
};

export default SignupForm;
