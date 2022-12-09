import { userContext } from "../Contexts/AuthContext";
import { useContext } from "react";
import toast from "react-hot-toast";

import Loader from "./Shared/Loader";

export default function Assignment1() {
  const { authLoading, loginWithEmail, setActiveUser } =
    useContext(userContext);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;

    //Inputs
    const email = form.email.value;
    const password = form.password.value;
    loginWithEmail(email, password)
      .then(({ user }) => {
        setActiveUser(user);
        form.reset();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Login FAILED");
      });
  };

  if (authLoading) {
    return <Loader />;
  }
  return (
    <div>
      <section className="flex justify-center">
        <div className="w-full max-w-xs">
          <h1 className="text-3xl fw-xl">Login</h1>
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleLogin}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                id="email"
                type="email"
                placeholder="Email"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                required
                placeholder="Password"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
