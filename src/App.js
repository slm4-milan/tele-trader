import React from "react";
import './App.css';
import Header from './components/header';
import PairsTable from "./components/pairsTable";
import PairDetails from "./components/pairDetails";
import FavoritePairs from "./components/favoritePairs";

function App() {
    return (
        <React.Fragment>
            <Header/>
            <PairsTable/>
            <PairDetails/>
            <FavoritePairs/>
        </React.Fragment>
    );
}

export default App;
