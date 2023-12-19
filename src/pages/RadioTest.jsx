import { Text, Heading, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { useState } from "react";

export const RadioExample = () => {
  const [value, setValue] = useState("1");
  return (
    <>
      <Heading>Dit is de radiobutton test</Heading>
      <RadioGroup onChange={setValue} value={value}>
        <Stack direction="row">
          <Radio value="5" id="a">
            First
          </Radio>
          <Radio value="6" id="b">
            Second
          </Radio>
          <Radio value="7" id="c">
            Third
          </Radio>
        </Stack>
      </RadioGroup>
      <Heading>-------------------------------------------</Heading>
      <Text>Waarde van value: {value}</Text>
      {/* <Text>Waarde van id: {event.target.id}</Text> */}
    </>
  );
};
