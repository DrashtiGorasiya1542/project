import "./App.css";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import Coinpage from "./pages/Coinpage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@material-ui/core";
import { useState } from "react";

function App() {
  const [darkMode,setDarkMode] =useState(false);
  const darkTheme =  createTheme({
    palette:{
      mode: darkMode ? 'dark':'light',
      
    },
  })
  return (
    
    <ThemeProvider theme={darkTheme}>
    <Header check={darkMode} change={()=>setDarkMode(!darkMode)}/>
    <Router>
    <Routes>
    <Route path="/" excet element={<Homepage check={darkMode} change={()=>setDarkMode(!darkMode)}/>} />
    <Route path="/coins/:id" element={<Coinpage />} />
    </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;
