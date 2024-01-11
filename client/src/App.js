import './App.css';
 import { Home } from './pages/home';
 import { Authen } from './pages/auth';
import { Create } from './pages/create-rec';
import { Saved } from "./pages/saved-rec";
import {BrowserRouter as Router ,Routes,Route } from 'react-router-dom' 
import { Navbar } from './components/navbar';
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
        <Route path="/" element={<Home/>}/> 
        <Route path="/auth" element={<Authen/>}/> 
          <Route path="/create-rec" element={<Create/>}/> 
          <Route path="/saved-rec" element={<Saved/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
