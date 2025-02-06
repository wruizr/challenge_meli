import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getItemDetail } from "../../services/backendServices";
import useStore from "../../stores/useStore";
import "./ItemDetail.css";
import { handleCondition } from "../../utils/helpers";
import { ItemDetailEditTitle } from "./itemDetailEditTitle/ItemDetailEditTitle";

const ItemDetail = () => {
  const { id } = useParams();
  const { selectedItem, setSelectedItem } = useStore((state) => state);

  useEffect(() => {
    const controller = new AbortController();
    if (id && id !== selectedItem?.item.id) {
      getItemDetail(id).then(setSelectedItem).catch(console.error);
    }
    return () => {
      controller.abort();
    };
  }, [id, selectedItem, setSelectedItem]);

  return (
    <>
      {selectedItem ? (
        <>
          <section className="ml-card-detail">
            <div className="ml-card-detail-info">
              <div className="ml-card-detail-info-text">
                <h2>{selectedItem.item.title}</h2>
                <p># {selectedItem.item.id}</p>
                <p>
                  <strong>Mercado libre:</strong>{" "}
                  {selectedItem.item.sold_quantity} unidades vendidas |{" "}
                  <strong>Condición:</strong>{" "}
                  {handleCondition(selectedItem.item.condition)}
                </p>
                <p>Analizar métricas de rendimiento</p>
              </div>
              <div className="ml-card-detail-info-img">
                <img src={selectedItem.item.picture} alt="" />
              </div>
            </div>
            <ItemDetailEditTitle />
            <div className="ml-card-detail-description">
              <h3>Descripción del producto</h3>
              <p>{selectedItem.item.description}</p>
            </div>
          </section>
        </>
      ) : (
        <h1>No se encontro articulo.</h1>
      )}
    </>
  );
};

export default ItemDetail;
