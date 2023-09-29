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
import QRCodeScanner from "./components/pages/scan/QRCodeScanner";

import Clock from "./components/pages/clock/Clock";

import Register from "./components/pages/Register";
import Login from "./components/layout/Login";
import GetCards from "./components/pages/scan/GetCards";
import GetUsers from "./components/pages/scan/GetUsers";
import AddUser from "./components/pages/cards/AddUser";
import Login1 from "./components/pages/Login";
// import AddUser from "./components/projects/card/AddUser";
// import GetUser from "./components/projects/card/GetUser";

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
        <Navbar username={user} onLogout={handleLogout} />
        <div className="main">
          {!user ? (
            // <Login onLogin={handleLogin} />
            <Routes>
              <Route
                path="/login1"
                exact
                element={<Login1 onLogin={handleLogin} />}
              />
              <Route path="/register" exact element={<Register />} />
              <Route path="/" exact element={<Home />} />

              <Route path="/about" exact element={<About />} />
              <Route path="/contact" exact element={<Contact />} />

              <Route path="/scan" exact element={<QRCodeScanner />} />
              <Route path="/get-cards" exact element={<GetCards />} />
              <Route path="/get-users" exact element={<GetUsers />} />

              <Route path="/clock" exact element={<Clock />} />

              <Route path="*" element={<Errorpage />} />
            </Routes>
          ) : (
            <Routes>
             
              <Route path="/login" exact element={<Login onLogin={handleLogin} />} />
              <Route path="/" exact element={<Home />} />

              <Route path="/about" exact element={<About />} />
              <Route path="/contact" exact element={<Contact />} />

              <Route path="/scan" exact element={<QRCodeScanner />} />
              <Route path="/add-user" exact element={<AddUser username={user} />} />
              <Route path="/cards" exact element={<CardList />} />
              <Route path="/users" exact element={<UserList />} />

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
