import { Outlet } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";

function App() {
  return (
    <section>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </section>
  );
}

export default App;
