import React from "react";

import { ThemeProvider } from "@material-ui/core";

import { UserProvider } from "./contexts";
import { LayoutProvider } from "./contexts/LayoutContext";
import Routes from "./routes/Routes";
import theme from "./theme";

const App: React.FC = () => {
  return (
    <LayoutProvider>
      <UserProvider>
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
      </UserProvider>
    </LayoutProvider>
  );
};
export default App;
