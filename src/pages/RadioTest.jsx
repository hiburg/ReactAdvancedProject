import { Text, Heading, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { useState } from "react";

export const RadioExample = () => {
  const categories = [
    { name: "sports", catid: 1 },
    { name: "games", catid: 2 },
    { name: "relaxation", catid: 3 },
  ];

  const [radioValue, setRadioValue] = useState("1");
  console.log("main:", radioValue);
  console.log("main:", typeof radioValue);

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
      {/* <RadioGroup onChange={setValue} value={value}> */}
      <RadioGroup
        onChange={(e) => handleChange(e)}
        value={radioValue.toString()}
      >
        <Stack direction="row">
          {categories.map((category) => (
            <Radio key={category.catid} value={category.catid.toString()}>
              {category.name}
            </Radio>
          ))}
          {/* <Radio value="1" id="a">
            First
          </Radio>
          <Radio value="2" id="b">
            Second
          </Radio>
          <Radio value="3" id="c">
            Third
          </Radio> */}
        </Stack>
      </RadioGroup>
      <Heading>-------------------------------------------</Heading>
      <Text>Waarde van value: {radioValue}</Text>
      {/* <Text>Waarde van id: {event.target.id}</Text> */}
    </>
  );
};
