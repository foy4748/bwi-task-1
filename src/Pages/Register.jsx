import { userContext } from "../Contexts/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import Loader from "./Shared/Loader";
export default function Register() {
  const { authLoading, setAuthLoading, registerWithEmail, setActiveUser } =
    useContext(userContext);

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;

    //Inputs
    const email = form.email.value;
    const password = form.password.value;
    const displayName = form.fullName.value;
    const photoURL =
      "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png";

    registerWithEmail(email, password)
      .then(({ user }) => {
        setActiveUser(user);
        form.reset();
        toast.success("Successfully Registered");
        const profileObj = { displayName, photoURL };
        if (displayName && photoURL) {
          toast("Updating Profile");
          handleUpdate(profileObj);
          form.reset();
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Register FAILED");
        setAuthLoading(false);
      });
  };

  // For adding displayName and photoURL
  const handleUpdate = (profileObj) => {
    updateUserProfile(profileObj)
      .then(() => {
        toast.success("Updating Profile");
        setAuthLoading(false);
      })
      .catch((error) => console.error(error));
  };

  if (authLoading) {
    return <Loader />;
  }
  return (
    <div>
      <section className="flex justify-center">
        <div className="w-full max-w-xs">
          <h1 className="text-3xl fw-xl">Register</h1>
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleRegister}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="fullName"
              >
                Full Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                id="fullName"
                type="text"
                placeholder="Full Name"
              />
            </div>
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
            <div className="my-3">
              <p>Already have an account?</p>
              <p>
                <Link to="/"> Please, Login</Link>
              </p>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
