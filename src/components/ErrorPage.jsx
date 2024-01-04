import { Box, Center, Flex, Text, Heading } from "@chakra-ui/react";
import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

export const ErrorPage = () => {
  let error = useRouteError();
  console.log(
    "-------------------------- ErrorPage ------------------------------"
  );
  console.log(error);
  return (
    <>
      <Box h={500} backgroundColor={"blue.400"}>
        <Center>
          <Flex direction={"column"}>
            <Heading mt={20}>A serious error has occured !</Heading>
            <Text mt={8} fontWeight={"bold"} fontStyle={"oblique"}>
              {error.status}
            </Text>
            <Text mt={8} fontWeight={"bold"} fontStyle={"oblique"}>
              {error.message}
            </Text>
            <Text mt={8} fontWeight={"bold"} fontStyle={"oblique"}>
              {error.data}
            </Text>
            <Text mt={4}>Contact your helpdesk and report the above error</Text>
            <Link to={"/"}>
              <Flex direction={"row"}>
                <Text mt={10} mr={1} fontSize={"lg"}>
                  Click
                </Text>
                <Text
                  mt={10}
                  mr={1}
                  textColor={"black"}
                  fontStyle={"italic"}
                  fontWeight={"semibold"}
                  fontSize={"lg"}
                >
                  here
                </Text>
                <Text mt={10} fontSize={"lg"}>
                  to return to the homepage
                </Text>
              </Flex>
            </Link>
          </Flex>
        </Center>
      </Box>
    </>
  );
};
