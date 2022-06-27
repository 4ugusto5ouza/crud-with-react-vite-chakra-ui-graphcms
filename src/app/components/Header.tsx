import { Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <Flex
      w={"100%"}
      h={"52px"}
      px={"60px"}
      bgColor={"#fdfdfd"}
      alignItems={"center"}
      justifyContent={"end"}
      gap="30px"
    >
      <Link to={"/"}>Home</Link>
      <Link to={"/login"}>Login</Link>
    </Flex>
  );
};
