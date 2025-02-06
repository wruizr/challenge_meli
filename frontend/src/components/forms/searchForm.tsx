import { useNavigate } from "react-router-dom";
import searchIcon from "../../assets/ic_Search@2x.png.png";
import useStore from "../../stores/useStore";
import "./SearchForm.css";
import { useEffect, useState } from "react";

export const SearchForm = () => {
  const navigate = useNavigate();
  const { searchTerm } = useStore((state) => state);
  const [inputSearch, setInputSearch] = useState(searchTerm);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (e.currentTarget.search.value === "") return;
    navigate(`/items?search=${e.currentTarget.search.value}`);
  };

  useEffect(() => {
    if (searchTerm) setInputSearch(searchTerm);
  }, [searchTerm]);

  return (
    <form onSubmit={handleSubmit} className="ml-search-form">
      <input
        type="text"
        value={inputSearch}
        name="search"
        className="ml-search-form-input"
        onChange={(e) => setInputSearch(e.target.value)}
      />
      <button type="submit" className="ml-search-form-btn">
        <img
          src={searchIcon}
          alt="Icono search"
          className="ml-search-form-btn-icon"
        />
      </button>
    </form>
  );
};
