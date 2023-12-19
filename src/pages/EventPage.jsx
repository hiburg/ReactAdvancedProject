import React from "react";
import {
  Box,
  Center,
  Heading,
  Tooltip,
  Button,
  Image,
  SimpleGrid,
  Text,
  Flex,
} from "@chakra-ui/react";
import { useLoaderData, Link, redirect, useNavigate } from "react-router-dom";
import { EditEvent } from "../components/EditEvent";
import { useState } from "react";
import { DeleteEvent } from "../components/DeleteEvent";

export const loader = async ({ params }) => {
  //const navigate = useNavigate();

  try {
    const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
    const categories = await fetch("http://localhost:3000/categories");
    const users = await fetch("http://localhost:3000/users");
    return {
      event: await event.json(),
      categories: await categories.json(),
      users: await users.json(),
    };
  } catch (error) {
    console.log("Error:", error);
    //if (!event.ok) {
    //window.alert(error);
    //navigate("/");
  }
};

export const EventPage = () => {
  const { event, categories, users } = useLoaderData();
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [alertDeleteOpen, setAlertDeleteOpen] = useState(false);
  //const [isDelete, setIsDelete] = useState(false);

  return (
    <>
      <Center>
        <Box
          width={["100%", "80%", "60%"]}
          height={["100%", "80%", "60%"]}
          bg={"blue.100"}
          borderRadius={"xl"}
        >
          <Link to={`/`}>
            <Tooltip label="Back to overview of all events">
              <Button
                // onClick={() => clickFn()}
                fontWeight={"bold"}
                fontStyle={"italic"}
                textColor={"gray.500"}
                size={["xs", "sm", "md"]}
              >
                {"<< Back to overview"}
              </Button>
            </Tooltip>
          </Link>

          <Center>
            <Heading fontSize={"2xl"} fontWeight={"bold"} pb={6} pt={6}>
              {event.title}
            </Heading>
          </Center>
          <Box w={"100%"} h={"300px"} mt={2} mb={4}>
            <Image
              src={event.image}
              alt={event.title}
              borderRadius={"sm"}
              boxSize={"100%"}
              objectFit={"cover"}
              objectPosition={"center"}
            ></Image>
          </Box>

          <SimpleGrid columns={1} spacing={5}>
            <Box p={4}>
              <Center>
                {" "}
                <Text
                  fontSize={"lg"}
                  fontWeight={"bold"}
                  fontStyle={"italic"}
                  color={"gray.600"}
                  textTransform={"uppercase"}
                >
                  {event.description}
                </Text>
              </Center>
              <Center>
                <Flex mt={5}>
                  <Text fontSize={"sm"} fontWeight={"bold"}>
                    Location:
                  </Text>
                  <Text fontSize={"sm"} fontWeight={"semibold"} pl={2}>
                    {event.location}
                  </Text>
                </Flex>
              </Center>
              <Center>
                <Flex flexDir={"column"}>
                  <Flex mt={2} flexDir={"row"}>
                    <Text pt={3} fontSize={"sm"} fontWeight={"bold"}>
                      Starts at:
                    </Text>
                    <Text pt={3} pl={4} fontSize={"sm"} fontWeight={"semibold"}>
                      {new Date(event.startTime).toLocaleString([], {
                        dateStyle: "short",
                        timeStyle: "short",
                        hour24: true,
                      })}
                    </Text>
                  </Flex>

                  <Flex flexDir={"row"}>
                    <Text pt={3} fontSize={"sm"} fontWeight={"bold"}>
                      Ends at:
                    </Text>
                    <Text pt={3} pl={6} fontSize={"sm"} fontWeight={"semibold"}>
                      {new Date(event.endTime).toLocaleString([], {
                        dateStyle: "short",
                        timeStyle: "short",
                        hour24: true,
                      })}
                    </Text>
                  </Flex>
                </Flex>
              </Center>
              <Center>
                <Flex wrap="wrap" gap={4} mr={4} mt={7} mb={5}>
                  {categories
                    .filter((category) =>
                      event.categoryIds.includes(category.id)
                    )
                    .map((category) => (
                      <Text
                        key={category.name}
                        fontWeight={"bold"}
                        fontSize={"xs"}
                        backgroundColor={"yellow.300"}
                        borderRadius={"md"}
                        border={"black"}
                        px={1}
                        textTransform={"uppercase"}
                      >
                        {category.name}
                      </Text>
                    ))}
                </Flex>
              </Center>

              <Center mt={1}>
                <Text fontSize={"sm"} fontWeight={"bold"}>
                  Created by:
                </Text>
                {users
                  .filter((user) => user.id == event.createdBy)
                  .map((user) => (
                    <Text
                      key={user.id}
                      fontSize={"sm"}
                      fontWeight={"semibold"}
                      pl={3}
                      pr={3}
                    >
                      {user.name}
                    </Text>
                  ))}
                {users
                  .filter((user) => user.id == event.createdBy)
                  .map((user) => (
                    <Image
                      key={() => user.name + user.id}
                      src={user.image}
                      alt={user.name}
                      boxSize={"80px"}
                      objectFit={"cover"}
                      borderRadius={"50%"}
                      position={"relative"}
                      m={2}
                    ></Image>
                  ))}
              </Center>

              <Center mt={10}>
                <Button
                  w="100px"
                  mr={8}
                  fontWeight={"bold"}
                  fontSize={"lg"}
                  borderRadius={"md"}
                  backgroundColor={"blue.300"}
                  _hover={{ backgroundColor: "blue.500" }}
                  textTransform={"uppercase"}
                  onClick={() => setModalEditOpen(true)}
                  //onClick={onOpen}
                >
                  Edit
                </Button>

                <Button
                  w="100px"
                  fontWeight={"bold"}
                  fontSize={"lg"}
                  borderRadius={"md"}
                  backgroundColor={"blue.300"}
                  _hover={{ backgroundColor: "blue.500" }}
                  textTransform={"uppercase"}
                  onClick={() => setAlertDeleteOpen(true)}
                >
                  Delete
                </Button>
              </Center>
            </Box>
          </SimpleGrid>
        </Box>

        <EditEvent
          isOpen={modalEditOpen}
          onClose={() => {
            setModalEditOpen(false);
          }}
          mainevent={event}
          categories={categories}
        ></EditEvent>

        <DeleteEvent
          isOpen={alertDeleteOpen}
          onClose={() => {
            setAlertDeleteOpen(false);
          }}
          event={event}
        ></DeleteEvent>
      </Center>
    </>
  );
};
