import React from "react";
import "./App.css";
import { HashRouter } from "react-router-dom";
import routes from "./routes";
import { Provider } from "react-redux";
import store from "./store";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider, styled } from "baseui";

const engine = new Styletron();

const Centered = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%"
});

function App() {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Centered>
          <Provider store={store}>
            <HashRouter>
              <div className="App">{routes}</div>
            </HashRouter>
          </Provider>
        </Centered>
      </BaseProvider>
    </StyletronProvider>
  );
}

export default App;
