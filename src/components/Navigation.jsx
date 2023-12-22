import React from "react";
import { Link } from "react-router-dom";
import { Button, Center, Flex, Heading } from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <>
      <Flex pt={4} pl={4}>
        <Link to={`/new`}>
          <Button
            w="120px"
            fontWeight={"bold"}
            fontSize={"lg"}
            borderRadius={"md"}
            backgroundColor={"blue.200"}
            _hover={{ backgroundColor: "blue.500" }}
            textTransform={"uppercase"}
          >
            Add Event
          </Button>
        </Link>
        <Link to={`/`}>
          <Button
            w="120px"
            ml={5}
            fontWeight={"bold"}
            fontSize={"lg"}
            borderRadius={"md"}
            backgroundColor={"blue.200"}
            _hover={{ backgroundColor: "blue.500" }}
            textTransform={"uppercase"}
          >
            Home
          </Button>
        </Link>
      </Flex>
      <Center>
        <Heading fontWeight={"semibold"} fontSize={"5xl"} mb={3} mt={3}>
          Winc Event Engine
        </Heading>
      </Center>
    </>
  );

  //return <div></div>;
  // <nav>
  //   <ul>
  //     <li>
  //       <Link to="/">Events</Link>
  //     </li>
  //     <li>
  //       <Link to="/event/1">Event</Link>
  //     </li>
  //   </ul>
  // </nav>
};
