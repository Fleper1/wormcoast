import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/UI/Navbar/Navbar";
import Footer from "./components/UI/Footer/Footer";

function App() {
  return (
      <BrowserRouter>
          <Navbar/>
          <AppRouter/>
          <Footer/>
      </BrowserRouter>
  );
}

export default App;
