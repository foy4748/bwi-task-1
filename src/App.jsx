import router from "./Routes/router";
import { RouterProvider } from "react-router-dom";
import AuthContextProvider from "./Contexts/AuthContext";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster />
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </>
  );
}

export default App;
