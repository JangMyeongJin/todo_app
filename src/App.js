import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./route/PrivateRoute";
import { useEffect, useState } from "react";
import api from "./utils/api";

function App() {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if(token) {
        const response = await api.get("/user/session");
        
        setUser(response.data.user);
      }

    }catch(err) {

    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Routes>
      <Route path="/" element={
        <PrivateRoute 
          user={user}
        >
          <TodoPage />
        </PrivateRoute>
        } 
      />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/login" element={<LoginPage setUser={setUser} user={user} />} />
    </Routes>
  );
}

export default App;
