import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function MainLayout() {
  return (
    <main>
      <NavBar />
      <section className="m-4 bg-base-500 h-screen border rounded-xl">
        <Outlet />
      </section>
    </main>
  );
}
