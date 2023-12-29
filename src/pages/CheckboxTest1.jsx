import { Button, Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";
import { useState } from "react";

export const CheckBoxExample1 = () => {
  const checkboxes = [
    { id: 1, label: 1, value: "sports" },
    { id: 2, label: 2, value: "games" },
    { id: 3, label: 3, value: "relaxation" },
  ];

  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckBoxChange = (e) => {
    const id = e.target.id;
    if (e.target.checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    }
  };

  const handleResetButton = () => {
    console.log("in de reset");
    setSelectedItems([]);
  };

  return (
    <>
      <div>
        <form id="form-b">
          <CheckboxGroup colorScheme={"green"}>
            <Stack spacing={[1, 5]} direction={["column", "row"]}>
              {checkboxes.map((checkbox) => (
                <Checkbox
                  key={checkbox.id}
                  value={checkbox.value}
                  id={checkbox.id}
                  onChange={handleCheckBoxChange}
                  isChecked={selectedItems.includes(checkbox.id.toString())}
                >
                  {checkbox.value}
                </Checkbox>
              ))}
            </Stack>
          </CheckboxGroup>
          <p>{selectedItems}</p>
          <Button type="submit" id="form-b">
            Submit
          </Button>
          <p></p>
          <Button type="reset" id="form-b" onClick={handleResetButton}>
            Reset
          </Button>
        </form>
      </div>
    </>
  );
};
