import { useState } from "react";

export const CheckBoxExample2 = () => {
  const checkboxes = [
    { id: 1, label: 1, value: "sports" },
    { id: 2, label: 2, value: "games" },
    { id: 3, label: 3, value: "relaxation" },
  ];

  const [selectedItems, setSelectedItems] = useState([2]);

  const handleCheckBoxChange = (e) => {
    const value = parseInt(e.target.value);
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
                  value={checkbox.id}
                  onChange={handleCheckBoxChange}
                ></input>
                {checkbox.value}
              </label>
            </div>
          ))}
          <br />
          <p>{selectedItems}</p>
          <button type="submit" id="form-a">
            Submit
          </button>
          <button type="reset" id="form-a" onClick={handleResetButton}>
            Reset
          </button>
        </form>
      </div>
    </>
  );
};
