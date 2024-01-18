import React from "react";
import LoginPage from "./LoginPage"; // Your login page component
import MainView from "./MainPage"; // Your main view component

function App() {
  const [user, setUser] = React.useState();

  return (
    <div>
      {user ? <MainView /> : <LoginPage onLogin={setUser} />}
    </div>
  );
}

export default App;
