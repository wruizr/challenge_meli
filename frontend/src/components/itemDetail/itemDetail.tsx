import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { getItemDetail } from "../../services/backendServices"
import useStore from "../../stores/useStore"

const ItemDetail = () => {
    const { id } = useParams()
    const { selectedItem, setSelectedItem } = useStore((state) => state);

    useEffect(() => {   
        const controller = new AbortController()
        if(id && id !== selectedItem?.item.id){
            getItemDetail(id)
                .then(setSelectedItem)
                .catch(console.error);
        }
        return () => {
            controller.abort()
        }
    }, [id, selectedItem ,setSelectedItem]);    
    return (
        <>
            {
                selectedItem ? (
                    <>
                        <img src={selectedItem.item.picture} alt="" />
                        <h2>{selectedItem.item.title}</h2>
                        <p>${selectedItem.item.price.amount}</p>
                        {selectedItem.item.free_shipping && <p>Envío gratis</p>}
                        <p>{selectedItem.item.condition}</p>
                    </>
                ) : (
                    <h1>No se encontro articulo.</h1>
                )
            }
        </>
    )
}

export default ItemDetail