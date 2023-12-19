import { Button, Heading } from "@chakra-ui/react";
import { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";

export const TestPage = ({ countparm }) => {
  const [counter, setCounter] = useState(0);
  const [countparm2, setCountparm2] = useState(countparm);
  //const navigate = useNavigate();

  useEffect(() => {
    setCountparm2(counter);
    console.log("--------------useEffect----------------------------");
    console.log("Counter is nu: ", counter);
    console.log("Countparm is nu: ", countparm);
    console.log("Countparm2 is nu: ", countparm2);
  });

  const handleClick1 = () => {
    setCounter(counter + 1);
    console.log("--------------handleClick1----------------------------");
    console.log("Counter is nu: ", counter);
    console.log("Countparm is nu: ", countparm);
  };

  const handleClick2 = () => {
    console.log("--------------handleClick2----------------------------");
    console.log("Counter is nu: ", counter);
    console.log("Countparm is nu: ", countparm);
    console.log("Countparm2 is nu: ", countparm2);
    //navigate("/test");
  };

  return (
    <>
      <Heading>Dit is een testpage</Heading>
      <Button onClick={handleClick1}>Add 1 to counter</Button>
      <Button onClick={handleClick2}>Klaar</Button>
      <Heading>Waarde counter: {counter}</Heading>
      <Heading>Waarde countparm: {countparm}</Heading>
      <Heading>Waarde countparm2: {countparm2}</Heading>
    </>
  );
};
