import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Button,
  Center,
  Checkbox,
  CheckboxGroup,
  Flex,
  Input,
  Select,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";

export const loader = async () => {
  const categories = await fetch("http://localhost:3000/categories");
  if (!categories.ok) {
    throw new Error(
      `Error while fetching the categories: ${categories.status} ${categories.statusText}`
    );
  }
  const users = await fetch("http://localhost:3000/users");
  if (!users.ok) {
    throw new Error(
      `Error while fetching the users: ${users.status} ${users.statusText}`
    );
  }
  return {
    categories: await categories.json(),
    users: await users.json(),
  };
};

export const CreateEventPage = () => {
  const { categories, users } = useLoaderData();
  const navigate = useNavigate();
  const toast = useToast();
  const toastId = "create-event-toast";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [location, setLocation] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [categoryIds, setCategoryIds] = useState([]);
  const [userId, setUserId] = useState("");

  const getCurrentDateTime = () => {
    const currentDateTime = new Date();
    const currentDateTimeStr = currentDateTime.toISOString().slice(0, 16);
    //console.log(currentDateTimeStr);
    return currentDateTimeStr;
  };

  const convertLocalToUTC = (localDateString) => {
    let date = new Date(localDateString);
    return new Date(date.getTime()).toISOString();
  };

  const handleCancel = () => {
    navigate("/");
  };

  const handleResetButton = () => {
    console.log("In de reset1: ", categoryIds);
    setCategoryIds([]);
    console.log("In de reset2: ", categoryIds);
  };

  const addEvent = async (event) => {
    event.preventDefault();
    console.log("----------------Addevent-----------------------------");

    if (categoryIds.length < 1) {
      window.alert("One or more categories are required !");
      return;
    }

    if (endDateTime <= startDateTime) {
      window.alert("The end date/time must be after the start date/time !");
      return;
    }

    const startDateTimeUTC = convertLocalToUTC(startDateTime);
    const endDateTimeUTC = convertLocalToUTC(endDateTime);
    console.log(startDateTimeUTC, endDateTimeUTC);

    const newEvent = {
      id: undefined,
      createdBy: userId,
      title: title,
      description: description,
      image: imageUrl,
      categoryIds: categoryIds,
      location: location,
      startTime: startDateTimeUTC,
      endTime: endDateTimeUTC,
    };

    const response = await fetch("http://localhost:3000/events", {
      method: "POST",
      body: JSON.stringify(newEvent),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      toast({
        toastId,
        title: "Added successfully",
        description: "The event has been successfully added",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      const newEventId = (await response.json()).id;
      navigate(`/event/${newEventId}`);
    } else {
      console.error(`Error updating event: ${response.statusText}`);
      toast({
        toastId,
        title: "Added not succesfully",
        description: "The event has not been added, an error has occurred",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCheckBox = (event) => {
    if (event.target.checked) {
      setCategoryIds([...categoryIds, Number(event.target.id)]);
    } else {
      setCategoryIds(categoryIds.filter((id) => id != event.target.id));
    }
  };

  return (
    <>
      <Center fontSize={"3xl"} fontWeight={"medium"} pt={1} pb={2}>
        Create a new Event:
      </Center>
      <Center>
        <form id="form-create-event" onSubmit={addEvent}>
          <Flex direction="column">
            <Input
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="title of the event..."
              _placeholder={{
                opacity: 1,
                color: "gray.600",
                fontWeight: "semibold",
                fontStyle: "italic",
              }}
              backgroundColor={"blue.100"}
              textColor={"black"}
              mt={2}
            ></Input>

            <Textarea
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
              placeholder="description..."
              _placeholder={{
                opacity: 1,
                color: "gray.600",
                fontWeight: "semibold",
                fontStyle: "italic",
              }}
              backgroundColor={"blue.100"}
              mt={2}
            ></Textarea>

            <Input
              onChange={(e) => setImageUrl(e.target.value)}
              required
              rows={1}
              placeholder="Image URL..."
              _placeholder={{
                opacity: 1,
                color: "gray.600",
                fontWeight: "semibold",
                fontStyle: "italic",
              }}
              backgroundColor={"blue.100"}
              mt={2}
            ></Input>

            <Input
              onChange={(e) => setLocation(e.target.value)}
              required
              rows={1}
              placeholder="location..."
              _placeholder={{
                opacity: 1,
                color: "gray.600",
                fontWeight: "semibold",
                fontStyle: "italic",
              }}
              backgroundColor={"blue.100"}
              mt={2}
            ></Input>

            <Text mt={2} ml={2} fontWeight={"semibold"} textColor={"gray.800"}>
              Start Date/time:
            </Text>
            <Input
              type="datetime-local"
              required
              placeholder="Select Date and Time"
              size="md"
              onChange={(e) => setStartDateTime(e.target.value)}
              min={getCurrentDateTime()}
              backgroundColor={"blue.100"}
              color={"gray.600"}
              fontWeight={"semibold"}
              mt={0}
            ></Input>

            <Text mt={2} ml={2} fontWeight={"semibold"} textColor={"gray.800"}>
              End Date/time:
            </Text>
            <Input
              type="datetime-local"
              required
              placeholder="Select Date and Time"
              size="md"
              onChange={(e) => setEndDateTime(e.target.value)}
              min={getCurrentDateTime()}
              backgroundColor={"blue.100"}
              color={"gray.600"}
              fontWeight={"semibold"}
              mt={0}
            ></Input>

            <CheckboxGroup colorScheme="blue" isRequired>
              <Text
                mt={3}
                ml={2}
                fontWeight={"semibold"}
                textColor={"gray.800"}
              >
                Select categories:
              </Text>

              <Stack spacing={7} direction={"row"} ml={2}>
                {categories.map((category) => (
                  <Checkbox
                    key={category.id}
                    fontWeight={"medium"}
                    fontStyle={"italic"}
                    textColor={"gray.900"}
                    onChange={handleCheckBox}
                    name={category.name}
                    id={category.id}
                    value={category.name}
                  >
                    {category.name}
                  </Checkbox>
                ))}
              </Stack>
            </CheckboxGroup>

            <Select
              placeholder="Select user"
              backgroundColor={"blue.100"}
              textColor={"grey.600"}
              fontWeight={"semibold"}
              onChange={(e) => setUserId(Number(e.target.value))}
              isRequired
              mt={5}
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </Select>
          </Flex>

          <Center>
            <Button
              type="submit"
              id="form-create-event"
              mt={10}
              mb={5}
              fontWeight={"bold"}
              fontSize={"lg"}
              textTransform={"uppercase"}
              width="150px"
              borderRadius={"md"}
              backgroundColor={"blue.200"}
              _hover={{ backgroundColor: "blue.500" }}
            >
              Add
            </Button>
            <Button
              type="reset"
              form="form-create-event"
              onClick={handleResetButton}
              mt={10}
              mb={5}
              ml={5}
              fontWeight={"bold"}
              fontSize={"lg"}
              textTransform={"uppercase"}
              width="150px"
              borderRadius={"md"}
              backgroundColor={"blue.200"}
              _hover={{ backgroundColor: "blue.500" }}
            >
              Reset
            </Button>
            <Button
              type="button"
              form="form-create-event"
              onClick={handleCancel}
              mt={10}
              mb={5}
              ml={5}
              fontWeight={"bold"}
              fontSize={"lg"}
              textTransform={"uppercase"}
              width="150px"
              borderRadius={"md"}
              backgroundColor={"blue.200"}
              _hover={{ backgroundColor: "blue.500" }}
            >
              Cancel
            </Button>
          </Center>
        </form>
      </Center>
    </>
  );
};
