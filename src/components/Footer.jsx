import { Box, Text } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <>
      <Box backgroundColor={"blue.400"} mt={4}>
        <Text
          textAlign={"center"}
          fontWeight={"semibold"}
          fontSize={"lg"}
          pb={3}
        >
          Version 1.0 - Herman Iburg
        </Text>
      </Box>
    </>
  );
};
