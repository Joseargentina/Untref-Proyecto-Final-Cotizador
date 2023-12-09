import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Historial from "./components/historial/Historial";
import Layouts from "./components/layouts/Layouts";
import Home from "./components/home/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layouts />}>
          <Route index element={<Home />} />
          <Route path="historial" element={<Historial />} />
          <Route
            path="*"
            element={
              <>
                <h1>
                  Te saliste del camino.<Link to={"/"}>Volver</Link>
                </h1>
              </>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
