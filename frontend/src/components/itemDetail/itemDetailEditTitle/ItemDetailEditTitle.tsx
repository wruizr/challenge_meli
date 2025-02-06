import { useEffect, useState } from "react";
import useStore from "../../../stores/useStore";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { BsStars } from "react-icons/bs";
import {
  handleIsActiveButtons,
  handleTitleClearance,
} from "../../../utils/helpers";
import {
  getNewTitleIA,
  saveItemTitle,
} from "../../../services/backendServices";
import { Snackbar } from "../../snackbar/Snackbar";
import "./ItemDetailEditTitle.css";

export const ItemDetailEditTitle = () => {
  const { selectedItem } = useStore((state) => state);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>("");
  const [buttonIsActive, setButtonIsActive] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isGenerateIA, setIsGenereteIA] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    if (selectedItem?.item.title) setNewTitle(selectedItem?.item.title);
  }, [selectedItem?.item.title]);

  useEffect(() => {
    setButtonIsActive(
      handleIsActiveButtons({
        title: selectedItem?.item.title ?? "",
        newTitle,
        hasError,
      })
    );
  }, [newTitle, selectedItem?.item.title, hasError]);

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleNewTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasError(handleTitleClearance(event.target.value));
    setNewTitle(event.target.value);
  };

  const handleChangeTitle = () => {
    getNewTitleIA(newTitle).then((data) => {
      setNewTitle(data.title);
      setIsGenereteIA(true);
    });
  };

  const handleSaveItemTitle = () => {
    saveItemTitle({
      title: newTitle,
      useIAIntegration: isGenerateIA,
    })
      .then(() => showSnackbar(true))
      .catch(() => showSnackbar(false));
  };

  const showSnackbar = (isSuccess: boolean) => {
    setSnackbar({
      message: isSuccess ? "Guardado exitoso" : "Hubo un error",
      type: isSuccess ? "success" : "error",
    });
    setTimeout(() => {
      setSnackbar(null);
    }, 15000);
  };

  return (
    <>
      {selectedItem && (
        <div className="ml-card-detail-edit">
          <div className="ml-card-detail-edit-header">
            <div className="ml-card-detail-edit-header-title">
              <h3>Título</h3>
              <p>{selectedItem.item.title}</p>
            </div>
            <button
              className={`${isOpen ? "iconOpen" : "iconClose"}`}
              onClick={handleIsOpen}
            >
              {!isOpen ? <SlArrowDown /> : <SlArrowUp />}
            </button>
          </div>
          <div
            className={`ml-card-detail-edit-body ${
              isOpen ? "content" : "content-hidden"
            }`}
          >
            <div className="ml-card-detail-edit-body-inputs">
              <input
                type="text"
                value={newTitle}
                placeholder="Escribe el título"
                onChange={handleNewTitle}
              />
              <a onClick={handleChangeTitle}>
                <BsStars />
                <p>Sugerir un título</p>
              </a>
            </div>
            <p>{newTitle.length}/60</p>
          </div>
          <div
            className={`ml-card-detail-edit-footer ${
              isOpen ? "content" : "content-hidden"
            }`}
          >
            <button
              className={`${
                buttonIsActive ? "button-active-one" : "button-disabled-one"
              }`}
            >
              Cancelar
            </button>
            <button
              onClick={handleSaveItemTitle}
              className={`${
                buttonIsActive ? "button-active-two" : "button-disabled-two"
              }`}
            >
              Confirmar
            </button>
            {snackbar && (
              <Snackbar
                message={snackbar.message}
                type={snackbar.type}
                onClose={() => setSnackbar(null)}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};
