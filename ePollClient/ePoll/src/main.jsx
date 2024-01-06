import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CssBaseline, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

import Center from "./components/Center.jsx";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline>
        <Center>
          <App />
        </Center>
      </CssBaseline>
    </ThemeProvider>
  </React.StrictMode>
);
