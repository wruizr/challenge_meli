import { SearchForm } from "../forms/SearchForm";
import meliLogo from "../../assets/logo_large_25years@2x.png";
import "./Header.css";

export const Header = () => {
  return (
    <header className="ml-header">
      <section className="ml-header-content">
        <img
          src={meliLogo}
          alt="Logo mercado libre"
          title="Lofo mercado libre"
          className="ml-header-content-logo"
        />
        <SearchForm />
      </section>
    </header>
  );
};
