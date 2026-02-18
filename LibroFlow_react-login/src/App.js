import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPag from './components/LoginPag';
import SignupPag from './components/SignUpPag';
import Dashboard from "./components/Dashboard";

function App() {
  return (
      <div className="App">
      <Router>

            <Routes>
            <Route path="/" element={<LoginPag/>} />
            <Route path="/signup" element={ <SignupPag/>} />
                <Route path = "/dashboard" element={<Dashboard/>}/>
            </Routes>

      </Router>
      </div>
  );
}

export default App;