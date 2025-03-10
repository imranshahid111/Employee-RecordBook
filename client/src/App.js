import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast';

function App() {
    return (
        <>
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home/>} />
                 </Routes>
                
            </div>
        </Router>
        </>
    );
}

export default App;