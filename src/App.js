import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./components/stylesheets/layout.css";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";

import Errorpage from "./components/pages/Errorpage";

import CardList from "./components/pages/cards/CardList";
import UserList from "./components/pages/cards/UserList";
import QRCodeScanner from "./components/pages/scan/QRCodeScanner1";

import Clock from "./components/pages/clock/Clock";

import Register from "./components/pages/Register";
import Login from "./components/layout/Login";
import GetCards from "./components/pages/scan/GetCards";
import GetUsers from "./components/pages/scan/GetUsers";
import AddUser from "./components/pages/cards/AddUser";
import Login1 from "./components/pages/Login";
import AddCustomers from "./components/pages/cards/AddCustomers";
// import AddUser from "./components/projects/card/AddUser";
// import GetUser from "./components/projects/card/GetUser";

function App() {
  const [user, setUser] = useState(null);
  // const [login, setLogin] = useState(null);

  const handleLogin = (username) => {
    setUser(username.slice(0, 5));
    // (user == "lokin" ? setLogin("Admin") : setLogin("User"))
    // const first6Letters = username.slice(0, 6);
  };

  const handleLogout = () => {
    // Clear the user state to log out
    setUser(null);
    // setLogin(null)
  };

  return (
    <Router>
      <>
        <Navbar username={user} onLogout={handleLogout} />
        <div className="main">
        {user === "lokin" ? (
        <Routes>
          <Route path="/login" element={<Login1 onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/add-user" element={<AddUser username={user} />} />
          <Route path="/add-cust" element={<AddCustomers />} />
          <Route path="/scan" element={<QRCodeScanner />} />
          <Route path="/cards" element={<CardList />} />
          <Route path="/users" element={<UserList />} />

          <Route path="*" element={<Errorpage />} />
        </Routes>
      ) : user === "viraj" ? (
        <Routes>
          <Route path="/login" element={<Login1 onLogin={handleLogin} />} />    
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/scan" element={<QRCodeScanner />} />
          <Route path="/get-cards" element={<GetCards />} />
          <Route path="/get-users" element={<GetUsers />} />

          <Route path="/clock" element={<Clock />} />
          <Route path="*" element={<Errorpage />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/login" element={<Login1 onLogin={handleLogin} />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
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
