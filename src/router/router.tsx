import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/Error/Error.component";
import History from "../pages/History/History.component";
import Player from "../pages/Player/Player.component";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Player />,
      },
      {
        path: "History",
        element: <History />,
      },
    ],
  },
]);

export default router;
