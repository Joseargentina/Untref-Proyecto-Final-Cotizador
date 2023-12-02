import { BrowserRouter, Routes, Route } from "react-router-dom";
import Formulario from "./components/formulario/Formulario";
import Historial from "./components/historial/Historial";
import NotFound from "./components/notFound/NotFound";
import Layouts from "./components/layouts/Layouts";
import Header from "./components/header/Header";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layouts />}>
          <Route index element={<Formulario />} />
          <Route path="historial" element={<Historial />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
