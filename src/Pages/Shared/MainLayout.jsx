import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <main>
      <nav>
        <ul>
          <li>Assignment 1</li>
          <li>Assignment 2</li>
        </ul>
      </nav>
      <Outlet />
    </main>
  );
}
