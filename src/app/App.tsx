import { Box } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./components/Header";
import { AppRoutes } from "./routes";

export const App = () => {
  return (
    <BrowserRouter>
      <Box w={"100vw"} h={"100vh"} boxSizing={"border-box"}>
        <Header />
        <AppRoutes />
      </Box>
    </BrowserRouter>
  );
};
