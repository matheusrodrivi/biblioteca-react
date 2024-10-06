import Login from "./components/auth/login";
import Register from "./components/auth/register";

import Header from "./components/header";
import Home from "./components/home";
import Footer from "./components/footer"
import AddBook from "./components/addBook/AddBook";

import { AuthProvider } from "./context/authContext";
import { useRoutes, useLocation } from "react-router-dom";

// import './App.css';

function App() {
  const location = useLocation();

  const routesArray = [
    {
      path: "*",
      element: <AddBook />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "add-book",
      element: <AddBook />,
    }
  ];
  let routesElement = useRoutes(routesArray);
  return (
    <AuthProvider>
      {location.pathname !== "/login" && location.pathname !== "/register" && <Header />}

      <div>{routesElement}</div>
      {location.pathname !== "/login" && location.pathname !== "/register" && <Footer />}
    </AuthProvider>
  );
}

export default App;