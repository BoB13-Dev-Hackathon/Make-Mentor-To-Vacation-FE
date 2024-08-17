import React from 'react';
import {
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import Main from "./pages/Main";
import Test from './pages/Test';
import { NextUIProvider } from '@nextui-org/react';


function App() {
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate}>
      <Routes>
        <Route path="/">
          <Route index element={<Main />} />
          <Route path="test" element={<Test />} />
        </Route>
      </Routes>
    </NextUIProvider>
  );
}

export default App;
