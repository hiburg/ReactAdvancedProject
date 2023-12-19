import { useState } from "react";

const allToppings = [
  { name: "Golden Corn", checked: false },
  { name: "Paneer", checked: false },
  { name: "Tomato", checked: false },
  { name: "Mushroom", checked: false },
  { name: "Onion", checked: false },
  { name: "Black Olives", checked: false },
];

const Checkbox = ({ isChecked, label, checkHandler, index }) => {
  return (
    <div>
      <input
        type="checkbox"
        id={`checkbox-${index}`}
        checked={isChecked}
        onChange={checkHandler}
      />
      <label htmlFor={`checkbox-${index}`}>{label}</label>
    </div>
  );
};

export function App2() {
  const [toppings, setToppings] = useState(allToppings);

  const updateCheckStatus = (index) => {
    setToppings(
      toppings.map((topping, currentIndex) =>
        currentIndex === index
          ? { ...topping, checked: !topping.checked }
          : topping
      )
    );

    // or
    // setToppings([
    //   ...toppings.slice(0, index),
    //   { ...toppings[index], checked: !toppings[index].checked },
    //   ...toppings.slice(index + 1),
    // ]);
  };

  return (
    <div className="App">
      {toppings.map((topping, index) => (
        <Checkbox
          key={topping.name}
          isChecked={topping.checked}
          checkHandler={() => updateCheckStatus(index)}
          label={topping.name}
          index={index}
        />
      ))}
      <p>
        <pre>{JSON.stringify(toppings, null, 2)}</pre>
      </p>
    </div>
  );
}
