import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Auth from "./component/Auth";
import Home from "./component/Home";
import ItemsDetails from "./component/Menu/ItemsDetail";
import NotFound from "./component/NotFound";
import Allmenu from "./component/Allmenu";
import Cart from "./component/Cart";

import PageLoader from "./component/PageLoader";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Auth />} />

        <Route path="/" element={<Home />} />

        <Route path="/item/:itemName" element={<ItemsDetails />} />

        <Route path="/all-menu" element={<Allmenu />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
