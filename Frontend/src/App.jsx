import "./App.css";

import ConfigureFrom from "./Components/ConfigureFrom";
import DisplayForm from "./Components/DisplayForm";
// import EditQuestion from "./Components/EditQuestion";
import Sidebar from "./Components/Sidebar";

function App() {
  return (
    <>
      <Sidebar />
      <DisplayForm />
      <ConfigureFrom />

      {/* <EditQuestion /> */}
    </>
  );
}

export default App;
