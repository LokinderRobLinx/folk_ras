import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Home from "./components/pages/Home";
import Home1 from "./components/pages/Home1";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";


import Errorpage from "./components/pages/Errorpage";


import Todo from "./components/projects/cards/CardList";
import TodoPage from "./components/projects/todo2/TodoPage";

import Clock from "./components/projects/clock/Clock";




import "./components/stylesheets/layout.css";
import Login from "./components/layout/Login";
import { useState } from "react";
import AddUser from "./components/projects/card/AddUser";
import GetUser from "./components/projects/card/GetUser";
import QRCodeScanner from "./components/projects/scan/QRCodeScanner1";



function App() {

  const [user, setUser] = useState(null);

  const handleLogin = (username) => {
    setUser(username);
  };

  const handleLogout = () => {
    // Clear the user state to log out
    setUser(null);
  };


  return (
    <Router>
      <>
        <Navbar/>
        <div className="main">
        {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        // <Home username={user} />
         <Routes>
            <Route path="/login" exact element={<Login />} />
            {/* <Route path="/register" exact element={<Register />} /> */}
            <Route path="/" exact element={<Home username={user} onLogout={handleLogout}/>} />
            <Route path="/a" exact element={<Home1 username={user} onLogout={handleLogout}/>} />
            <Route path="/b" exact element={<Home1 username={user} onLogout={handleLogout}/>} />

            <Route path="/about" exact element={<About />} />
            <Route path="/contact" exact element={<Contact />} />

            <Route path="/add-user" exact element={<AddUser />} />
            <Route path="/get-user" exact element={<GetUser />} />
            <Route path="/scan" exact element={<QRCodeScanner />} />

            
            <Route path="/todo" exact element={<Todo />} />
            <Route path="/todofb" exact element={<TodoPage />} />
            
            <Route path="/clock" exact element={<Clock />} />
            


            <Route path="*" element={<Errorpage />} />
          </Routes>
      )}
         
        </div>
        <Footer />
      </>
    </Router>
  );
}

export default App;