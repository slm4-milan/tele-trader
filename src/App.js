import React from "react";
import './App.css';
import Header from './components/header';
import BasicTable from "./components/pairsTable";

function App() {
  return (
    <React.Fragment>
        <Header/>
        <BasicTable/>
    </React.Fragment>
  );
}

export default App;
