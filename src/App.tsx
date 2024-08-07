import Profile from "./pages/Profile";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { UserProvider } from "./context/User";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Slack from "./pages/Slack";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/slack",
      element: <Slack />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
  ]);

  return (
    <UserProvider>
        <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
