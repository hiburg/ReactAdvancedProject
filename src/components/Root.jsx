import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box, Container } from "@chakra-ui/react";
import { Footer } from "./Footer";

export const Root = () => {
  return (
    // <Box backgroundColor={"blue.400"} vh={"100"}>
    <Box
      backgroundColor={"blue.400"}
      //height={"300vh"}
      //width={"100%"}
      //width={"calc(100vw)"}
      //minHeight={"100vh"}
      //minWidth={"100vh"}
    >
      <Navigation />
      <Outlet />
      <Footer></Footer>
    </Box>
    // </Box>
  );
};
