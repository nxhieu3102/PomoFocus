import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/Home/Home";
import Login from "./Pages/Login";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
