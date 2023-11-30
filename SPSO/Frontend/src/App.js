import Navbar from './common/Navbar';
import Home from './homepage/Home';

import Faculty from './Faculty/faculty' 
import Student from './SPSO/Statistic'

import { BrowserRouter, Routes, Route } from "react-router-dom";

function Router() {
    return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/facultystatistic' element={<Faculty />} />
            <Route path='/studentstatistic' element={<Student />} />
        </Routes>
      </BrowserRouter>
    );
  }




function App({children}) {
    return (
      
        <div>
            <Navbar />
            <Router />
        </div>
    );
}

export default App;
