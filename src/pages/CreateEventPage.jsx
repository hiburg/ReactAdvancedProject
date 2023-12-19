import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Checkbox,
  CheckboxGroup,
  Stack,
  Center,
  Button,
  Text,
  Input,
  Flex,
  Select,
  Textarea,
} from "@chakra-ui/react";

export const loader = async () => {
  const categories = await fetch("http://localhost:3000/categories");
  const users = await fetch("http://localhost:3000/users");
  return {
    categories: await categories.json(),
    users: await users.json(),
  };
};

export const CreateEventPage = () => {
  const { categories, users } = useLoaderData();
  const navigate = useNavigate();

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

  const handleCancel = () => {
    navigate("/");
  };

  const handleSubmitButton = () => {
    console.log("Na de klik !");
  };

  const addEvent = async (event) => {
    event.preventDefault();
    console.log("----------------Addevent-----------------------------");
    console.log("");
    //console.log("Userid", userId);
    //console.log("title:", title);

    if (categoryIds.length < 1) {
      window.alert("One or more categories are required !");
      return;
    }

    const newEvent = {
      id: undefined,
      createdBy: userId,
      title: title,
      description: description,
      image: imageUrl,
      categoryIds: categoryIds,
      location: location,
      startTime: startDateTime,
      endTime: endDateTime,
    };
    console.log(newEvent);

    const response = await fetch("http://localhost:3000/events", {
      method: "POST",
      body: JSON.stringify(newEvent),
      //      headers: { "Content-Type": "application/json;charset=utf-8" },
      headers: { "Content-Type": "application/json" },
    });
    const newEventId = (await response.json()).id;
    console.log("na de CreateEvent", newEventId);
    navigate(`/event/${newEventId}`);
  };

  // const handleCheckBoxGroup = (event) => {
  //   console.log("handle checkboxgroup", event.target.value);
  // };

  const handleCheckBox = (event) => {
    if (event.target.checked) {
      setCategoryIds([...categoryIds, Number(event.target.id)]);
    } else {
      setCategoryIds(categoryIds.filter((id) => id != event.target.id));
    }
    //console.log("categoryIds -2- :", categoryIds);
  };

  const handleSelect = (event) => {
    console.log(
      "---------------------In handleSelect--------------------------"
    );
    console.log("Userid", userId);
    console.log("Userid", event.target.value, event.target.id);
    setUserId(Number(event.target.value));
  };

  return (
    <>
      <Center fontSize={"2xl"} fontWeight={"bold"} pt={5} pb={4}>
        Create a new Event
      </Center>
      {/* <Form>Dit is een form</Form> */}
      <Center>
        <form id="form-create-event" onSubmit={addEvent}>
          <Flex direction="column">
            <Input
              onChange={(e) => setTitle(e.target.value)}
              //onChange={(e) => handleInput(e)}
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

            <CheckboxGroup colorScheme="blue" isRequired required>
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

            {/* <Text mt={3} ml={2} fontWeight={"semibold"} textColor={"gray.800"}>
              Select user:
            </Text> */}
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
              onClick={handleSubmitButton}
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
