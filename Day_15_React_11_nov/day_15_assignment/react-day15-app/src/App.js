import React from "react";
import Header from "./components/Header";
import OfflineBanner from "./components/OfflineBanner";
import WorkoutTracker from "./components/WorkoutTracker";
import { ThemeProvider } from "./context/ThemeContext";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <OfflineBanner />
        <div style={{ padding: "20px" }}>
          <Header />
          <hr />
          <WorkoutTracker />
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
