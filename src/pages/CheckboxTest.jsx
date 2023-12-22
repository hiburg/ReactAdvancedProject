import {
  Input,
  Button,
  Checkbox,
  CheckboxGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

export const CheckBoxExample = () => {
  const [title, setTitle] = useState("");

  const handleSubmitButton = () => {
    console.log("In de handleSubmitButton");
  };

  const handleResetButton = () => {
    console.log("In de handleResetButton");
  };

  const handleSubmit = () => {
    console.log("In de handleSubmit");
  };

  const checkBoxChange = (e) => {
    console.log("In de checkboxchange", e);
  };

  return (
    <>
      <form id="form-test" onSubmit={handleSubmit}>
        <Input
          type="text"
          //required
          isRequired
          onChange={(e) => setTitle(e.target.value)}
        ></Input>
        <Text>{title}</Text>
        {/* <CheckboxGroup colorScheme="green" defaultValue={["sports"]}> */}
        <CheckboxGroup colorScheme="green">
          <Stack spacing={[1, 5]} direction={["column", "row"]}>
            <Checkbox value="sports">sports</Checkbox>
            <Checkbox
              value="games"
              checked={true}
              isChecked={true}
              onChange={(e) => checkBoxChange(e)}
            >
              games
            </Checkbox>
            <Checkbox value="relaxation" checked={true} isChecked={true}>
              relaxation
            </Checkbox>
          </Stack>
        </CheckboxGroup>
      </form>
      <Stack>
        <Button
          type="submit"
          form="form-test"
          //onClick={handleSubmitButton}
          mt={10}
          mb={5}
        >
          Add
        </Button>
        <Button
          type="reset"
          form="form-test"
          onClick={handleResetButton}
          mt={10}
          mb={5}
          ml={5}
        >
          Reset
        </Button>
      </Stack>
    </>
  );
};
