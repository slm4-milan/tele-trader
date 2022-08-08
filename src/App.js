import React from "react";
import './App.css';
import Header from './components/Header';
import Home from "./routes/Home";
import Details from './routes/Details';
import NotFound from './routes/NotFound';

import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" index element={<Home />} />
                <Route path="/details/:listingId" element={<Details />} />
                <Route path="/favorites" element={<Details />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
