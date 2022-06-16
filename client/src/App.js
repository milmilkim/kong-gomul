import Router from "./router/Router.js";
import { ThemeProvider } from "styled-components";
import theme from "./theme.js";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <h1>App</h1>
      <Router />
    </ThemeProvider>
  );
}

export default App;
