import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import SideNavigation from './components/SideNavigation';
import { useAuth, useUser } from "./context/userContext";
import { useEffect, useState } from "react";
import instance from "./utils/axiosInstance";
import { LoginSignupResponse } from "./types";
import { getToastStyle } from "./utils/utility";
import { useToast } from "./hooks/use-toast";
import { AxiosError } from "axios";
import Loader from "./components/Loader";

function App() {
  const { isAuthenticated } = useAuth();
  const { setUser } = useUser();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!navigator.onLine) {
        return toast({
          title: 'Connection Error',
          className: getToastStyle("error")
        })
      }
      try {
        setLoading(true);
        const { data } = await instance.get<LoginSignupResponse>("/user/me");
        if (data.success) {
          setUser(data.data);
        }
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          toast({
            title: error.response.data.message,
            className: getToastStyle("error")
          });
        }
      }finally {
        setLoading(false);
      }
    })()
  }, [])

  return (
    <>
      {
        loading ? <Loader className="h-screen" /> : (
          <Router>
            {isAuthenticated && <SideNavigation />}
            <Routes>
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </Router>
        )
      }
    </>
  )
}

export default App
