import router from "./Routes/router";
import { RouterProvider } from "react-router-dom";
import AuthContextProvider from "./Contexts/AuthContext";

function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
