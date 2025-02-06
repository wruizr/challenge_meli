import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getItems } from "../../services/backendServices";
import useStore from "../../stores/useStore";
import "./ItemsResult.css";
import { handleCondition, handleCurrencyFormat } from "../../utils/helpers";

const ItemsResult = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { searchTerm, items, setItems, setSearchTerm } = useStore(
    (state) => state
  );
  const query = searchParams.get("search") || "";

  useEffect(() => {
    const controller = new AbortController();
    if (query !== searchTerm) {
      setSearchTerm(query);
      getItems(query).then(setItems).catch(console.error);
      return () => {
        controller.abort();
      };
    }
  }, [query, searchTerm, setItems, setSearchTerm]);

  const handleSelect = (id: string) => {
    navigate(`/items/${id}`);
  };

  return (
    <>
      <ul className="ml-card">
        {items && items.items.length ? (
          items.items.slice(0, 4).map((item) => (
            <li
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className="ml-card-item"
            >
              <section className="ml-card-item-content-img">
                <img src={item.picture} alt="" className="ml-card-item-img" />
              </section>
              <section className="ml-card-item-content-info">
                <h3 className="ml-card-item-content-info-price">{`${
                  item.price.amount
                    ? `$ ${handleCurrencyFormat(item.price.amount)}`
                    : ""
                }`}</h3>
                <p className="ml-card-item-content-info-title">{item.title}</p>
                {item.free_shipping && (
                  <p className="ml-card-item-content-info-free">Envío gratis</p>
                )}
                <p className="ml-card-item-content-info-condition">
                  {handleCondition(item.condition)}
                </p>
              </section>
            </li>
          ))
        ) : (
          <p>No se encontraron articulos.</p>
        )}
      </ul>
    </>
  );
};

export default ItemsResult;
