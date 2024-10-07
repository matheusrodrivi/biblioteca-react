import Login from "./components/auth/login";
import Register from "./components/auth/register";

import Header from "./components/header";
import Home from "./components/home";
import Footer from "./components/footer"
import AddBook from "./components/addBook/AddBook";
import Book from "./components/book/Book";

import { AuthProvider } from "./context/authContext";
import { useRoutes, useLocation } from "react-router-dom";

// import './App.css';

function App() {
  const location = useLocation();

  const routesArray = [
    {
      path: "*",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Home />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "*",
      element: <Home />,
    },
    {
      path: "/add-book",
      element: <AddBook />,
    },
    {
      path: "/book/:id",
      element: <Book />,
    }
  ];
  let routesElement = useRoutes(routesArray);
  return (
    <AuthProvider>
      {/* {location.pathname !== "/login" && location.pathname !== "/register" && <Header />} */}
      <Header />
      <div>{routesElement}</div>
      {/* {location.pathname !== "/login" && location.pathname !== "/register" && <Footer />} */}
      <Footer />
    </AuthProvider>
  );
}

export default App;