import { Button, Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";
import { useState } from "react";

export const CheckBoxExample2 = () => {
  const checkboxes = [
    { id: 1, label: "A" },
    { id: 2, label: "B" },
    { id: 3, label: "C" },
  ];

  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckBoxChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setSelectedItems([...selectedItems, value]);
    } else {
      setSelectedItems(selectedItems.filter((item) => item !== value));
    }
  };

  const handleResetButton = () => {
    setSelectedItems([]);
  };

  return (
    <>
      <div>
        <h2>Select Options</h2>
        <form id="form-a">
          {checkboxes.map((checkbox) => (
            <div key={checkbox.id}>
              <label>
                <input
                  type="checkbox"
                  value={checkbox.label}
                  onChange={handleCheckBoxChange}
                ></input>
                {checkbox.label}
              </label>
            </div>
          ))}
          <br />
          <p>{selectedItems}</p>
          <button type="submit" id="form-a">
            Submit
          </button>
          <button type="reset" id="form-a">
            Reset
          </button>
        </form>
      </div>
      <h3>--------------------------------------------------------</h3>
      <div>
        <form id="form-b">
          <CheckboxGroup colorScheme="green">
            <Stack spacing={[1, 5]} direction={["column", "row"]}>
              {checkboxes.map((checkbox) => (
                <Checkbox
                  isRequired
                  key={checkbox.id}
                  value={checkbox.label}
                  onChange={handleCheckBoxChange}
                >
                  {checkbox.label}
                </Checkbox>
              ))}
            </Stack>
          </CheckboxGroup>
          <p>{selectedItems}</p>
          <Button type="submit" id="form-b">
            Submit
          </Button>
          {/* <button type="submit" id="form-b">
            Submit
          </button> */}
          <p></p>
          <Button type="reset" id="form-b" onClick={handleResetButton}>
            Reset
          </Button>
          {/* <button type="reset" id="form-b" onChange={{ handleResetButton }}>
            Reset
          </button> */}
        </form>
      </div>
    </>
  );
};
