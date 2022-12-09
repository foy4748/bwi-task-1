import { NavLink } from "react-router-dom";
export default function NavBar() {
  return (
    <nav className="w-100 my-4">
      <ul className="flex justify-center">
        <NavLink to="/">
          {" "}
          <li className="m-4">Assignment 1</li>
        </NavLink>
        <NavLink to="/assignment-2">
          {" "}
          <li className="m-4">Assignment 2</li>
        </NavLink>
      </ul>
    </nav>
  );
}
