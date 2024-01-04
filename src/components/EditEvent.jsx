import {
  Button,
  Checkbox,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";

import { useState } from "react";

export const EditEvent = ({
  isOpen,
  onClose,
  mainEvent,
  setMainEvent,
  categories,
}) => {
  const toast = useToast();
  const toastId = "edit-event-toast";

  const [title, setTitle] = useState(mainEvent.title);
  const [description, setDescription] = useState(mainEvent.description);
  const [imageUrl, setImageUrl] = useState(mainEvent.image);
  const [categoryIds, setCategoryIds] = useState(mainEvent.categoryIds);
  const [location, setLocation] = useState(mainEvent.location);
  const [startDateTime, setStartDateTime] = useState(mainEvent.startTime);
  const [endDateTime, setEndDateTime] = useState(mainEvent.endTime);

  // Convert UTC-date/time from to local-date/time
  const convertUTCToLocal = (utcDateString) => {
    let date = new Date(utcDateString);
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);
  };

  // Convert local-date/time to UTC date/time
  const convertLocalToUTC = (localDateString) => {
    let date = new Date(localDateString);
    return new Date(date.getTime()).toISOString();
  };

  const handleCheckBox = (e) => {
    if (e.target.checked) {
      setCategoryIds([...categoryIds, Number(e.target.id)]);
    } else {
      setCategoryIds(categoryIds.filter((id) => id != e.target.id));
    }
  };

  const handleCancel = () => {
    setTitle(mainEvent.title);
    setDescription(mainEvent.description);
    setImageUrl(mainEvent.image);
    setCategoryIds(mainEvent.categoryIds);
    setLocation(mainEvent.location);
    setStartDateTime(mainEvent.startTime);
    setEndDateTime(mainEvent.endTime);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Handle submit begun mainEvent-id: ", mainEvent.id);

    if (categoryIds.length < 1) {
      window.alert("One or more categories are required !");
      return;
    }

    const startDateTimeUTC = convertLocalToUTC(startDateTime);
    const endDateTimeUTC = convertLocalToUTC(endDateTime);

    const eventData = {
      id: mainEvent.id,
      createdBy: mainEvent.createdBy,
      title: title,
      description: description,
      image: imageUrl,
      categoryIds: categoryIds,
      location: location,
      startTime: startDateTimeUTC,
      endTime: endDateTimeUTC,
    };

    const response = await fetch(
      `http://localhost:3000/events/${mainEvent.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      }
    );

    if (response.ok) {
      setMainEvent(eventData);
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

          <ModalBody>
            <form id="form-edit-event" onSubmit={handleSubmit}>
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
                value={convertUTCToLocal(startDateTime)}
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
                value={convertUTCToLocal(endDateTime)}
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

              <FormLabel ml={1}>Categories:</FormLabel>
              <Stack spacing={7} direction={"row"}>
                {categories.map((category) => (
                  <Checkbox
                    key={category.id}
                    fontWeight={"medium"}
                    fontStyle={"italic"}
                    textColor={"gray.900"}
                    onChange={(e) => handleCheckBox(e)}
                    name={category.name}
                    id={category.id}
                    value={category.name}
                    isChecked={categoryIds.includes(category.id)}
                  >
                    {category.name}
                  </Checkbox>
                ))}
              </Stack>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              form="form-edit-event"
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
              type="button"
              form="form-edit-event"
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
