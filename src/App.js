import React from "react";
import './App.css';
import Header from './components/Header';
import Home from "./routes/Home";
import Details from './routes/Details';
import NotFound from './routes/NotFound';
import Favorites from './routes/Favorites'

import {BrowserRouter, Route, Routes,} from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" index element={<Home/>}/>
          <Route path="/details/:listingId" element={<Details/>}/>
          <Route path="/favorites" element={<Favorites/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
