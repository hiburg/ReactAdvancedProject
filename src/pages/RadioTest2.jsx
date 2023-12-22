import { Text, Heading, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { useState } from "react";

export const RadioExample2 = () => {
  const categories = [
    { name: "sports", catid: 1 },
    { name: "games", catid: 2 },
    { name: "relaxation", catid: 3 },
  ];

  const [radioValue, setRadioValue] = useState("3");
  console.log("main:", radioValue, typeof radioValue);

  const handleChange = (event) => {
    console.log("event", event);
    console.log(typeof event);
    //console.log("event.target", event.target);
    //console.log("event.target.value", event.target.value);
    setRadioValue(event.toString());
  };

  return (
    <>
      <Heading>Dit is de radiobutton test</Heading>
      <RadioGroup onChange={setRadioValue} value={radioValue.toString()}>
        <Stack direction="row">
          {/* <Radio value={"1"}>First</Radio>
          <Radio value={"2"}>Second</Radio>
          <Radio value={"3"}>Third</Radio> */}
          {categories.map((category) => (
            <Radio key={category.catid} value={category.catid.toString()}>
              {category.name}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
      <Heading>-------------------------------------------</Heading>
      <Text>Waarde van value: {radioValue}</Text>
    </>
  );
};
