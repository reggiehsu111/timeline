import React from 'react';
import Timeline from './Timeline';
import CustomForm from './CustomForm';
import './css/main.css';
import './css/navbar.css';
import './css/reset.css';
import './css/style.css';
import './css/form.css';

function App() {
  return (
    <div>
      <header style={{height:"15vh"}}>
        <p style={{fontSize:"5vh", paddingTop: "3%", marginBottom:"0px"}}>
          Timeline
        </p>
      </header>
      <CustomForm />
      <Timeline />
    </div>
  );
}

export default App;
