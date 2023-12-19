import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useToast,
  Textarea,
  Text,
  Input,
  FormLabel,
  Stack,
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/react";

import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";

export const EditEvent = ({ isOpen, onClose, mainevent, categories }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const toastId = "edit-event-toast";
  //console.log("categories", categories);

  const [title, setTitle] = useState(mainevent.title);
  const [description, setDescription] = useState(mainevent.description);
  const [imageUrl, setImageUrl] = useState(mainevent.image);
  const [categoryIds, setCategoryIds] = useState(mainevent.categoryIds);
  const [location, setLocation] = useState(mainevent.location);
  const [startDateTime, setStartDateTime] = useState(mainevent.startTime);
  const [endDateTime, setEndDateTime] = useState(mainevent.endTime);
  //const [eventObject, setEventObject] = useState(mainevent);
  //const [categoryIds, setCategoryIds] = useState([]);

  const handleCheckBox = (e) => {
    console.log("event", e);
    console.log("event-target", e.target);
    if (e.target.checked) {
      setCategoryIds([...categoryIds, Number(e.target.id)]);
    } else {
      setCategoryIds(categoryIds.filter((id) => id != e.target.id));
    }
    //console.log("categoryIds -2- :", categoryIds);
  };

  const handleCheckBox2 = (categoryId) => {
    console.log(
      "in handleCheckBox2 - , tycategoryId:",
      categoryId,
      typeof categoryId
    );
    if (categoryIds.includes(categoryId)) {
      setCategoryIds(categoryIds.filter((id) => id != categoryId));
    } else {
      setCategoryIds([...categoryIds, categoryId]);
    }
    console.log("categoryIds -3- :", categoryIds);
  };

  const handleCancel = () => {
    setTitle(mainevent.title);
    setDescription(mainevent.description);
    setImageUrl(mainevent.image);
    setCategoryIds(mainevent.categoryIds);
    setLocation(mainevent.location);
    setStartDateTime(mainevent.startTime);
    setEndDateTime(mainevent.endTime);
    onClose();
  };

  // const handleChange = (key, value) => {
  //   setEventObject({ ...eventObject, [key]: value });
  //   console.log("handlechange: ", eventObject);
  // };
  // const [eventObject, setEventObject] = useState(mainevent);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = {
      createdBy: mainevent.createdBy,
      title: title,
      description: description,
      image: imageUrl,
      categoryIds: categoryIds,
      location: location,
      startTime: startDateTime,
      endTime: endDateTime,
    };

    console.log("EventData:", eventData);

    const response = await fetch(
      `http://localhost:3000/events/${mainevent.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        //headers: { "Content-Type": "application/json;charset=utf-8" },

        body: JSON.stringify(eventData),
      }
    );

    if (response.ok) {
      console.log("Event updated successfully");
      //setIsPending(false);
      onClose();
      toast({
        toastId,
        title: "Update success",
        description: "the event has been successfully updated",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      //navigate("/");
      navigate(`/event/${mainevent.id}`);
    } else {
      console.error(`Error updating event: ${response.statusText}`);
      onClose();
      toast({
        toastId,
        title: "Update failed",
        description: "An error occurred during the update",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // const handleSubmit1 = () => {
  //   console.log("HandleSubmit1: ", title);
  //   console.log("HandleSubmit1: ", event.title);
  // };
  // const handleSubmit2 = () => {
  //   console.log("HandleSubmit2: ", title);
  //   console.log("HandleSubmit2: ", event.title);
  // };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent backgroundColor={"blue.50"}>
          <ModalHeader
            align={"center"}
            fontSize="xl"
            fontWeight="bold"
            textTransform={"uppercase"}
          >
            Edit Event
          </ModalHeader>
          {/* <ModalCloseButton /> */}

          <ModalBody>
            {/* <form method="post"> */}
            {/* <form onSubmit={handleSubmit}> */}
            <form id="new-form" onSubmit={handleSubmit}>
              <FormLabel>Title: </FormLabel>
              <Input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                required
                isRequired
                placeholder="title of the event..."
                _placeholder={{
                  opacity: 1,
                  color: "gray.600",
                  fontWeight: "semibold",
                  fontStyle: "italic",
                }}
                backgroundColor={"blue.100"}
                textColor={"black"}
                mb={5}
              ></Input>

              <FormLabel>Description:</FormLabel>
              <Textarea
                onChange={(e) => setDescription(e.target.value)}
                value={description}
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
                mb={5}
              ></Textarea>

              <FormLabel>Image URL: `</FormLabel>
              <Input
                onChange={(e) => setImageUrl(e.target.value)}
                value={imageUrl}
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
                mb={5}
              ></Input>

              <FormLabel>Location:</FormLabel>
              <Input
                onChange={(e) => setLocation(e.target.value)}
                value={location}
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
                mb={5}
              ></Input>

              <FormLabel>Start Date/time:</FormLabel>
              <Input
                type="datetime-local"
                value={startDateTime}
                required
                placeholder="Select Date and Time"
                size="md"
                onChange={(e) => setStartDateTime(e.target.value)}
                //min={getCurrentDateTime()}
                backgroundColor={"blue.100"}
                color={"gray.600"}
                fontWeight={"semibold"}
                mb={5}
              ></Input>

              <FormLabel>End Date/time:</FormLabel>
              <Input
                type="datetime-local"
                value={endDateTime}
                required
                placeholder="Select Date and Time"
                size="md"
                onChange={(e) => setEndDateTime(e.target.value)}
                //min={getCurrentDateTime()}
                backgroundColor={"blue.100"}
                color={"gray.600"}
                fontWeight={"semibold"}
                mb={5}
              ></Input>

              {/* <CheckboxGroup id="12345" colorScheme="blue" isRequired> */}
              <FormLabel ml={1}>Categories:</FormLabel>
              <Stack spacing={7} direction={"row"}>
                {categories.map((category) => (
                  <Checkbox
                    key={category.id}
                    fontWeight={"medium"}
                    fontStyle={"italic"}
                    textColor={"gray.900"}
                    //onChange={handleCheckBox}
                    onChange={(e) => handleCheckBox(e)}
                    //onChange={() => handleCheckBox2(category.id)}
                    name={category.name}
                    id={category.id}
                    value={category.name}
                    isChecked={categoryIds.includes(category.id)}
                  >
                    {category.name}
                  </Checkbox>
                ))}
              </Stack>
              {/* </CheckboxGroup> */}
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              //onClick={handleSubmit}
              type="submit"
              form="new-form"
              ml={3}
              mt={3}
              w="100px"
              mr={5}
              fontWeight={"bold"}
              fontSize={"lg"}
              borderRadius={"md"}
              backgroundColor={"blue.300"}
              _hover={{ backgroundColor: "blue.500" }}
              textTransform={"uppercase"}
            >
              Save
            </Button>

            <Button
              //onClick={onClose}
              onClick={handleCancel}
              mt={3}
              w="100px"
              fontWeight={"bold"}
              fontSize={"lg"}
              borderRadius={"md"}
              backgroundColor={"blue.300"}
              _hover={{ backgroundColor: "blue.500" }}
              textTransform={"uppercase"}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
