import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/header";
import Login from "./components/login";
import logo from "./images/rockstar.jpg";
import LeaksList from "./modules/leaks/leaks-list";
import AdminRoute from "./components/admin/admin-route";
import AdminPanel from "./components/admin/admin-panel";
import Register from "./components/register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <>
              <Header />
              <div className="text-white m-8">
                <img
                  src={logo}
                  className="w-[90%] mx-auto max-h-[550px] overflow-hidden object-cover rounded-2xl p-2 hover:scale-110 hover:p-0 transition-all duration-700"
                />
                <p className="bg-black bg-opacity-25 line-clamp-4 overflow-hidden text-ellipsis whitespace-nowrap text-xl text-white max-w-[700px] absolute bottom-8 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                  {}
                </p>
              </div>
              <LeaksList />
            </>
          }
        />
        <Route
          path="/admin/panel"
          element={<AdminRoute component={AdminPanel} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
