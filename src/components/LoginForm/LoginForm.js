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

const LoginForm = ({ headingColorValue }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [authState, authDispatch] = useAuth();

  const loginHandler = (e) => {
    e.preventDefault();
    axios
      .post("/api/auth/login", { email, password })
      .then((res) => {
        authDispatch({
          type: "HANDLE_USER_AUTH",
          payload: {
            foundUser: res.data.foundUser,
            encodedToken: res.data.encodedToken,
          },
        });
        rememberMe &&
          localStorage.setItem("savedData", JSON.stringify(res.data));
      })
      .catch((err) => console.log(err));
  };

  const testCredHandler = () => {
    setEmail("adarshbalika@gmail.com");
    setPassword("adarshBalika123");
  };
  return (
    <Container height="60vh" maxW="50vw" my="auto" mt="16">
      <VStack
        border="1px"
        borderColor="gray.500"
        borderRadius="10"
        padding="10"
      >
        <Heading mb="10" color={headingColorValue}>
          Login
        </Heading>
        <Container w="70%">
          <form onSubmit={loginHandler}>
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
              <FormLabel htmlFor="password">Password</FormLabel>
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
              mb="3"
            >
              Login
            </Button>
            <Button
              variant="outline"
              colorScheme="blue"
              w="100%"
              onClick={testCredHandler}
            >
              Test Credentials
            </Button>
            <Link to="/signup">
              <Button variant="link" colorScheme="blue" w="100%" mt="2">
                Do not have an account? Signup
              </Button>
            </Link>
          </form>
        </Container>
      </VStack>
    </Container>
  );
};

export default LoginForm;
