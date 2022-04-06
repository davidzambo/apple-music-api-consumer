import React from 'react';
import './App.css';
import {AppleMusicAPIConsumer} from "../components/AppleMusicAPIConsumer";
import {CssBaseline} from "@mui/material";

function App() {
  return (
    <>
      <CssBaseline/>
      <AppleMusicAPIConsumer/>
    </>

  );
}

export default App;
