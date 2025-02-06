import { Outlet } from "react-router-dom";
import { Header } from "../headers/Header";
import "./Layout.css";

export const Layout = () => {
  return (
    <>
      <Header />
      <main className="ml-main">
        <section className="ml-main-section">
          <Outlet />
        </section>
      </main>
    </>
  );
};
